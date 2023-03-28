import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './login.module.css';

const Login = () => {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [credentials, setCredentials]= useState('');
    const navigate = useNavigate();
    const [userNameError, setUNError] = useState('');
    const [PasswordError, setPasswordError] = useState('');
    const [error, setError] = useState('');

    useEffect(()=>{
        const islogin = localStorage.getItem('loginUser')
        if(islogin){
            navigate('/vote');
        }

    },[navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        setPasswordError('');
        setUNError('');
        setCredentials('');
        setError('');
        axios.post("http://localhost:8080/api/auth/singin",{username,password})
        .then(
            response => {
                localStorage.setItem('loginUser',JSON.stringify(response.data))
                if(response.data.roles.map(role => "ROLE_ADMIN"===role)[0]){
                    navigate('/admin');
                }
                navigate('/vote')
            },
            error => {
                console.log(error)
                if(error.response.status === 401){
                    setCredentials('Login credentials must be corrected')
                }else if(error.response.status === 404){
                    setError(error.response.data);
                }
                else{
                    error.response.data.forEach(element => {
                        if(element.password){
                            setPasswordError('password must not be blank');
                        }
                        if(element.username){
                            setUNError('username must not be blank');
                        }
                    });
                }
            }
        )
    }

    return (
        <div className={classes.contener}>
            <div className={classes.contener_div}>
                <form className={classes.form}>
                { credentials && <div style={{padding:'10px',marginBottom:'20px',border:'2px solid red',color:'red',textAlign:'center', marginLeft:'24px'}}>
                {credentials}
            </div>}
            { error && <div style={{padding:'10px',marginBottom:'20px',border:'2px solid red',color:'red',textAlign:'center', marginLeft:'24px'}}>
                {error}
            </div>}
                <div>
                    <input placeholder="Username" type="text" value={username} onChange={(e)=> {setUserName(e.target.value)}} />
                    {userNameError && <div style={{marginLeft:'20px',textAlign:'center',color:'red'}}> {userNameError} </div>}
                </div>
                <div>
                    <input placeholder="Password" type="password" value={password} onChange={(e)=> {setPassword(e.target.value)}} />
                    {PasswordError && <div style={{marginLeft:'20px',textAlign:'center',color:'red'}}> {PasswordError} </div>}
                </div>
                <div className={classes.button_div}>
                    <button type='submit' onClick={submitHandler}>Login</button>
                    <button type='button' onClick={() => { navigate('/signup')  }}>Register</button>
                </div>
                </form>
            </div>
        </div>
    );
}

export default Login;