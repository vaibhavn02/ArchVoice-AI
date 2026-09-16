import { useState } from "react";
import axios from "axios";
import IssueList from "./components/IssueList";
import ConfirmationCard from "./components/ConfirmationCard";
//import SearchResults from "./components/SearchResults";
import "./App.css";


function App(){

    const [text,setText] = useState("");
    const [message,setMessage] = useState("");
    const [isProcessing,setIsProcessing] = useState(false);
    const [pendingCreateCommand,setPendingCommand] = useState(null);
    const [refresh,setRefresh] = useState(false);
    const [searchResults,setSearchResults] = useState([]);
    const [updateCandidates,setUpdateCandidates] = useState([]);
    const [selectedUpdateIssue,setSelectedUpdateIssue] = useState(null);
    const [deleteCandidates,setDeleteCandidates] = useState([]);
    const [selectedDeleteIssue,setSelectedDeleteIssue] = useState(null);
    const [cardType,setCardType] = useState(null);

    const clearCards = ()=>{
        setPendingCommand(null);
        setSearchResults([]);
        setUpdateCandidates([]);
        setSelectedUpdateIssue(null);
        setDeleteCandidates([]);
        setSelectedDeleteIssue(null);
    };

    const sendCommand = async(command)=>{
        if(isProcessing)
        return;
        clearCards();

        setPendingCommand(null);
        setSearchResults([]);
        setDeleteCandidates([]);
        setSelectedDeleteIssue(null);
        setUpdateCandidates([]);
        setSelectedUpdateIssue(null);

        setIsProcessing(true);

        try{
            const response = await axios.post(
                "https://archvoiceai-backend.onrender.com/api/voice/command",
                {
                    text: command
                }
            );
            //console.log(response.data);
            console.log("FULL RESPONSE:", response.data);
            console.log("COMMAND DATA:", response.data.command);

            setMessage(response.data.message);

            if(response.data.command.intent === "CREATE_ISSUE"){
                setPendingCommand(response.data.command);
                setCardType("CREATE");
            }
            else if(response.data.command.intent === "DELETE_ISSUE"){
                console.log("🔥 DELETE INTENT DETECTED");
                setPendingCommand(null);
                findDeleteIssues(response.data.command.keyword);
                setCardType("DELETE");
            }
            else if(response.data.command.intent === "SEARCH_ISSUE"){
                setPendingCommand(null);
                searchIssue(response.data.command.keyword);
                setCardType("SEARCH");
            }
            else if(response.data.command.intent === "UPDATE_ISSUE"){
                console.log("🔥 UPDATE INTENT DETECTED");
                setPendingCommand(null);
                findUpdateIssue(response.data.command);
                setCardType("UPDATE");
            }

            console.log(
                "Saving command:",
                response.data.command
            );
        }
        catch(error){
            console.log(error);
            setMessage("Something went wrong");
        }
        finally {
            setIsProcessing(false);
        }
    };

    const confirmIssue = async()=>{
        try{
            const response = await axios.post(
                "https://archvoiceai-backend.onrender.com/api/issues/confirm",
                pendingCreateCommand
            );

            console.log(response.data);

            setMessage(response.data.message);

            setPendingCommand(null);

            setRefresh(!refresh);
        }
        catch(error){
            console.log(error);
            setMessage("Issue creation failed");
        }
    };

    const cancelIssue = ()=>{
        setPendingCommand(null);
        setMessage("Action cancelled");
    };

    const startListening = () => {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if(!SpeechRecognition){
            alert("Speech recognition not supported");
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.lang = "en-IN";
        recognition.continuous = false;
        recognition.interimResults = false;


        recognition.onstart = () => {
          console.log("Speech recognition started");
        };

        recognition.onresult = (event)=>{
            console.log("Result event fired");
            let transcript = "";
            for(let i = event.resultIndex; i < event.results.length; i++){
              transcript += event.results[i][0].transcript;
            }
            console.log("Command:", transcript);
            setText(transcript);
            sendCommand(transcript);
        };

        recognition.onerror = (event)=>{
          console.log("Speech error:", event.error);
        };

        recognition.onend = ()=>{
          console.log("Speech recognition ended");
        };

        recognition.start();

    };

    const searchIssue = async(keyword)=>{
        try{
            const response = await axios.get(
                `https://archvoiceai-backend.onrender.com/api/search?keyword=${keyword}`
            );

            setSearchResults(response.data);
        }
        catch(error){
            console.log(error);
        }
    };

    const findUpdateIssue = async(command)=>{
        console.log("UPDATE COMMAND SENT:", command);

        try{
            const response = await axios.post(
                "https://archvoiceai-backend.onrender.com/api/update/find",
                {
                    keyword: command.keyword,
                    new_status: command.new_status
                }
            );

            console.log(
                "UPDATE MATCHES:",
                response.data
            );
            setUpdateCandidates(response.data.issues);
        }
        catch(error){
            console.log(error);
        }
    };

    const selectUpdateIssue = (issue)=>{
        console.log(
            "Selected issue:",
            issue
        );
        setSelectedUpdateIssue(issue);

        // hide update selection list
        setUpdateCandidates([]);

    };

    const confirmUpdate = async()=>{
        try{
            const response = await axios.post(
                "https://archvoiceai-backend.onrender.com/api/update/confirm",
                {
                    id: selectedUpdateIssue.id,
                    status: "Completed"
                }
            );

            console.log(
                "UPDATE RESPONSE:",
                response.data
            );

            setMessage(
                response.data.message
            );

            setSelectedUpdateIssue(null);
            setRefresh(!refresh);
        }
        catch(error){
            console.log(error);
            setMessage("Update failed");
        }
    };

    const findDeleteIssues = async(keyword)=>{
        try{
            const response = await axios.post(
                "https://archvoiceai-backend.onrender.com/api/delete/find",
                {
                    keyword:keyword
                }
            );

            console.log(
                "DELETE MATCHES:",
                response.data
            );

            setDeleteCandidates(response.data.issues);
        }
        catch(error){
            console.log(error);
        }
    };

    const selectDeleteIssue = (issue)=>{
        console.log(
            "Selected delete issue:",
            issue
        );

        setSelectedDeleteIssue(issue);

        //hide selection list
        setDeleteCandidates([]);
    };

    const confirmDelete = async()=>{
        try{
            const response = await axios.post(
                "https://archvoiceai-backend.onrender.com/api/delete/confirm",
                {
                    id:selectedDeleteIssue.id
                }
            );

            console.log(response.data);
            setMessage(response.data.message);
            setSelectedDeleteIssue(null);
            setDeleteCandidates([]);

            // refresh issue list   
            setRefresh(!refresh);
        }
        catch(error){
            console.log(error);
            setMessage("Delete failed");
        }
    };



    return(
        <div className="app-container">
            <div className="app-header">
            <h1>ArchVoice AI</h1>
            <h3>Voice-based Site Issue Assistant</h3>
            </div>

            <button className="voice-btn" onClick={startListening}>🎤 Start Listening</button>

            <div className="command-box">
                Command:<span>{text}</span>
            </div>
            {/*<p>Command:{text}</p>*/}

            {/*<h3>{message}</h3>*/}
            <div className="message">{message}</div>

        {
            cardType && (
                <ConfirmationCard
                    type={cardType}
                    command={pendingCreateCommand}
                    searchResults={searchResults}
                    updateCandidates={updateCandidates}
                    selectedUpdateIssue={selectedUpdateIssue}
                    deleteCandidates={deleteCandidates}
                    selectedDeleteIssue={selectedDeleteIssue}

                    onConfirm={confirmIssue}
                    onCancel={cancelIssue}
                    onSelectUpdate={selectUpdateIssue}
                    onConfirmUpdate={confirmUpdate}
                    onSelectDelete={selectDeleteIssue}
                    onConfirmDelete={confirmDelete}
                />
            )
        }

            <IssueList refresh={refresh}/>

        </div>

    );
}

export default App;
