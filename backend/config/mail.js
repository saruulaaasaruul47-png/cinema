const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
async function sendEmail(to) {
    console.log("⏳ Sending email...");
    console.log("✅ Email to:", to);
    try {
        await transporter.verify();
        console.log("✅ SMTP connected");
        const mail = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: to,
            subject: "Cinema Ticket",
            text: "Таны киноны захиалгын мэдээлэл амжилттай."
        });
        console.log("✅ Email sent:", mail.messageId);
    } catch (error) {
        console.log("❌ Email error:");
        console.log(error);
    }
}
module.exports = sendEmail;