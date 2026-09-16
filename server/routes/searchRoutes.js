const express = require("express");
const router = express.Router();

const db = require("../config/db");


router.get("/", (req,res)=>{
    const keyword = req.query.keyword;

    const sql = `
    SELECT * FROM issues
    WHERE title LIKE ?
    OR location LIKE ?
    OR assigned_to LIKE ?
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

            res.json(result);
        }
    );
});

module.exports = router;