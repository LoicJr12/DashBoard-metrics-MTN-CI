import * as React from 'react'
import '../../styles/Connexion.css'
import { MdDriveFileRenameOutline } from "react-icons/md";

function AddServer() {

  return (
    <div className='loginsignup'>
        <form action="">
            <div className="Header">
                <div className="text" style={{fontSize: '25px'}}>Add {Text} Server</div>
                <div className="underline"></div>
            </div>
            <div className="Inputs_containeur">
                <div className="input">
                    <MdDriveFileRenameOutline  className='icon'/>
                    <input type="text" placeholder="server name" name='server_name' required/>                
                </div>
                <div className="input">
                    <MdDriveFileRenameOutline  className='icon'/>
                    <input type="text" placeholder="ip address of server" name='ip_address' required/>                
                </div>
                <div className="input">
                    <MdDriveFileRenameOutline  className='icon'/>
                    <input type="text" placeholder="domain name" name='domain_name' required/>                
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
  )
}

export default AddServer