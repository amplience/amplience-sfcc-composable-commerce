import { ContentRepository, DynamicContent, Extension, Folder, HalResource, Page, Pageable, Settings, Sortable } from 'dc-management-sdk-js'
import { Arguments, Argv } from 'yargs'
import { join } from 'path'
import { execSync } from 'child_process'
import { rmSync, writeFileSync } from 'fs'
import { Context } from './cli'
import { AmplienceRestClient } from './amplience-rest-client'

export const connectSDK = (context: Context) => {
    return new DynamicContent({
        client_id: context.clientId,
        client_secret: context.clientSecret
    })
}

export const paginator = async <T extends HalResource>(
    pagableFn: (options?: Pageable & Sortable) => Promise<Page<T>>,
    options: Pageable & Sortable = {}
): Promise<T[]> => {
    const currentPage = await pagableFn({ ...options, size: 20 })
    if (
        currentPage.page &&
        currentPage.page.number !== undefined &&
        currentPage.page.totalPages !== undefined &&
        currentPage.page.number + 1 < currentPage.page.totalPages
    ) {
        return [
            ...currentPage.getItems(),
            ...(await paginator(pagableFn, { ...options, page: currentPage.page.number + 1 }))
        ]
    }
    return currentPage.getItems()
}

export const cleanArgs = (yargs: Argv) => {
    return yargs
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
        .option('mapFile', {
            describe: 'mapFile',
            default: '',
            type: 'string'
        })
}

export const cleanHandler = async (context: Arguments<Context>): Promise<any> => {
    const client = connectSDK(context)
    const hub = await client.hubs.get(context.hubId)
    const mappingFile: string = context.mapFile || join(process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME'] || __dirname, '.amplience', 'imports', `sfcc-${context.hubId}.json`)

    console.log(`Configuring dc-cli...`)
    execSync(`./node_modules/.bin/dc-cli configure --clientId ${context.clientId} --clientSecret ${context.clientSecret} --hubId ${context.hubId}`, { stdio: 'inherit' })

    console.log(`Cleaning hub...`)
    execSync(`./node_modules/.bin/dc-cli hub clean --force`, { stdio: 'inherit' })

    console.log(`Archiving events...`)
    const events = await paginator(hub.related.events.list)
    for (let i = events.length - 1; i >= 0; i--) {
        execSync(`./node_modules/.bin/dc-cli event archive ${events[i].id} --force`, { stdio: 'inherit' })
    }

    console.log(`Deleting extensions...`)
    const extensions = await paginator(hub.related.extensions.list)
    for (let i = extensions.length - 1; i >= 0; i--) {
        await extensions[i].related.update(new Extension({
            ...extensions[i],
            name: `${extensions[i].name}-${new Date().getTime()}`
        }))
        await extensions[i].related.delete()
    }

    console.log(`Deleting webhooks...`)
    const webhooks = await paginator(hub.related.webhooks.list)
    for (let i = webhooks.length - 1; i >= 0; i--) {
        await webhooks[i].related.delete()
    }

    console.log(`Updating settings...`)
    const masterLocale = hub.settings?.localization?.locales[0]
    await hub.related.settings.update(new Settings({
        devices: [],
        applications: [],
        localization: {
            locales: [masterLocale]
        }
    }))

    console.log('Deleting mapFile...')
    rmSync(mappingFile, { force: true })

    // novadev-581 Update automation so that cleanup removes all folders from repositories
    const restClient = AmplienceRestClient(context)
    const repositories = await paginator(hub.related.contentRepositories.list)

    const deleteFoldersInRepository = async (repo: ContentRepository): Promise<any> => {
        return await Promise.all((await paginator(repo.related.folders.list)).map(deleteFolder))
    }

    const deleteFolder = async (folder: Folder): Promise<any> => {
        const subfolders = await paginator(folder.related.folders.list)
        await Promise.all(subfolders.map(deleteFolder))
        return await restClient.delete(`/folders/${folder.id}`)
    }

    console.log(`Deleting folders...`)
    await Promise.all(repositories.map(deleteFoldersInRepository))
    // end novadev-581

    console.log(`Done!`)
}