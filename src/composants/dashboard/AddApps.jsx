import * as React from 'react'
import '../../styles/Connexion.css'
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";


function AddApps(){
    return(
        <div className='loginsignup'>
            <form action="">
                <div className="Header">
                    <div className="text" style={{fontSize: '25px'}}>Add Applications</div>
                    <div className="underline"></div>
                </div>
                <div className="Inputs_containeur">
                    <div className="input">
                        <MdDriveFileRenameOutline  className='icon'/>
                        <input type="text" placeholder="application name" name='appname' required/>                
                    </div>
                    <div className="input">
                        <MdDriveFileRenameOutline  className='icon'/>
                        <select name="server physical"  required>
                            <option value="">--- choose physical server ---</option>               
                            <option value="cmd server">--- cmdb server ---</option>               
                            <option value="eas server">--- eas server ---</option>               
                            <option value="desimal server">--- desimal server ---</option>  
                        </select>               
                    </div>
                    <div className="input">
                        <MdDriveFileRenameOutline  className='icon'/>
                        <select name="server database" required>
                            <option value="">--- choose database server ---</option>               
                            <option value="oracle server">--- Oracle server ---</option>               
                            <option value="mysql server">--- Mysql server ---</option>               
                            <option value="firebase server">--- Firebase server ---</option>  
                        </select>                   
                    </div>
                    <div className="input">
                        <FaUserCircle  className='icon'/>
                        <input type="text" placeholder="description app" name='description' required/>                
                    </div>
                </div>
                <div className='btn_submit'>
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddApps;