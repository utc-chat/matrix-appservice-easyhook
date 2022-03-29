const models = require("../models");
const NotificationModels = models.Notification;
const NotificationService = require("../services/notification")
const baseUrl = 'compare';

exports.action = async function (req,res) {
    NotificationModels.findByPk(req.params.notification_id).then((notification)=>{
        const backlink = notification.action;
        if(backlink) {
            notification.destroy();
        }
        return res.redirect(backlink);
    });
};

exports.clearAll = async function (req,res) {
    NotificationService.clearAll(req.user.id);
    return res.redirect('back');
};
exports.save = async function (req, res) {

};
