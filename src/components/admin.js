import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from './admin.module.css';
import Logout from "./logout";


const Admin = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("loginUser"))
    const [Candidatevote1, setCandidateVote1] = useState(0);
    const [Candidatevote2, setCandidateVote2] = useState(0);
    const [Candidatevote3, setCandidateVote3] = useState(0);
    const [Candidatevote4, setCandidateVote4] = useState(0);
    

    useEffect(() => {
        if(user.roles[0]==="ROLE_USER"){
            navigate('/vote');
        }
       axios.get("http://localhost:8080/api/vote",{
        headers:{
            'Authorization': user.tokenType+" "+user.accessToken,
        }}).then(
        response => {
           setCandidateVote1(response.data['Candidate_1'])
           setCandidateVote2(response.data['Candidate_2'])
           setCandidateVote3(response.data['Candidate_3'])
           setCandidateVote4(response.data['Candidate_4'])
        },
        error => {
            console.log(error);
        }
       ) 
    },[navigate,user])

    return <div className={classes.contener}>
        <Logout />
        <div className={classes.contener_div}>
            <div>
                CANDINATE 1 Vote {Candidatevote1} 
            </div>
            <div>
                CANDINATE 2 Vote {Candidatevote2}
            </div>
            <div>
                CANDINATE 3 Vote {Candidatevote3}
            </div>
            <div>
                CANDINATE 4 Vote {Candidatevote4}
            </div>
        </div>
    </div>
}

export default Admin;