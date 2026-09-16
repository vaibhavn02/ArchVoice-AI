import "./SearchResults.css";

function SearchResults({results}){


    if(results.length === 0){
        return null;
    }


    return(

        <div className="search-card">

            <h2>
                🔍 Search Results
            </h2>


            {
                results.map((issue)=>(

                    <div key={issue.id}>

                        <h3>
                            {issue.title}
                        </h3>

                        <p>
                            Assigned To:
                            {issue.assigned_to}
                        </p>

                        <p>
                            Priority:
                            {issue.priority}
                        </p>

                        <p>
                            Status:
                            {issue.status}
                        </p>

                        <hr/>

                    </div>

                ))
            }


        </div>

    );

}


export default SearchResults;