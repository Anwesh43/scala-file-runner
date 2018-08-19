const cp = require('child_process')

const scalaRunPromise = (fileName) => {
    return new Promise((resolve, reject) => {
        cp.exec(`scala scalaFiles/${fileName}.scala`, (err, stdout, stderr) => {
            if (err == null) {
                resolve({success : stdout, err : stderr})
            } else {
                console.log(err)
                reject({error : err})
            }
        })
    })
}

async function runScala(task, cb) {
    const result = await scalaRunPromise(task.fileName)
    if (task.cb) {
        var msg = result.success?result.success:result.error
        task.cb(msg.replace("\n", ""))
    }
    if (cb) {
        cb()
    }
}

class RunnerRequest {
    constructor(fileName, cb) {
        this.fileName = fileName
        this.cb = cb
    }

    respond(result) {
        this.task(result)
    }
}

class ScalaRunner {
    constructor() {
        this.queue = []
    }

    addRequest(rr) {
        this.queue.push(rr)
        if (this.queue.length == 1) {
            this.run()
        }
    }

    run() {
        if (this.queue.length > 0) {
            const task = this.queue[0]
            runScala(task, () => {
                this.queue.splice(0, 1)
                if (this.queue.length > 0) {
                    this.run()
                }
            })

        }
    }
}

module.exports = {RunnerRequest, ScalaRunner}
