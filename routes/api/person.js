let router = require('express').Router()
let personService =  require('../../bll/personService')

router.get('/person', (req, res)=>{
    console.log("person get")

    personService.queryPerson()
    .then(result=>{
        res.json({
            code: 0,
            msg: 'success',
            data: result
        })
    })
})

router.post('/person', (req, res)=>{
    console.log("req: ", req.body)
    personService.addPerson(req.body.name, req.body.age)
    .then(result=>{
        res.json({
            code: 0,
            msg: 'success'
        })
    })
})

module.exports = router