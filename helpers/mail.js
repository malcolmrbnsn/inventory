const nodemailer = require('nodemailer');
const { exists } = require('../helpers');

let {
    GMAIL_USERNAME,
    GMAIL_PASSWORD
} = process.env;
if (!exists(GMAIL_USERNAME, GMAIL_PASSWORD)) {
    console.error("MAILER: Username or Password not entered")
}

/**
 * 
 * @param {String} email email address
 * @param {String} subject subject of the email
 * @param {String} body body of the email
 * @returns idk
 */
async function sendMail(email, subject, body) {
    let smtpTransport = nodemailer.createTransport({
        service: 'gmail', auth: {
            user: GMAIL_USERNAME,
            password: GMAIL_PASSWORD
        }
    })

    const mailOptions = {
        to: email,
        from: GMAIL_USERNAME,
        subject,
        text: body
    }
    console.log(mailOptions)

    smtpTransport.sendMail(mailOptions, function (err) {
        err && console.error(err)
        console.log('mail sent');
    });
}

async function boxAssignedEmail(seller) {
    let {email, name} = seller;
    let subject = "You have a new box assigned"
    let body = `Hey ${name}! \nYou have been assigned a new box. \n\nContact your manager to collect the box.`
    sendMail(seller.email, subject, body)

}


module.exports = {boxAssignedEmail}