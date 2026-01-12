const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || process.env.SMTP_HOST,
      port: Number(process.env.MAIL_PORT || process.env.SMTP_PORT || 587),
      secure: Number(process.env.MAIL_PORT || process.env.SMTP_PORT) === 465,
      
      auth: {
        user: process.env.MAIL_USER || process.env.SMTP_USER || process.env.EMAIL_USER,
        pass: process.env.MAIL_PASS || process.env.SMTP_PASS || process.env.EMAIL_PASS,
      },

      tls: {
        rejectUnauthorized: false,
      },
    })

    let info = await transporter.sendMail({
      from: `"Studynotion | Vaibhav" <${process.env.MAIL_USER || process.env.SMTP_USER || process.env.EMAIL_USER}>`, // sender address
      to: `${email}`, // list of receivers
      subject: `${title}`, // Subject line
      html: `${body}`, // html body
    })
    // console.log(info.response)
    return info
  } catch (error) {
    console.log(error.message)
    console.error("Error occurred while sending mail ", error)
    throw new Error("Email could not be sent")
  }
};

module.exports = mailSender
