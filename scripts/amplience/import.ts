import {Arguments, Argv} from 'yargs'
import {execSync} from 'child_process'
import {compile} from 'handlebars'
import {promises, mkdirSync, rmSync} from 'fs'
import {tmpdir} from 'os'
import {join} from 'path'
import {nanoid} from 'nanoid'
import {Context} from './cli'

const recursiveTemplateSearch = async (baseDir: string, targetDir: string, dir: string, fileFunc: (path: string) => Promise<void>) => {
    const files = await promises.readdir(join(baseDir, dir))

    for (let file of files) {
        const filePath = join(dir, file)
        const fullPath = join(baseDir, filePath)
        const isDir = (await promises.stat(fullPath)).isDirectory()

        if (isDir) {
            await promises.mkdir(join(targetDir, filePath))
            await recursiveTemplateSearch(baseDir, targetDir, filePath, fileFunc)
        } else {
            await fileFunc(filePath)
        }
    }
}

const compileTemplates = async (dir: string, targetDir: string, params: any) => {
    // Locate and compile hbs templates into the same folder.

    await recursiveTemplateSearch(dir, targetDir, '', async (filePath: string) => {
        if (filePath.endsWith('.hbs')) {
            const template = await promises.readFile(join(dir, filePath), {encoding: 'utf8'})

            const hbs = compile(template)
            const result = hbs(params)

            // The path is confirmed to end with .hbs.
            const newPath = join(targetDir, filePath.substring(0, filePath.length - ('.hbs'.length)))

            await promises.writeFile(newPath, result, {encoding: 'utf8'})
        } else {
            // Copy the file.
            await promises.copyFile(join(dir, filePath), join(targetDir, filePath))
        }
    })
}

const clearTemplates = async (dir: string) => {
    // Clear files generated from hbs templates.

    await promises.rm(dir, {force: true, recursive: true})
}

const createTempDir = (context: Context) => {
    console.log(`Creating temporary directory ${context.tempDir}`)
    rmSync(context.tempDir, {recursive: true, force: true})
    mkdirSync(context.tempDir, {recursive: true})
}

export const importArgs = (yargs: Argv) => {
    return yargs
        .option('automationDir', {
            alias: 'a',
            describe: 'automation files directory',
            default: './amplience-automation/automation-files',
            type: 'string'
        })
        .option('tempDir', {
            alias: 't',
            describe: 'temporary directory for all run files',
            default: join(tmpdir(), `amplience-sfcc/amplience-sfcc-${nanoid()}`)
        })
        .option('hubId', {
            describe: 'amplience hub id',
            required: true,
            type: 'string'
        })
        .option('clientId', {
            describe: 'amplience client id',
            required: true,
            type: 'string'
        })
        .option('clientSecret', {
            describe: 'amplience client secret',
            required: true,
            type: 'string'
        })
        .option('contentRepoId', {
            describe: 'content repository id',
            required: true,
            type: 'string'
        })
        .option('slotsRepoId', {
            describe: 'slots repository id',
            required: true,
            type: 'string'
        })
        .option('sitestructureRepoId', {
            describe: 'site structure repository id',
            required: true,
            type: 'string'
        })
        .option('mapFile', {
            describe: 'mapFile',
            default: null,
            type: 'string'
        })
        .option('sfccUrl', {
            describe: 'sfcc url',
            default: null,
            type: 'string'
        })
        .option('sfccVersion', {
            describe: 'sfcc version',
            default: null,
            type: 'string'
        })
        .option('authUrl', {
            describe: 'auth url',
            default: null,
            type: 'string'
        })
        .option('authSecret', {
            describe: 'auth secret',
            default: null,
            type: 'string'
        })
        .option('authClientId', {
            describe: 'auth client id',
            default: null,
            type: 'string'
        })
        .option('siteId', {
            describe: 'site id',
            default: null,
            type: 'string'
        })
};

