import SumoLogger, { SumoLoggerOptions } from 'sumo-logger'
import { config } from './config'
import { v4 as generateUuid } from 'uuid'

const opts: SumoLoggerOptions = {
  endpoint: config.SUMOLOGIC_ENDPOINT_URL || '',
  interval: 20000,
  sendErrors: true,
  sessionKey: generateUuid(),
  onSuccess: () => {}, 
  onError: () => {},
};

const sumoLogger = new SumoLogger(opts);

export const log = (message: string) => {
  sumoLogger.log(message)
}

sumoLogger.flushLogs()