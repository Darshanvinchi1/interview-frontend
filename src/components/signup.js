
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './signup.module.css';

const SingUp = () => {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isSubmited, setIsSubmited] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [userNameError, setUNError] = useState('');
    const [PasswordError, setPasswordError] = useState('');
    const [PNError, setPNError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const islogin = localStorage.getItem('loginUser')
        if(islogin){
            navigate('/vote');
        }
    },[navigate])

    const registerHandler = (e) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');
        setUNError('');
        setPNError('');

        const data = {username,password,email,phoneNumber}
        axios.post("http://localhost:8080/api/auth/signup",data).then(
            response => {
                console.log(response.data)
                setMessage(response.data['message']);
                setEmail('');
                setUserName('');
                setPassword('');
                setPhoneNumber('');
                setIsSubmited(false);
                setTimeout(()=>{
                    navigate('/');
                },2000);
            },
            error => {
                if(error.response.data.message){
                    if(error.response.data.message.split(':')[1].indexOf('Username') > -1){
                        setUNError(error.response.data.message.split(':')[1])
                    }else{
                        setEmailError(error.response.data.message.split(':')[1])
                    }
                }else
                {error.response.data.forEach(element => {
                    if(element.email){
                        console.log(element.email.indexOf('well-formed'))
                        if(element.email.indexOf('well-formed') > -1){
                            setEmailError('must be a well-formed email address')
                        }else{

                            setEmailError('Email must not be blank');
                        }
                    }
                    if(element.password){
                        setPasswordError('password must not be blank');
                    }
                    if(element.username){
                        setUNError('username must not be blank');
                    }
                    if(element.phoneNumber){
                        setPNError('PhoneNumber must not be blank');
                    }
                });}
            }
        )

    } 


    return <div className={classes.contener}>
        <div className={classes.contener_div}>
            <form style={{width:'25%'}}>
            {message && <div style={{color:'green', border:'1.5px solid', marginBottom:'10px', textAlign:'center',marginLeft:'23px'}}>
                <label>{message}</label>
            </div>}
            <div>
                <input required placeholder="username" type="text" value={username} onChange={(e) => { setUserName(e.target.value) }} />
                {userNameError && <div style={{marginLeft:'20px',textAlign:'center',color:'red'}}> {userNameError} </div>}
            </div>
            <div>
                <input required placeholder="password" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                {PasswordError && <div style={{marginLeft:'20px',textAlign:'center',color:'red'}}> {PasswordError} </div>}
            </div>
            <div>
                <input required placeholder="Email" type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                {emailError && <div style={{marginLeft:'20px',textAlign:'center',color:'red'}}> {emailError} </div>}
            </div>
            <div>
                <input required placeholder="Phone No." maxLength='10' type="number" value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} />
                {PNError && <div style={{marginLeft:'20px',textAlign:'center',color:'red'}}> {PNError} </div>}
            </div>
            <div className={classes.button_div}>
                    <button type='button' disabled={isSubmited} onClick={() => { navigate('/')  }}>Login</button>
                    <button type='submit' disabled={isSubmited} onClick={registerHandler}>{ isSubmited ? "Please wait..." : "Register"}</button>
                </div>
            </form>
        </div>
    </div>
}

export default SingUp;