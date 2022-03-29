const models = require('../models');

class Notification{}

Notification.clearAll = function(user_id){
    models.Notification.destroy({where:{user_id:user_id}});
};

module.exports = Notification;
