import path from 'path';

export const ROOT_PATH = path.resolve(__dirname, '../..');
export const SITE_CONFIG = require(`${ROOT_PATH}/package.json`).siteConfig;
