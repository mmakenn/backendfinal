import os from 'os'

export const infoProcess = {
    args: process.argv,
    so: process.platform,
    nvm: process.version,
    rss: process.memoryUsage().rss,
    cpus: os.cpus().length,
    path: process.cwd(),
    processID: process.pid,
    folder: process.execPath.split('/').pop()
}