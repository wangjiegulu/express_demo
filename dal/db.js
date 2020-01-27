let mysql = require('mysql')
// let connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'admin123',
//     database: 'express_node_test'
// })

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'express_node_test',
    connectionLimit: 5
})

let getConnection = ()=>{
    return new Promise((resolve, reject)=>{
        pool.getConnection((err, connection)=>{
            if(err){
                reject(err)
            }else{
                resolve(connection)
            }
        })
    })
}

let connect = (connection)=>{
    return new Promise((resolve, reject)=>{
        connection.connect((err)=>{
            if(err){
                console.log("[MYSQL]err: ", err)
                reject(err)
            }else{
                resolve()
            }
        })
    })
}

let query = async (...args) => {
    let connection = await getConnection()
    // let r = await connect(connection)
    return new Promise((resolve, reject)=>{
        connection.query(...args, (err, results, fields)=>{
            if(err){
                reject(err)
            }else{
                resolve({results: results, fields: fields})
            }
        })
    })
}

// getConnection().connect((error)=>{
//     console.log("[mysql]connection error: ", error)
// })

// // connection.query('select * from person')
// getConnection().query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
// });

query('SELECT 1 + 1 AS solution')
.then(result=>{
    console.log('[MYSQL]The solution is: ', result.results[0].solution);
})
.catch(reason=>{
    console.log("[MYSQL]The solution error: ", reason)
})


module.exports = {
    query
}