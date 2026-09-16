const parseCommand = require("./ai/commandParser");


let command =
//"Create an issue for bathroom ceiling leakage and assign to false ceiling contractor";
//"Add issue for broken window and assign to carpenter";
//"Create an urgent false ceiling issue in bedroom and assign it to a contractor";
//"Show me water leakage issues";
//"Mark false ceiling issue as completed";
//"Mark water leakage issue as completed";
//"Delete electrical leakage issue";
"create snag for master bedroom ceiling and assign it to a plumber";

let result = parseCommand(command);


console.log(result);