import React from 'react'
import '../../styles/Dashboard.css'
import '../../styles/Profile.css';
import logo_profile from '../../assets/logo_mtn.jpg';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { IoPersonCircle } from "react-icons/io5";
import { GrContactInfo } from "react-icons/gr";
import { MdPhoneIphone } from "react-icons/md";
import { TbCalendarTime } from "react-icons/tb";
import { MdEmail } from "react-icons/md";



function Profile() {

  const [openSidebar, setOpenSidebar] = useState(false)
  function StateSidebar(){
    setOpenSidebar(!openSidebar)
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois sont de 0 à 11
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className='containeur'>
      <Sidebar openSidebar={openSidebar} stateSidebar={StateSidebar}/>        
      <div className='containeur0'>
        <Header stateSidebar={StateSidebar}/>
        <div className='containeur_Home' >
          <span className='entete'>
            My profile
            <div style={{height: "2px", background: "#ffc400", width: "100%", borderRadius:"10px"}}></div>
          </span>
          <div className='containeur_profile_page'>
            <div className='profile_photo'>
              <span className='title_profile_photo'>
                Your profile photo
                <div style={{height: "2px", background: "#ffc400", width: "100%", borderRadius:"10px"}}></div>  
              </span>
              <img src={logo_profile} alt="logo du profile" />
            </div>
            <div className='profile_infos'>
              <span className='title_profile_text'>
                Personnals informations
                <div style={{height: "2px", background: "#ffc400", width: "100%", borderRadius:"10px"}}></div>  
              </span>
              <div className='infos_text_profile'>
                <span className='label'>
                  <div id='label_name' ><GrContactInfo className='icon_label'/></div> 
                  Name : {localStorage.getItem('name')}
                </span>
              </div>
              <div className='infos_text_profile'>
                <span className='label'>
                  <IoPersonCircle className='icon_label'/> 
                  Username : {localStorage.getItem('username')}
                </span>
              </div>
              <div className='infos_text_profile'>
                <span className='label'>
                  <MdEmail className='icon_label'/> 
                  Email : {localStorage.getItem('email')}
                </span>
              </div>
              <div className='infos_text_profile'>
                <span className='label'>
                  <MdPhoneIphone className='icon_label'/> 
                  Phone number : {localStorage.getItem('contact')}
                </span> 
              </div>
              <div className='infos_text_profile'>
                <span className='label'>
                  <TbCalendarTime className='icon_label'/> 
                  Creation date : {formatDate(localStorage.getItem('date'))}
                </span> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;