const express = require("express");
const router = express.Router();

const db = require("../config/db");

router.post("/", (req,res)=>{
    const {
        title,
        location,
        assigned_to,
        priority
    } = req.body;

    const sql = `
    INSERT INTO issues
    (title, location, assigned_to, priority, status)
    VALUES (?,?,?,?,?)
    `;

    db.query(
        sql,
        [
            title,
            location,
            assigned_to,
            priority,
            "Pending"
        ],
        (err,result)=>{
            if(err){
                console.log(err);

                return res.status(500)
                .json({
                    error:"Database error"
                });
            }

            res.json({
                message:"Issue created successfully",
                id:result.insertId
            });
        }
    );
});

module.exports = router;