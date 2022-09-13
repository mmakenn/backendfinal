import winston from 'winston'
import { deployMode } from '../../config.js'

// function buildProdLogger() {
//   const logger = winston.createLogger({
//     transports: [
//       new winston.transports.File({ filename: '/debugLogs/warn.log', 
//                                     level: 'warn' }),
//       new winston.transports.File({ filename: '/debugLogs/error.log', 
//                                     level: 'error' })
//     ],
//   })
//   return logger
// }

function buildDevLogger() {
  const logger = winston.createLogger({
    transports: [new winston.transports.Console({ level: 'info' })],
  })
  return logger
}

let logger = null

// if (deployMode === 'prod') {
//   logger = buildProdLogger()
// } else {
  logger = buildDevLogger()
// }

export default logger