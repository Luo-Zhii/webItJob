import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { Public } from '@/auth/decorator/jwt_public';
import { ResponseMessage } from '@/auth/decorator/message';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Subscriber, SubscriberDocument } from '@/subscribers/schemas/subscriber.schema';
import { Job, JobDocument } from '@/jobs/schemas/job.schemas';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,

    @InjectModel(Subscriber.name)
    private readonly subscribersModel: SoftDeleteModel<SubscriberDocument>,
    @InjectModel(Job.name)
    private readonly jobsModel: SoftDeleteModel<JobDocument>
  ) {}

  @Get()
  @Public()
  @ResponseMessage("Send email")
  @Cron("0 0 0 * * 0")
  async handleTestEmail() {
    const subscribers = await this.subscribersModel.find();
    
    if (!subscribers.length) return; 

    for (const subscriber of subscribers) {
      const subsSkills = subscriber.skills;

      const jobWithMatchingSkills = await this.jobsModel.find({
        skills: { $in: subsSkills } 
      });

      if (jobWithMatchingSkills.length) {
        const jobs = jobWithMatchingSkills.map(item => ({
          title: item.name,
          company: item.company.name,
          location: item.location,
          salary: `${item.salary}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " VND",
          skills: item.skills,
          apply_link: "https://itviec.com/",
        }));

        await this.mailerService.sendMail({
          to: subscriber.email,
          from: 'Support Team <noreply@nestjs.com>',
          subject: 'Công việc mới phù hợp với bạn!',
          template: 'new-job',
          context: {
            name: subscriber.name,
            jobs: jobs,
          }
        });
      }
    }
  }
}
