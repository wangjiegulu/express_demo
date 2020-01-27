// import db from '../dal/db';
let db = require('../dal/db')

let queryPerson = async ()=>{
    // db.query('select * from person', (err, result)=>{
    //     if(err){
    //         console.log("[DATABASE ERROR]queryPerson: ", err.message)
    //         return
    //     }
    //     console.log("result: ", result)
    // })

    let result = await db.query('select * from person')
    let rows = result.results
    console.log("result: ", rows)
    return rows
}

let addPerson = async (name, age)=>{
    let result = await db.query("insert into person(name, age) values(?, ?)", [name, age])
    return result
}

module.exports = {
    queryPerson,
    addPerson
}