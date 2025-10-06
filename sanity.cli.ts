import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
    api: {
        projectId: '33wg2r17',
        dataset: 'production',
    },
    deployment: {
        appId: 'hzq0qicrc5bch1y3at34dpnk',
        autoUpdates: true,
    },
    studioHost: 'makana',
});