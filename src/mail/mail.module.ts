import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { Subscriber, SubscriberSchema } from '@/subscribers/schemas/subscriber.schema';
import { Job, JobSchema } from '@/jobs/schemas/job.schemas';

@Module({
  controllers: [MailController],
  providers: [MailService],
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('EMAIL_HOST'),
          secure: false,
          auth: {
            user: configService.get<string>("EMAIL_AUTH_USER"),
            pass: configService.get<string>("EMAIL_AUTH_PASS"),
          }
        },
        template: {
          dir: join(__dirname, 'templates' ),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
        preview: configService.get<string>("EMAIL_PREVIEW") === "true" ? true : false, 
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Subscriber.name, schema: SubscriberSchema },
      { name: Job.name, schema: JobSchema },
    ])
  ],
})
export class MailModule {}
