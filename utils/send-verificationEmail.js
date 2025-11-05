import nodemailer from "nodemailer"

async function sendVerificationEmail(to , subject , text){
    try {
        const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: process.env.MAILTRAP_PORT,
        auth: {
            user: process.env.MAILTRAP_USERNAME,
            pass: process.env.MAILTRAP_PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.MAILTRAP_SENDERMAIL,
        to,
        subject,
        text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email send to  : " , to);
    console.log("Message ID : " , info.messageId)    
    }
    catch(error)
    {
        console.error("Error sending verification email: ", error);
        throw new Error("Error sending Verification Email")
    }
}

export default sendVerificationEmail;

