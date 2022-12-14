import { readFile } from "fs/promises";
import { createTestAccount, createTransport, getTestMessageUrl } from "nodemailer";
import { join } from "path";

interface EmailOptions {
    email: string;
    subject: string;
    letterName: string;
    options: {
        [key: string]: string
    }
}

async function getLetter(letterName: string, data: EmailOptions["options"]) {
    const lettersFolder = join(process.cwd(), "letters");
    const letter = await readFile(`${lettersFolder}/${letterName}.html`, "utf-8")

    return letter.replace(/{([^{}]+)}/g, (_, key: string) => data[key] ?? "Fuck you")
}

export default async function sendEmail(email: EmailOptions) {
    const account = await createTestAccount();
    const transporter = createTransport({
        host: "smtp.ethereal.email",
        // secure: true,
        port: 587,
        auth: {
            user: account.user,
            pass: account.pass,
        },
    });
    const sendedEmail = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>',
        to: email.email,
        subject: email.subject,
        html: await getLetter(email.letterName, email.options),
    });

    console.log(getTestMessageUrl(sendedEmail))


    return sendedEmail
}
