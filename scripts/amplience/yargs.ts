import { RequireDirectoryOptions } from 'yargs';
const YargsCommandBuilderOptions: RequireDirectoryOptions = { extensions: ['ts', 'js'], exclude: /\.spec\.ts$/ };
export default YargsCommandBuilderOptions;