export const importHandler = async (context: Arguments<Context>): Promise<any> => {
    createTempDir(context)

    if (!context.sfccUrl && context.sfccVersion && context.authSecret && context.authClientId && context.siteId) {
        console.warn(`Missing SFCC configuration, product selector extension will not be usable.`)
    }

    // Computing all Editions start and end dates
    // Starting from the next Monday, one week per Edition
    const now = new Date()
    now.setHours(0,1,0,0)
    const nextMonday = new Date(now)
    nextMonday.setDate(now.getDate() + (((8 - now.getDay()) % 7)))
    const editions = [...new Array(4)].map((_,i) => {
        let editionStartDate = new Date(nextMonday)
        editionStartDate.setDate(nextMonday.getDate() + 7*i)
        let editionEndDate = new Date(nextMonday)
        editionEndDate.setDate(nextMonday.getDate() + 6+7*i)
        editionEndDate.setHours(23,59,59,0) 
        return {
            editionStartDate: editionStartDate.toISOString(),
            editionEndDate: editionEndDate.toISOString()
        }
    })
    context.editions = editions

    console.log(`Compiling templates and copying files...`)
    await compileTemplates(context.automationDir, context.tempDir, context)
    const mappingFile = context.mapFile || join(process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME'] || __dirname, '.amplience', 'imports', `sfcc-${context.hubId}.json`)

    try {
        console.log(`Configuring dc-cli...`)
        execSync(
            `npx dc-cli configure \
                --clientId ${context.clientId} \
                --clientSecret ${context.clientSecret} \
                --hubId ${context.hubId}`, 
            {stdio: 'inherit'}
        )
        
        console.log(`dc-cli version used ...`)
        execSync(
            `npx dc-cli --version`, 
            {stdio: 'inherit'}
        )

        console.log(`Importing settings...`)
        execSync(
            `npx dc-cli settings import ${context.tempDir}/settings/hub-settings.json \
                --mapFile ${mappingFile}`, 
            {stdio: 'inherit'}
        )

        console.log(`Importing extensions...`)
        execSync(
            `npx dc-cli extension import ${context.tempDir}/extensions`, 
            {stdio: 'inherit'}
        )

        console.log(`Importing content type schemas...`)
        execSync(
            `npx dc-cli content-type-schema import ${context.tempDir}/schema`, 
            {stdio: 'inherit'}
        )

        console.log(`Importing content types...`)
        execSync(
            `npx dc-cli content-type import ${context.tempDir}/type \
                --sync`,
            {stdio: 'inherit'}
        )

        console.log(`Importing content...`)
        execSync(
            `npx dc-cli content-item import ${context.tempDir}/content/content \
                --baseRepo ${context.contentRepoId} \
                --media true \
                --publish \
                --batchPublish \
                --mapFile ${mappingFile}`,
            {stdio: 'inherit'}
        )

        console.log(`Importing slots...`)
        execSync(
            `npx dc-cli content-item import ${context.tempDir}/content/slots \
                --baseRepo ${context.slotsRepoId} \
                --publish \
                --batchPublish \
                --mapFile ${mappingFile}`, 
            {stdio: 'inherit'}
        )

        console.log(`Importing site components...`)
        execSync(
            `npx dc-cli content-item import \
                ${context.tempDir}/content/sitestructure \
                --baseRepo ${context.sitestructureRepoId} \
                --media true \
                --publish \
                --batchPublish \
                --mapFile ${mappingFile}`, 
            {stdio: 'inherit'}
        )

        console.log(`Importing events...`)
        execSync(
            `npx dc-cli event import ${context.tempDir}/events \
                --acceptSnapshotLimits true \
                --schedule true \
                --catchup true \
                --mapFile ${mappingFile}`,
            {stdio: 'inherit'}
        )

        console.log(`Re-importing slots...`)
        execSync(
            `npx dc-cli content-item import ${context.tempDir}/content/slots \
                --baseRepo ${context.slotsRepoId} \
                --publish \
                --batchPublish \
                --mapFile ${mappingFile}`, 
            {stdio: 'inherit'}
        )

        console.log(`Done!`)
    } finally {
        console.log(`Cleaning up templates...`)
        await clearTemplates(context.tempDir)
    }
};