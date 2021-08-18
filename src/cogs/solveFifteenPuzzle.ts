import {RecurrenceRule, scheduleJob} from 'node-schedule';
import * as constant from '../constant';
import * as language from '../language';
import {getTextChannelById} from '../utils';

const schedule = new RecurrenceRule();
schedule.hour = 12;
schedule.minute = 30;

scheduleJob(schedule, async () => {
  const channel = getTextChannelById(constant.channelPlaygroundId);
  if (channel) await channel.send(language.solveFifteenPuzzle);
});
