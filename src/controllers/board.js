// const User = require('../sequelize/models/user');
const models = require('../sequelize/models');

exports.getMessage = (req, res, next) => {

    models.Messages.findOne({
        where: {id: 1}
    }).then(message => {

        if (! message) {
            console.log('bbb');
        }
        const data = {
            message: message.dataValues.message
        }
        res.render('account/index', data);
    });
}