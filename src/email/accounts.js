const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const signUpEmail = (name, email) => {
    sgMail.send({
        from:'aakashvenkatasubramanian@gmail.com',
        to:email,
        subject:'Welcome to Managio',
        text:`Thanks for joining in, ${name}. Please let us know how you get along.`
    })
}

const deleteAccountEmail = (name, email) => {
    sgMail.send({
        from:'aakashvenkatasubramanian@gmail.com',
        to:email,
        subject:'We miss you',
        text:`We are sorry to let you go, ${name}. Please let us know your issues.`
    })
}

module.exports = {
    signUpEmail,
    deleteAccountEmail
}