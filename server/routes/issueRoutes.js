const express = require("express");
const router = express.Router();

const db = require("../config/db");


// GET ALL ISSUES
router.get("/", (req,res)=>{
    const sql = "SELECT * FROM issues";

    db.query(sql,(err,result)=>{
        if(err){
            return res.status(500).json({
                error:"Database error"
            });
        }

        res.json(result);
    });
});


// CREATE ISSUE
router.post("/",(req,res)=>{
    const {
        title,
        description,
        location,
        assigned_to,
        priority
    } = req.body;


    const sql = `
    INSERT INTO issues
    (title,description,location,assigned_to,priority)
    VALUES (?,?,?,?,?)
    `;


    db.query(
        sql,
        [
            title,
            description,
            location,
            assigned_to,
            priority
        ],
        (err,result)=>{
            if(err){
                return res.status(500).json({
                    error:"Insert failed"
                });
            }

            res.json({
                message:"Issue created successfully",
                id:result.insertId
            });
        }
    );
});


// UPDATE STATUS
router.put("/:id",(req,res)=>{
    const {status}=req.body;

    const sql =
    "UPDATE issues SET status=? WHERE id=?";

    db.query(
        sql,
        [status,req.params.id],
        (err,result)=>{
            if(err){
                return res.status(500).json({
                    error:"Update failed"
                });
            }

            res.json({
                message:"Status updated"
            });
        }
    );
});

module.exports = router;