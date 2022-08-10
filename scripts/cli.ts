import Yargs from 'yargs/yargs';
import YargsCommandBuilderOptions from './yargs';
import { Arguments, Argv } from 'yargs';
import childProcess from 'child_process'

import _ from 'lodash';

import { compile } from 'handlebars';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { nanoid } from 'nanoid';

type Context = {
  automationDir: string,
  tempDir: string,
  hubId: string,
  clientId: string,
  clientSecret: string,
  contentRepoId: string,
  slotsRepoId: string,

  sfccUrl: string | null,
  sfccVersion: string | null,
  authSecret: string | null,
  authClientId: string | null,
  siteId: string | null
}

const recursiveTemplateSearch = async (baseDir: string, targetDir: string, dir: string, fileFunc: (path: string) => Promise<void>) => {
  const files = await fs.promises.readdir(path.join(baseDir, dir));

  for (let file of files) {
    const filePath = path.join(dir, file);
    const fullPath = path.join(baseDir, filePath);
    const isDir = (await fs.promises.stat(fullPath)).isDirectory();

    if (isDir) {
      await fs.promises.mkdir(path.join(targetDir, filePath));
      await recursiveTemplateSearch(baseDir, targetDir, filePath, fileFunc);
    } else {
      await fileFunc(filePath);
    }
  }
}

const compileTemplates = async (dir: string, targetDir: string, params: any) => {
  // Locate and compile hbs templates into the same folder.

  await recursiveTemplateSearch(dir, targetDir, '', async (filePath: string) => {
    if (filePath.endsWith('.hbs')) {
      const template = await fs.promises.readFile(path.join(dir, filePath), { encoding: 'utf8' });

      const hbs = compile(template);
      const result = hbs(params);

      // The path is confirmed to end with .hbs.
      const newPath = path.join(targetDir, filePath.substring(0, filePath.length - ('.hbs'.length)));

      await fs.promises.writeFile(newPath, result, { encoding: 'utf8' });
    } else {
      // Copy the file.
      await fs.promises.copyFile(path.join(dir, filePath), path.join(targetDir, filePath));
    }
  });
}

const clearTemplates = async (dir: string) => {
  // Clear files generated from hbs templates.

  await fs.promises.rm(dir, { force: true, recursive: true });
}

const createTempDir = (context: Context) => {
  fs.rmSync(context.tempDir, { recursive: true, force: true });
  fs.mkdirSync(context.tempDir, { recursive: true });
}

const configureYargs = (yargInstance: Argv): Promise<Arguments> => {
  return new Promise(
    async (resolve): Promise<void> => {
      let failInvoked = false;
      const isYError = (err?: Error | string): boolean => err instanceof Error && err.name === 'YError';
      const failFn = (msg: string, err?: Error | string): void => {
        // fail should only be invoked once
        if (failInvoked) {
          return;
        }
        failInvoked = true;

        if ((msg && !err) || isYError(err)) {
          yargInstance.showHelp('error');
        }
        else if (err) {
          console.log(err)
          process.exit(0)
        }
      };

      const argv = yargInstance
        .command('import', 'Import Content', (yargs) => {
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
              default: path.join(os.tmpdir(), `amplience-sfcc/amplience-sfcc-${nanoid()}`),
              middleware: createTempDir
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
    
        }, async (context: Arguments<Context>): Promise<any> => {
          createTempDir(context);

          if (!context.sfccUrl && context.sfccVersion && context.authSecret && context.authClientId && context.siteId) {
            console.warn(`Missing SFCC configuration, product selector extension will not be usable.`)
          }

          console.log(`Compiling templates and copying files...`)
          await compileTemplates(context.automationDir, context.tempDir, context);

          try {
            console.log(`Configuring dc-cli...`)
            childProcess.execSync(`./node_modules/.bin/dc-cli configure --clientId ${context.clientId} --clientSecret ${context.clientSecret} --hubId ${context.hubId}`, {stdio: "inherit"});

            console.log(`Importing settings...`)
            childProcess.execSync(`./node_modules/.bin/dc-cli settings import ${context.tempDir}/settings/hub-settings-62e96f2bc9e77c0001d98ec5-sfcccomposable.json --mapFile ${context.tempDir}/mapping.json`, {stdio: "inherit"});

            console.log(`Importing extensions...`)
            childProcess.execSync(`./node_modules/.bin/dc-cli extension import ${context.tempDir}/extensions`, {stdio: "inherit"});

            console.log(`Importing content type schemas...`)
            childProcess.execSync(`./node_modules/.bin/dc-cli content-type-schema import ${context.tempDir}/schema`, {stdio: "inherit"});

            console.log(`Importing content types...`)
            childProcess.execSync(`./node_modules/.bin/dc-cli content-type import ${context.tempDir}/type`, {stdio: "inherit"});

            console.log(`Importing content...`)
            childProcess.execSync(`./node_modules/.bin/dc-cli content-item import ${context.tempDir}/content/content --baseRepo ${context.contentRepoId} --media true --publish true --mapFile ${context.tempDir}/mapping.json`, {stdio: "inherit"});

            console.log(`Importing slots...`)
            childProcess.execSync(`./node_modules/.bin/dc-cli content-item import ${context.tempDir}/content/slots --baseRepo ${context.slotsRepoId} --mapFile ${context.tempDir}/mapping.json`, {stdio: "inherit"});

            console.log(`Importing events...`)
            childProcess.execSync(`./node_modules/.bin/dc-cli event import ${context.tempDir}/events --acceptSnapshotLimits true --schedule true --catchup true --mapFile ${context.tempDir}/mapping.json`, {stdio: "inherit"});

            console.log(`Done!`)
          } finally {
            console.log(`Cleaning up templates...`)
            await clearTemplates(context.tempDir);
          }
        })
        .strict()
        .demandCommand(1, 'Please specify at least one command')
        .exitProcess(false)
        .showHelpOnFail(false)
        .fail(failFn).argv;
      resolve(argv);
    }
  );
};

export default async (yargInstance = Yargs(process.argv.slice(2))): Promise<Arguments | void> => {
  return await configureYargs(yargInstance);
};