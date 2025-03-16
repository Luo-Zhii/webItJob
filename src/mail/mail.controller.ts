import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { Public } from '@/auth/decorator/jwt_public';
import { ResponseMessage } from '@/auth/decorator/message';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly mailerService: MailerService,
  ) {}
  
  @Get()
  @Public()
  @ResponseMessage("Send email")
  async handleTestEmail() {
    await this.mailerService
    .sendMail({
      to: 'provl4321@gmail.com', // list of receivers
      from: 'Support Team <noreply@nestjs.com>', // sender address
      subject: 'Testing Nest MailerModule ✔', // Subject line
      text: 'welcome', // plaintext body
      html: '<b>welcome</b>', // HTML body content
    })
  }
}
