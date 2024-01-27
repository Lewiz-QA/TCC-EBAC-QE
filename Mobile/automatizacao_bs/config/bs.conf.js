require('dotenv').config()

const { generalConf } = require('./general.conf')

let capabilities = process.env.PLATFORM === 'android' ? {
    capabilities: [{ 
        app: `${process.env.ANDROID_APP_ID}`,
        device: 'Samsung Galaxy Note 20',
        os_version: '10.0',
        project: 'Projeto Final EBAC',
        build: 'EBAC CI Mobile',
        name: 'teste_login'
    }]
} : {
    capabilities: [{
        app: `${process.env.IOS_APP_ID}`,
        project: "Projeto Final EBAC",
        build: 'Modulo 34',
        name: 'ebac_final_project',
        device: 'iPhone 12 Pro',
        os_version: "14",
        'browserstack.debug': true,
        noReset: true
    }]
}

let bsConf = {
    ...generalConf,
    ...capabilities,
    user: process.env.BS_USER,
    key: process.env.BS_KEY,
    services: ['browserstack']
}

module.exports = { bsConf }