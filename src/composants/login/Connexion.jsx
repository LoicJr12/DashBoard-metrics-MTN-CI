import { useState, useRef  } from 'react'
import '../../styles/Connexion.css'
import mtn_logo from '../../assets/logo_mtn.jpg'
import { MdDriveFileRenameOutline, MdEmail } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../AxiosInstance';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
import { MdPhoneIphone } from "react-icons/md";



function Connexion(){

    const [title, setTitle] = useState("Login")
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const handleCloseError = () => {
        setOpenError(false);
    }; // État pour gérer l'ouverture de la Snackbar Error
    const handleCloseSuccess = () =>{
        setOpenSuccess(false);
    } 
    const navigate = useNavigate()

    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const usernameRef = useRef(null)
    const nameRef = useRef(null)
    const contactRef = useRef(null)

    async function ResgisterUserRequest(){
        const data = {
            username : usernameRef.current.value,
            name : nameRef.current.value,
            password : passwordRef.current.value,
            email : emailRef.current.value,
            contact : contactRef.current.value,
        }
        
        const resetForm = () => {
            if (usernameRef.current) usernameRef.current.value = '';
            if (nameRef.current) nameRef.current.value = '';
            if (emailRef.current) emailRef.current.value = '';
            if (passwordRef.current) passwordRef.current.value = '';
            if (contactRef.current) contactRef.current.value = '';
        }
        
        const parameter = JSON.stringify(data)

        axiosInstance.post('/register', parameter)  // Remplacez '/endpoint' par votre endpoint
            .then(response => {
                const result = response.data;
                setOpenSuccess(true);
                resetForm();
                console.log(`User created successfully: ${JSON.stringify(result)}`);
            })
            .catch(error => {
                console.error('There was an error!', error);
                setOpenError(false);
        });    
    }
    
    async function LoginApi(){
        const data = {
            password : passwordRef.current.value,
            email : emailRef.current.value
        }

        const resetForm = () => {
            if (emailRef.current) emailRef.current.value = '';
            if (passwordRef.current) passwordRef.current.value = '';
        }

        const redirectToDashboard = () => {
            navigate('/dashboard')
        }


        const parameter = JSON.stringify(data)

        axiosInstance.post('/login', parameter)  // Remplacez '/endpoint' par votre endpoint
            .then(response => {
                const result = response.data;
                resetForm();
                localStorage.setItem('access_token', result.access_token);
                localStorage.setItem('refresh_token', result.refresh_token);
                localStorage.setItem('username', result.username);
                localStorage.setItem('name', result.name);
                localStorage.setItem('email', result.email);
                localStorage.setItem('date', result.date);
                localStorage.setItem('contact', result.contact);
                redirectToDashboard();                
            })
            .catch(error => {
                console.error('There was an error!', error);
                setOpenError(true);
        });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title === "Sign up") {
            ResgisterUserRequest();
        } else {
            LoginApi();
        }
    };

    
    function DivName(){
        return(
            <div className="input">
                <MdDriveFileRenameOutline  className='icon'/>
                <input id='fullname' type="text" placeholder="full name" name='name' ref={nameRef} required/>                
            </div>
        )
    }
    
    function DivUsername(){
        return(
            <div className="input">
                <FaUserCircle  className='icon'/>
                <input id='username' type="text" placeholder="username" name='username' ref={usernameRef} required/>                
            </div>
        )
    }

    function DivContact(){
        return(
            <div>
                <div className="input">
                    <MdPhoneIphone className='icon'/>
                    <input id="contact" type="tel" placeholder="phone number" name='contact' ref={contactRef} pattern="[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}" required/>                
                </div>
                <small className='smallformat'>format: 0501070304 </small>
            </div>
        )
    }

    return(
        <div className='containeur'>
            <div className="containeur_image">
                <img src={mtn_logo} alt="logo de MTN CI"/>
            </div>
            <div className='containeur_loginsignup'>
                <div className='loginsignup'>
                    <form onSubmit={handleSubmit} >
                        <div className="Header">
                            <div className="text">{title}</div>
                            <div className="underline"></div>
                        </div>
                        <div className="Inputs_containeur">
                            {title ==="Sign up"? DivName() : null}
                            {title ==="Sign up"? DivUsername() : null}
                            <div className="input">
                                <MdEmail className='icon'/>
                                <input id="email" type="email" placeholder="email" name='email' ref={emailRef} required/>                
                            </div>
                            <div className="input">
                                <RiLockPasswordFill className='icon'/>
                                <input id="password" type="password" placeholder="password" name='password' ref={passwordRef} required/>                
                            </div>
                            {title ==="Sign up"? DivContact() : null}
                        </div>
                        <div className='btn_submit'>
                            <button >Sign in</button>
                        </div>
                        <div className="submit_containeur">
                            <div className={title === "Sign up"? "submit gris" : "submit"} onClick={()=> setTitle("Login")}>Login</div>  
                            <div className={title === "Login"? "submit gris" : "submit"} onClick={()=> setTitle("Sign up")}>Sign Up</div>                            
                        </div>
                        <div className="password_oublié">
                            Forgot your password ?<a href='LoginSignup.jsx'> Click Here !</a>
                        </div>
                    </form>
                </div>
            </div>
            <Snackbar open={openError} autoHideDuration={3500} onClose={handleCloseError}>
                <Alert
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%'}}
                >  
                    <AlertTitle>ERROR</AlertTitle>
                    Invalid password or email!
                </Alert>
            </Snackbar>
            <Snackbar open={openSuccess} autoHideDuration={3500} onClose={handleCloseSuccess}>
                <Alert
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%'}}
                >  
                    <AlertTitle>SUCCESS</AlertTitle>
                    Successful login!
                </Alert>
            </Snackbar>
        </div>
    )
}


export default Connexion;