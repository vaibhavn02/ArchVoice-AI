function parseCommand(text) {

    let lowerText = text.toLowerCase().trim();

    let result = {
        intent: null,
        location: null,
        title: null,
        assigned_to: null,
        priority: "Medium",
        keyword:null,
        new_status: null
    };


    // -------------------------
    // 1. Extract Assigned Person
    // -------------------------

    let assignMatch = lowerText.match(
        /\b(?:assign|send|give)\s+(?:it\s+)?(?:to\s+)?(?:a\s+|an\s+|the\s+)?([a-z\s]+)$/i
    );

    if(assignMatch){
        result.assigned_to = assignMatch[1].trim();

        // remove assignment part from sentence
        lowerText = lowerText
            .replace(assignMatch[0],"")
            .trim();
    }


    // -------------------------
    // 2. Detect Intent
    // -------------------------

    // Detect SEARCH intent first
    if(
        /\b(mark|update|change|complete|completed|finish)\b/
        .test(lowerText)
    ){
        result.intent = "UPDATE_ISSUE";
    }

    else if(
        /\b(show|find|search|display|list)\b/
        .test(lowerText)
    ){
        result.intent = "SEARCH_ISSUE";
    }

    else if(
        /\b(delete|remove|erase|cancel)\b/
        .test(lowerText)
    ){
        result.intent = "DELETE_ISSUE"; 
    }

    else if(
        /\b(create|add|snag|snake|snake for|issue|issue for|issue of|problem|leakage|damage|short circuit)\b/
        .test(lowerText)
    ){
        result.intent = "CREATE_ISSUE";
    }


    // Extract search keyword
    if(result.intent === "SEARCH_ISSUE"){
        result.keyword = lowerText
            .replace(/\b(show|find|search|display|list)\b/g,"")
            .replace(/\b(me|the|all|an|a|of|for)\b/g,"")
            .replace(/\bissues?\b/g,"")
            .trim();
    }

    // Extract update keyword
    if(result.intent === "UPDATE_ISSUE"){
        result.keyword = lowerText
            .replace(/\b(mark|update|change|complete|completed|finish)\b/g,"")
            .replace(/\b(as|the|issue|issues|to|problem|of|for|an)\b/g,"")
            .trim();
    }

    //Extract new Status
    if(result.intent === "UPDATE_ISSUE"){
        if(
            lowerText.includes("completed") ||
            lowerText.includes("complete") ||
            lowerText.includes("finished")
        ){
            result.new_status="Completed";
        }
        else if(
            lowerText.includes("pending")
        ){
            result.new_status="Pending";
        }
    }


    //Extract Delete keyword
    if(
        result.intent === "DELETE_ISSUE"
    ){

        result.keyword = lowerText
            .replace(/\b(delete|remove|erase|cancel)\b/g,"")
            .replace(/\b(issue|issues|problem)\b/g,"")
            .replace(/\b(the|an|a|of|for)\b/g,"")
            .replace(/\s+/g, " ") // Safeguard: Collapses multiple spaces into one
            .trim();
    }    


    // -------------------------
    // 3. Priority
    // -------------------------

    if(
        lowerText.includes("urgent") ||
        lowerText.includes("high priority")
    ){

        result.priority="High";

    }


    // -------------------------
    // 4. Extract Location
    // -------------------------

    // Remove command words first
    lowerText = lowerText
        .replace(/\b(create|add|snag|snake|snake of|snag of)\b/g,"")
        .trim();

    // Pattern 1: "in kitchen"
    let locationMatch = lowerText.match(
        /\bin\s+([a-z\s]+)$/i
    );

    // Pattern 2: "for master bedroom ceiling"
    let forMatch = lowerText.match(
        /\bfor\s+([a-z\s]+)\s+(ceiling|floor|wall|room)$/i
    );

    if(locationMatch){
        result.location =
            locationMatch[1]
            .replace(/\b(and|so|please)\b/g,"")
            .trim();
    }

    else if(forMatch){
        result.location =
            forMatch[1]
            .trim();
    }

    // -------------------------
    // 5. Extract Title
    // -------------------------

    let title = lowerText;


    title = title
        .replace(/\bthere is\b/g,"")
        .replace(/\bthere's\b/g,"")
        .replace(/\b(create|add|snag|snake)\b/g,"")
        .replace(/\burgent\b/g,"")
        .replace(/\b(issue|problem)\b/g,"")
        .replace(/\b(a|an|the|and)\b/g,"")
        .replace(/\s+/g," ")
        .trim();

    // Remove starting "for"
    title = title.replace(/^for\s+/i,"")
                .replace(/^of\s+/i,"")

    if(result.intent === "CREATE_ISSUE"){
        result.title = title;
    }


    return result;
}


module.exports = parseCommand;