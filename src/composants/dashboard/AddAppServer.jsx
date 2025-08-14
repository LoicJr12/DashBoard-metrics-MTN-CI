import * as React from 'react'
import '../../styles/Connexion.css'
import { MdDriveFileRenameOutline } from "react-icons/md";
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';

function AddAppServer() {

  const [open, setOpen] = React.useState(true) 
  const handleClose = () =>{
    setOpen(false)
  }
  return (
    <Backdrop open = {open} sx={{color:'#fff', display:'flex', flexDirection:'column', gap:'10px',zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Button onClick={handleClose} sx={{color: 'red', fontSize: '18px', fontWeight: '900'}}>Close</Button>
        <div className='loginsignup'>
            <form action="">
                <div className="Header">
                    <div className="text" style={{fontSize: '25px'}}>Add App Server</div>
                    <div className="underline"></div>
                </div>
                <div className="Inputs_containeur">
                    <div className="input">
                        <MdDriveFileRenameOutline  className='icon'/>
                        <input type="text" placeholder="server name" name='server_name' required/>                
                    </div>
                    <div className="input">
                        <MdDriveFileRenameOutline  className='icon'/>
                        <select name="server physical" required>
                            <option value="">--- choose physical server ---</option>               
                            <option value="cmd server">--- cmdb server ---</option>               
                            <option value="eas server">--- eas server ---</option>               
                            <option value="desimal server">--- desimal server ---</option>  
                        </select>             
                    </div>
                    <div className="input">
                        <MdDriveFileRenameOutline  className='icon'/>
                        <input type="text" placeholder="description" name='descrition' required/>            
                    </div>
                </div>
                <div className='btn_submit'>
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>      
    </Backdrop>
  )
}

export default AddAppServer