const { bsConf } = require('./bs.conf');
const { localConf } = require('./local.conf');

require('dotenv').config()

function getConfig(){
    switch (process.env.ENVIRONMENT) {
        case 'local': default:
            return localConf
        case 'browserstack':
            return bsConf
    }
}

exports.config = getConfig()