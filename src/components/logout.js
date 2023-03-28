import axios from "axios";
import { useNavigate } from "react-router-dom";

import classes from './logout.module.css';

const Logout = () => {

    const navigate = useNavigate();

    const logoutHandler = () =>{
        axios.post("http://localhost:8080/api/auth/signout").then(
            response => {
                localStorage.removeItem('loginUser');
                navigate('/');
            }
        )
    }

    return <button className={classes.button} onClick={logoutHandler}>LogOut </button>
}

export default Logout;