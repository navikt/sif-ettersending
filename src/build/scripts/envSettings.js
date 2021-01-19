const fsExtra = require('fs-extra');

function createEnvSettingsFile(settingsFile) {
    fsExtra.ensureFile(settingsFile).then((f) => {
        fsExtra.writeFileSync(
            settingsFile,
            `window.appSettings = {
                API_URL: '${process.env.API_URL}',
                LOGIN_URL: '${process.env.LOGIN_URL}',
                NYNORSK: '${process.env.NYNORSK}',
                PUBLIC_PATH: '${process.env.PUBLIC_PATH}',
                UTILGJENGELIG: '${process.env.UTILGJENGELIG}',
                APPSTATUS_PROJECT_ID: '${process.env.APPSTATUS_PROJECT_ID}',
                APPSTATUS_DATASET: '${process.env.APPSTATUS_DATASET}',
                USE_AMPLITUDE: '${process.env.USE_AMPLITUDE}'
            };`
        );
    });
}

module.exports = createEnvSettingsFile;
