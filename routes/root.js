let router = require('express').Router()

router.get('/', (req, res, next)=>{
    // res.send('Hello Express (index)')
    res.render('index', {
        title: 'EXPRESS INDEX'
    })
})

module.exports = router