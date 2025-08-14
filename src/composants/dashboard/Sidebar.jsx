import '../../styles/Sidebar.css';
import logo_profile from '../../assets/logo_mtn.jpg';
import { MdOutlineMenuOpen } from "react-icons/md";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { IoHome } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { BiServer } from "react-icons/bi";
import { AiOutlineApi } from "react-icons/ai";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../AxiosInstance';
import { FaUserCircle } from "react-icons/fa";
//import { useState } from 'react';
//import { RiMenuUnfold3Line2 } from "react-icons/ri";


function Sidebar({openSidebar, stateSidebar}){

    const navigate = useNavigate()

    async function Logout(){

        axiosInstance.post('/logout')  // Remplacez '/endpoint' par votre endpoint
            .then(response => {
                const resultat = response.data;
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
                navigate('/')
                console.log("token deleted with succes", resultat)
            })
            .catch(error => {
                console.error('There was an error!', error);
        }); 
    
    }

    const handleLogout = (e) => {
        e.preventDefault();
        Logout()
    };

    return(
        <div className={openSidebar ? 'containeur_sidebar' : 'containeur_sidebar containeur_sidebar_responsive'}>
            <div className="header_sidebar">
                <div className='header_text'>
                    <MdOutlineMenuOpen  className='header_icon menu' onClick={stateSidebar}/>
                    <span>ADMINISTRATOR</span>
                </div>
                <div className='underline_header_sidebar'></div>
            </div>

            <div className='profile_sidebar'>
                <img src={logo_profile} alt="logo du profile" />
                <span>Welcome {localStorage.getItem('username')}</span>
            </div>

            <div className='navigation_sidebar'>
                <span>Navigation</span>
                <div className='underline_nav_sidebar'></div>
                <ul className="list_nav">
                    <li>
                        <a href="/dashboard">
                            <IoHome className='nav_icon'/>
                            <span className="text_nav">Metrics Server</span>
                        </a>
                    </li>
                    <li>
                        <a href="/dashboardapp">
                            <TbDeviceDesktopAnalytics className='nav_icon'/>
                            <span className="text_nav">Metrics Apps</span>
                        </a>
                    </li>
                    <li>
                        <a href="/dashboard/user">
                            <FaUserGroup className='nav_icon'/>
                            <span className="text_nav">Users</span>
                        </a>
                    </li>
                    <li>
                        <a href="/dashboard/application">
                            <AiOutlineApi className='nav_icon'/>
                            <span className="text_nav">Applications</span>
                        </a>
                    </li>
                    <li>
                        <a href="/dashboard/server">
                            <BiServer className='nav_icon'/>
                            <span className="text_nav">Servers</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div className='footer_sidebar'>
                <span>Account</span>
                <div className='underline_footer_sidebar'></div>
                <ul className="list_nav">
                    <li>
                        <a className="logout" href="/dashboard/profile">
                            <FaUserCircle className='footer_icon'/>
                            <span className="text_nav">My profile</span>
                        </a>
                    </li>
                    <li className="logout" onClick={handleLogout}>
                        <TbLogout2 className='footer_icon'/>
                        <span className="text_nav">Logout</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}



/*
<li>
    <a href="/dashboard/profile">
        <FaUserCircle className='footer_icon0'/>
        <span className="text_nav">My Profile</span>
    </a>
</li>
*/

export default Sidebar;