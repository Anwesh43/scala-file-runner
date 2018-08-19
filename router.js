const router = require('express').Router()
const scalaFileController = require('./ScalaFileController')
router.get('/execute/:fn', (req,res) => {
    console.log(req.params)
    scalaFileController.execute(req.params.fn, (result) => {
        res.json({result})
    })

})
module.exports = router
