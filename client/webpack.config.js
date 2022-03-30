const { truncate } = require('lodash');
const path = require('path');

module.export = {
    devServer: {
        compress: true,
        public: 'chat.zkx.ca',
        disableHostCheck: true,
        allowedHosts: 'all',
    }

}