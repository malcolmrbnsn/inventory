const nodemailer = require('nodemailer');
const { exists } = require('../helpers');

let {
    GMAIL_USERNAME,
    GMAIL_PASSWORD
} = process.env;
if (!exists(GMAIL_USERNAME, GMAIL_PASSWORD)) {
    console.error("MAILER: Username or Password not entered")
}

async function sendMail(email, subject, text) {
    let smtpTransport = nodemailer.createTransport({
        service: 'gmail', auth: {
            user: GMAIL_USERNAME,
            password: GMAIL_PASSWORD
        }
    })

    const mailOptions = {
        to: email,
        from: process.env.GMAIL_USERNAME,
        subject,
        text
    }

    smtpTransport.sendMail(mailOptions, function (err) {
        error && console.error(e)
        console.log('mail sent');
    });
}


module.exports = {sendMail}