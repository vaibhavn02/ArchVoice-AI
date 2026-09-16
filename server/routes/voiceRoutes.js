const express = require("express");
const router = express.Router();

const parseCommand = require("../ai/commandParser");
const db = require("../config/db");

router.post("/command", (req,res)=>{
    const {text} = req.body;

    const command = parseCommand(text);

    console.log(command);

    if(command.intent === "CREATE_ISSUE"){
        res.json({
            message:"Create Command understood. Waiting for confirmation.",
            command:command
        });
    }
    else if(command.intent === "SEARCH_ISSUE") {
        res.json({
            message:"Search Command understood. Finding issue.",
            command:command
        });
    }

    else if(command.intent === "UPDATE_ISSUE"){
        res.json({
            message:"Update command understood. Finding issue.",
            command:command
        });
    }

    else if(command.intent === "DELETE_ISSUE"){
        res.json({
            message:"Delete command understood. Waiting for confirmation.",
            command:command
        });
    }

    else{

        res.json({
            message:"Command not understood",
            command
        });
    }
});

module.exports = router;