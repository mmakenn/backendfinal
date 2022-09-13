import { createTransport } from "nodemailer";
import { serverEmail, serverEmailPassword } from "../../config.js";
import logger from "./logger.js";

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: serverEmail,
        pass: serverEmailPassword
    }
});

async function sendEmail(options) {
    try {
        await transporter.sendMail(options)
    } catch (error) {
        logger.error(`Error while sending email.\n
                    ${error}`)
    }
}

export function sendEmailTo(email, subject, contentHTML) {
    const options = {
        from: "Server",
        to: email,
        subject: subject,
        html: contentHTML
    } 
    sendEmail(options)
}