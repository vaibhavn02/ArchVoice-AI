import { useEffect, useState } from "react";
import axios from "axios";


function IssueList({refresh}){

    const [issues,setIssues] = useState([]);


    useEffect(()=>{


        axios
        .get("http://localhost:5000/api/issues")
        .then((response)=>{

            setIssues(response.data);

        })
        .catch((error)=>{

            console.log(error);

        });


    },[refresh]);



    return (

        <div>

            <h2>
                Site Issues
            </h2>


            {
                issues.map((issue)=>(

                    <div key={issue.id}>
                        

                        <h3>
                            {issue.title}
                        </h3>

                        <p>
                            Location: {issue.location}
                        </p>

                        <p>
                            Assigned To: {issue.assigned_to}
                        </p>

                        <p>
                            Priority: {issue.priority}
                        </p>

                        <p>
                            Status: {issue.status}
                        </p>

                        <hr/>

                    </div>

                ))
            }


        </div>

    );

}


export default IssueList;