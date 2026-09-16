require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./config/db");
const issueRoutes = require("./routes/issueRoutes");
const voiceRoutes = require("./routes/voiceRoutes");
const confirmRoutes = require("./routes/confirmRoutes");
const searchRoutes = require("./routes/searchRoutes");
const updateRoutes = require("./routes/updateRoutes");
const deleteRoutes = require("./routes/deleteRoutes");

const app = express();

app.use(cors({origin:"https://archvoice-ai.onrender.com"}));
app.use(express.json());
app.use("/api/issues", issueRoutes);
app.use("/api/voice", voiceRoutes);
app.use("/api/issues/confirm", confirmRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/update",updateRoutes);
app.use("/api/delete", deleteRoutes);

// Test API
app.get("/", (req,res)=>{
    res.send("ArchVoice Backend Running");
});


// Get all issues
app.get("/api/issues",(req,res)=>{
    const sql = "SELECT * FROM issues";
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err);

            res.status(500).json({
                error:"Database error"
            });
            return;
        }
        res.json(result);
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
