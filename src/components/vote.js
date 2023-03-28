import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "./logout";

import classes from './vote.module.css';


const Vote = () => {
    const navigate = useNavigate();
    const [Candinate, setCandinate] = useState('');
    const [isVoted,setIsVoted]=useState(false);
    const [message, setMessage]=useState('');
    const user = JSON.parse(localStorage.getItem("loginUser"));
    const userId = user.id;
    const [CandidateIdError, setCandidateIdError] = useState('');
    useEffect(()=>{
        if(!user || user === null){
            navigate('/admin')
        }
        if(user.roles[0]==="ROLE_ADMIN"){
            navigate('/admin');
        }
        const data = { "userId": userId  }
        console.log(data)
        axios.post("http://localhost:8080/api/vote/voted",data,{
            headers:{
                'Authorization': user.tokenType+" "+user.accessToken,
            }
        })
        .then(response => {
            setIsVoted(response.data['isVoted']);
        },error => {
            console.log(error)
        })
    },[userId,user,navigate])

    const onClickHandler = () => {
        const data = { "userId":userId, "CandidateId":Candinate };
        console.log(data,'data')
        axios.post("http://localhost:8080/api/vote",data,{
            headers:{
                'Authorization': user.tokenType+" "+user.accessToken,
            }}).then(
            response => {
                setMessage(response.data['message'])
                setIsVoted(true);
            }
        ).catch(err=>{
            setCandidateIdError(err.response.data.map(errr => {
                return errr.CandidateId
            }));
        })
    }

    return <div className={classes.contener}>
    <Logout />
        <div className={classes.contener_div}>
        { CandidateIdError && !isVoted && !message && <div style={{padding:'10px',marginBottom:'20px',border:'2px solid red',color:'red',textAlign:'center'}}>
            Please Select any one CANDINATE
        </div>

        }
        {isVoted && !message && <div style={{color:'green', border:'1.5px solid', marginBottom:'10px'}}>
            <label>You already voted</label>
        </div>}
        {message && <div style={{color:'green', border:'1.5px solid', marginBottom:'10px'}}>
            <label>{message}</label>
        </div>}
            <div>
                <input type='radio' disabled={isVoted} name="Candinate" onChange={() => { setCandinate(1) }} id="1" value='1' />
                <label htmlFor="1">CANDINATE 1</label>
            </div>
            <div>
                <input type='radio' name="Candinate" disabled={isVoted} id="2" value='2' onChange={() => { setCandinate(2) }} />
                <label htmlFor="2">CANDINATE 2</label>
            </div>
            <div>
                <input type='radio' name="Candinate" disabled={isVoted} id="3" value='3' onChange={() => { setCandinate(3) }} />
                <label htmlFor="3">CANDINATE 3</label>
            </div>
            <div>
                <input type='radio' name="Candinate" disabled={isVoted} id="4" value='4' onChange={() => { setCandinate(4) }} />
                <label htmlFor="4">CANDINATE 4</label>
            </div>
            <button className={classes.button_div} disabled={isVoted} type="button" onClick={onClickHandler}>Vote</button>
        </div>
    </div>
}

export default Vote;