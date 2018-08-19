const {RunnerRequest, ScalaRunner} = require('./scalaRunner')
class ScalaFileController {
    constructor() {
        this.fileResultMap = {}
        this.scalaRunner = new ScalaRunner()
    }

    execute(fileName, cb) {
        if (this.fileResultMap[fileName]) {
            cb(this.fileResultMap[fileName])
        }
        else {
            this.scalaRunner.addRequest(new RunnerRequest(fileName, (msg) => {
                this.fileResultMap[fileName] = msg
                cb(msg)
            }))
        }
    }
}
module.exports = new ScalaFileController()
