const db = require('../models');
const SettingsModel = db.SettingsModel;

class SettingsService{}

SettingsService.getValue = async function (path) {
    return await SettingsModel.findOne({where: {path: path}}).then(setting =>{
        if(setting == null) return null;
        return setting.value;
    });
};

SettingsService.find = async function (path) {
    return await SettingsModel.findOne({where: {path: path}}).then(setting =>{
        return setting;
    });
};

module.exports = SettingsService;
