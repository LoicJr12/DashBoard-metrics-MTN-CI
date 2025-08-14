import '../../styles/Dashboard.css'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
import Home from './Home.jsx'
import { useState } from 'react'


function Dashboard(){

    const [openSidebar, setOpenSidebar] = useState(false)
    function StateSidebar(){
        setOpenSidebar(!openSidebar)
    }

    return(
        <div className='containeur'>
            <Sidebar openSidebar={openSidebar} stateSidebar={StateSidebar}/>        
            <div className='containeur0'>
                <Header stateSidebar={StateSidebar}/>
                <Home/>
            </div>
        </div>
    )
}


export default Dashboard;