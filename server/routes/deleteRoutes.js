const express = require("express");
const router = express.Router();

const db = require("../config/db");


// Find issues before deleting
router.post("/find",(req,res)=>{

    const {
        keyword
    } = req.body;

    console.log(
        "DELETE SEARCH KEYWORD:",
        keyword
    );


    const sql = `
    SELECT *
    FROM issues
    WHERE title LIKE ?
    OR assigned_to LIKE ?
    OR location LIKE ?
    `;


    const searchValue = `%${keyword}%`;


    db.query(
        sql,
        [
            searchValue,
            searchValue,
            searchValue
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
                message:"Delete candidates found",
                issues:result
            });
        }
    );

});


// Confirm delete
router.post("/confirm",(req,res)=>{

    const {
        id
    } = req.body;

    const sql = `
    DELETE FROM issues
    WHERE id=?
    `;


    db.query(
        sql,
        [id],
        (err,result)=>{
            if(err){
                console.log(err);

                return res.status(500)
                .json({
                    error:"Database error"
                });
            }


            res.json({
                message:"Issue deleted successfully",
                id:id
            });
        }
    );

});

module.exports = router;