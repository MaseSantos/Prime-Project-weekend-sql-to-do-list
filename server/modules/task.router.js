const express = require('express');
const router= express.Router();
const pool = require('./pool');

//GET
router.get('/', (req, res) => {
    console.log('in router /task GET');
    let queryString = `SELECT * FROM "tasks" ORDER BY "done", "due_date" DESC, "urgency" DESC`;
    pool.query(queryString).then((result) => {
        // success
        res.send(result.rows);
    }).catch((err) => {
        // error
        res.send(500);
    })
}) 
//POST
router.post('/', (req, res) => {
    console.log('in /task POST:', req.body);
    let queryString = `INSERT INTO "tasks" 
        ( "due_date", "task_name", "description", "urgency", "done" ) 
        VALUES ( $1, $2, $3, $4, $5 )`;
    pool.query(queryString,
        [req.body.due_date, req.body.task_name, req.body.description, 
        req.body.urgency, req.body.done]
        ).then((result) => {
            res.sendStatus(201);
        }).catch((err) => {
            console.log(err, 'check router POST');
            res.sendStatus(500);
        })
})

//PUT

//DELETE

module.exports = router;