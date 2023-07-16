import { readFile } from "fs/promises";
// import { createTestAccount, createTransport } from "nodemailer";
import { join } from "path";
import { Resend } from "resend";

type TemplateVariables = Record<string, string>

interface EmailOptions {
    email: string;
    subject: string;
    letterName: string;
    options: TemplateVariables
}

async function getLetter(letterName: string, data: TemplateVariables) {
    const lettersFolder = join(process.cwd(), "letters");
    const letter = await readFile(`${lettersFolder}/${letterName}.html`, "utf-8")

    return letter.replace(/{([^{}]+)}/g, (_, key: string) => data[key] ?? "Fuck you")
}

export default async function sendEmail(email: EmailOptions) {

    const resend = new Resend("re_32epRjtS_CimNmG3f1djXHSeYRdgH4orU");
    
    const sendedEmail = resend.emails.send({
        from: "onboarding@resend.dev",
        to: email.email,
        subject: email.letterName,
        html: `
        <p>Congrats on sending your <strong>first email</strong>!</p>
        <a>${email.options.link}</a>
        `
    });

    // const account = await createTestAccount();
    // const transporter = createTransport({
    //     host: "smtp.ethereal.email",
    //     port: 587,
    //     auth: {
    //         user: account.user,
    //         pass: account.pass,
    //     },
    // });
    // const sendedEmail = await transporter.sendMail({
    //     from: "dick <support@feedrum.com>",
    //     to: email.email,
    //     subject: email.subject,
    //     html: await getLetter(email.letterName, email.options),
    // });

    // console.log(getTestMessageUrl(sendedEmail))

    return sendedEmail
}
