// import * as nodemailer from 'nodemailer';
// import * as pug from 'pug';
// import * as htmlToText from 'html-to-text';
// import { Injectable } from '@nestjs/common';
// import { CreateAdminDto } from 'src/modules/admin/dto/creaeteAdmin.dto';
// @Injectable()
// export class Email {
//   private to: string;
//   private firstName: string;
//   private password: string;
//   private url: string;
//   private from: string;

//   constructor() {}
//   setRecipientData(user: CreateAdminDto, url = '') {
//     this.to = user.email;
//     this.firstName = user.firstName;
//     this.password = user.password;
//     this.url = url;
//     this.from = `Food Trove <${process.env.EMAIL_USERNAME}>`;
//     return this;
//   }

//   newTransport() {
//     return nodemailer.createTransport({
//       host: process.env.Email_Host,
//       port: 587,
//       service: 'STMP',

//       auth: {
//         user: process.env.Email_username,
//         pass: process.env.Email_password,
//       },
//     });
//   }
//   //send the actuel email
//   async send(template: any, subject: string) {
//     //Render the html for a bug tempalte
//     const html = pug.renderFile(
//       `${__dirname}/../views/emails/${template}.pug`,
//       {
//         firstName: this.firstName,
//         url: this.url,
//         subject,
//         password: this.password,
//       },
//     );
//     //define the email opetions
//     const mailOptinos = {
//       from: this.from,
//       to: this.to,
//       subject,

//       text: htmlToText.convert(await html),
//     };
//     //create a transport &&&send email

//     await this.newTransport().sendMail(mailOptinos);
//   }
//   async sendWelcome() {
//     await this.send('welcome', 'welcome to the Tecno');
//   }
//   async sendAdminWelcome() {
//     await this.send('adminWelcome', 'welcome admin');
//   }
//   async sendPassWordReset() {
//     await this.send(
//       'passwordReset',
//       'Your password reset token valid for minutes',
//     );
//   }
// }
