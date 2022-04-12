import { format, createLogger, transports } from 'winston';
import path from 'path';
const { timestamp, combine, errors, json } = format;

function buildProdLogger() {
  return createLogger({
    format: combine(timestamp(), errors({ stack: true }), json()),
    defaultMeta: { service: 'user-service' },
    transports: [
      new transports.File({ filename: path.join(__dirname, "../logs/general.log") }),
      new transports.File({ filename: path.join(__dirname, "../logs/error.log"), level: "error" }),
    ],
  });
}

export default buildProdLogger;