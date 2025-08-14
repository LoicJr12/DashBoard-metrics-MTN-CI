import React from 'react'
import '../../styles/Disponibility.css'
import { FaServer } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa";
import { AiFillApi } from "react-icons/ai";
import { GrStatusGood } from "react-icons/gr";


function Disponibility({infos}) {

    let data = [];

    switch(infos){
        case "server":
            data = {
                titre : "Server availability",
                etat : "Yes",
                icon_etat : <GrStatusGood/>,
                icon_title : <FaServer className='icon'/>
            }
            break;
        case "database":
            data = {
                titre : "DB availability",
                etat : "Yes",
                icon_etat : <GrStatusGood/>,
                icon_title : <FaDatabase className='icon'/>
            }
            break;
        case "application":
            data = {
                titre : "App availabaility",
                etat : "Yes",
                icon_etat : <GrStatusGood/>,
                icon_title : <AiFillApi className='icon'/>
            }
            break;
        default:
            break;
    }

  return (
    <div className="bulle_section1">
        <div className='texts_bulle_section1'>
            <span>{data.titre}</span>
            <span className='info'>{data.etat} {data.icon_etat}</span>
        </div>
        <div className='icon_bulle_section1'>
            {data.icon_title}
        </div>
    </div>
  )
}

export default Disponibility;