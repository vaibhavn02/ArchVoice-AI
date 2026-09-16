const express = require("express");
const router = express.Router();

const db = require("../config/db");


// Find issues for update
router.post("/find", (req,res)=>{

    const {
        keyword
    } = req.body;

    console.log("UPDATE SEARCH KEYWORD:", keyword);

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
                message:"Matching issues found",
                intent:"UPDATE_ISSUE",
                issues:result,
                new_status:req.body.new_status
            });
        }
    );
});



// Confirm Update
router.post("/confirm",(req,res)=>{

    const {
        id,
        status
    } = req.body;


    const sql = `
    UPDATE issues
    SET status=?
    WHERE id=?
    `;

    db.query(
        sql,
        [
            status,
            id
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
                message:"Issue updated successfully",
                id:id
            });
        }
    );
});

module.exports = router;