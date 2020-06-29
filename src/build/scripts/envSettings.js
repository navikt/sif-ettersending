const fsExtra = require('fs-extra');

function createEnvSettingsFile(settingsFile) {
    fsExtra.ensureFile(settingsFile).then((f) => {
        fsExtra.writeFileSync(
            settingsFile,
            `window.appSettings = {
                API_URL: '${process.env.API_URL}',
                API_URL_OMSORGSPENGER: '${process.env.API_URL_OMSORGSPENGER}',
                API_URL_PLEIEPENGER: '${process.env.API_URL_PLEIEPENGER}',
                LOGIN_URL: '${process.env.LOGIN_URL}',
                DEMO_MODE: '${process.env.DEMO_MODE}',
                PUBLIC_PATH: '${process.env.PUBLIC_PATH}',
                UTILGJENGELIG: '${process.env.UTILGJENGELIG}',
                APPSTATUS_PROJECT_ID: '${process.env.APPSTATUS_PROJECT_ID}',
                APPSTATUS_DATASET: '${process.env.APPSTATUS_DATASET}',
            };`
        );
    });
}

module.exports = createEnvSettingsFile;
