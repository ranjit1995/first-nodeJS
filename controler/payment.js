
const crypto = require('crypto')
const paymentConfig = require("../db/payment-config")
const db = require('../db/connection')
const indexed = require("../modal/sequelizer-index")
exports.pay = function (req, res, next) {
    var txnid = crypto.randomBytes(20).toString('hex');
    console.log(req.body)
    console.log(txnid)
    console.log(req.params.id)
    db.authenticate().then(() => {
        indexed.personal_info.findOne({
            where: {
                id: req.params.id
            }, row: true
        }).then((result) => {
            console.log(res)
            var data = req.body
            console.log("CONFIG FILE", paymentConfig.paymentData)
            var cryp = crypto.createHash('sha512');
            var text = paymentConfig.paymentData.MERCHANT_KEY + '|' + "asd34" + '|' + data.amount + '|' + data.productinfo + '|' + data.first_name + '|' + data.email + '|||||' + data.phone + '||||||' + paymentConfig.paymentData.MERCHANT_SALT;
            cryp.update(text);
            var hash = cryp.digest('hex');

            let body = {
                productinfo: req.body.productinfo,
                lastname: result.last_name,
                firstname: result.first_name,
                email: result.email,
                phone: result.phone,
                hash: hash,
                txnid: "asd34",
                amount: Number(req.body.amount),
                key: paymentConfig.paymentData.MERCHANT_KEY,
                surl: paymentConfig.paymentData.surl,
                furl: paymentConfig.paymentData.furl,
                getWayURL: paymentConfig.paymentData.getwayURL
            }
            // key, txnid, amount, productinfo, firstname, email, phone, surl, furl, hash

            console.log(body)
            res.status(200).json(body)
        }).catch((error) => {
            console.log(error)
            res.status(400).json({
                message: "Server error",
                status_code: 400
            });
        })
    })
    //2001111022
}