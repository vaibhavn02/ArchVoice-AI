import "./ConfirmationCard.css";

function ConfirmationCard({
   

    type,
    command,
    onConfirm,
    onCancel,
    searchResults=[],
    updateCandidates=[],
    selectedUpdateIssue,
    deleteCandidates=[],
    selectedDeleteIssue,
    onSelectUpdate,
    onConfirmUpdate,
    onSelectDelete,
    onConfirmDelete
}){

    return(

        <div className="confirmation-card">
        {
            type==="CREATE" && command 
            &&
            (
            <div>
                <h2>🤖 Command Preview</h2>
               
                 <div className="field> 
                <strong>Issue:</strong>
                <p>{command.title}</p>

                <strong>Location:</strong>
                <p>{command.location}</p>

                <strong>Assigned To:</strong>
                <p>{command.assigned_to || "Not Assigned"}</p>

                <strong>Priority:</strong>
                <p>{command.priority}</p>
                </div>
                <button onClick={onConfirm}>✅ Confirm</button>

                <button onClick={onCancel}>❌ Cancel</button>

            </div>
            )
        }

        {
            searchResults.length > 0
            &&
            (
                <>
                    <h2>🔍 Search Results</h2>

                    {
                        searchResults.map(issue=>(

                            <div key={issue.id}>

                                <h3>{issue.title}</h3>

                                <p>Assigned To:{issue.assigned_to}</p>

                                <p>Location:{issue.location}</p>

                                <p>Status:{issue.status}</p>

                            </div>

                        ))

                    }
                </>
            )
        }

        {
            type==="UPDATE" && updateCandidates.length > 0 && (
                <>
                    <h2>🤖 Which issue do you want to update?</h2>
                    {
                        updateCandidates.map(issue=>(
                            <div key={issue.id}>
                                <h3>{issue.title}</h3>

                                <p>Assigned To: {issue.assigned_to}</p>

                                <p>Location:{issue.location}</p>

                                <p>Status:{issue.status}</p>

                                <button onClick={()=>onSelectUpdate(issue)}>Select</button>

                                <hr/>
                            </div>
                        ))
                    }
                </>
            )
        }

        {
            selectedUpdateIssue && (

            <>
                <h2>✅ Confirm Update</h2>

                <p>Issue:{selectedUpdateIssue.title}</p>

                <p>Assigned To:{selectedUpdateIssue.assigned_to}</p>

                <p>Change Status:Completed</p>

                <button onClick={onConfirmUpdate}>✅ Confirm Update</button>
            </>
            )
        }

        {
            type==="DELETE" && deleteCandidates.length > 0 && (
                <>
                    <h2>⚠️ Which issue do you want to delete?</h2>

                    {
                        deleteCandidates.map(issue=>(
                            <div key={issue.id}>
                                <h3>{issue.title}</h3>

                                <p>Location:{issue.location}</p>

                                <p>Status:{issue.status}</p>

                                <p>Assigned To:{issue.assigned_to}</p>

                                <button onClick={()=>onSelectDelete(issue)}>Select</button>

                                <hr/>
                            </div>
                        ))

                    }

                </>

            )
        }

        {
            selectedDeleteIssue && (
                <>
                    <h2>⚠️ Confirm Delete</h2>

                    <p>Are you sure you want to delete:</p>

                    <h3>{selectedDeleteIssue.title}</h3>

                    <p>Status:{selectedDeleteIssue.status}</p>

                    <p>Location: {selectedDeleteIssue.location}</p>

                    <p>Assigned To:{selectedDeleteIssue.assigned_to}</p>

                    <button onClick={onConfirmDelete}>🗑️ Confirm Delete</button>

                    <button onClick={()=>onSelectDelete(null)}>❌ Cancel</button>
                </>
            )
        }

    </div>
    );
}

export default ConfirmationCard;
