import * as React from 'react'
import '../../styles/Connexion.css'
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { MdPhoneIphone } from "react-icons/md";
import axiosInstance from '../AxiosInstance';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';



function AddUser() {

    const [openError, setOpenError] = React.useState(false);
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const handleCloseError = () => {
        setOpenError(false);
    }; // État pour gérer l'ouverture de la Snackbar Error
    const handleCloseSuccess = () =>{
        setOpenSuccess(false);
    } 

    const emailRef = React.useRef(null)
    const passwordRef = React.useRef(null)
    const usernameRef = React.useRef(null)
    const nameRef = React.useRef(null)
    const contactRef = React.useRef(null)

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

    const handleSubmit = () => {
        ResgisterUserRequest()
    };

  return (
    <div className='loginsignup'>
        <form action="" onSubmit={handleSubmit}>
            <div className="Header">
                <div className="text" style={{fontSize: '25px'}}>Add New User</div>
                <div className="underline"></div>
            </div>
            <div className="Inputs_containeur">
                <div className="input">
                    <MdDriveFileRenameOutline  className='icon'/>
                    <input type="text" placeholder="name" name='name' ref={nameRef} required/>                
                </div>
                <div className="input">
                    <FaUserCircle  className='icon'/>
                    <input type="text" placeholder="username" name='username' ref={usernameRef} required/>                
                </div>
                <div className="input">
                    <MdEmail className='icon'/>
                    <input id="email" type="email" placeholder="email" name='email' ref={emailRef} required/>                
                </div>
                <div className="input">
                    <RiLockPasswordFill className='icon'/>
                    <input id="password" type="password" placeholder="password" name='password' ref={passwordRef} required/>                
                </div>
                <div>
                    <div className="input">
                        <MdPhoneIphone className='icon'/>
                        <input id="contact" type="tel" placeholder="phone number" name='contact' ref={contactRef} pattern="[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}" required/>                
                    </div>
                    <small className='smallformat'>format: 0501070304 </small>
                </div>
            </div>
            <div className='btn_submit'>
                <button type="submit">Add</button>
            </div>
        </form>
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

export default AddUser