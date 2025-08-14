import React from 'react'
import '../../styles/Dashboard.css'
import '../../styles/DashboardApp.css'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
import { useState } from 'react'
import axiosInstance from '../AxiosInstance';



function DashboardApp() {
  const [openSidebar, setOpenSidebar] = useState(false)
  function StateSidebar(){
    setOpenSidebar(!openSidebar)
  }

  const [selectedValue, setSelectedValue] = React.useState('');
  const [listApps, setListApps] = React.useState([])
  const [dataMetrics, setDataMetrics] = React.useState([{'id':0,'value':'...........'}])
  const [RecordHour, setRecordHour] = React.useState('0000-00-00 00:00:00')

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

  const addHour = (Data) => {
    let list = []
    list = [...list, Data.find(item => item.name === 'Used_Ram_Mo')];
    return formatDate(list[0].date_joined)
  }

  const MetriquesAppsRequest = async (id) => {
    const parameter = JSON.stringify({ IdApplication : id })
    await axiosInstance.post('/metricsapp', parameter)
      .then(response => {
        const resultat = response.data
        const updateHour = addHour(resultat)
        setRecordHour(updateHour)
        setDataMetrics(resultat)
        console.log("Request List Metrics has been forwaded with success", resultat)
      })
      .catch(error => {
        console.error('There was an error!', error);
    });
  };

  const AppListRequest = React.useCallback(async () => {

    await axiosInstance.get('/listapp')  // Remplacez '/endpoint' par votre endpoint
      .then(response => {
        const resultat = response.data;
        setListApps(resultat)
        console.log("Request List Apps has been reforwaded with success", response.data)
      })
      .catch(error => {
        console.error('There was an error!', error);
    });

  }, []);

  React.useEffect(() => {
    AppListRequest();
  }, [AppListRequest]);


  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    const id_app = parseInt(event.target.value, 10)
    if (id_app){
      console.log(id_app, typeof(id_app))
      MetriquesAppsRequest(id_app)
    }else {
      setRecordHour('')
      setDataMetrics([{'id':0, 'value': '...........'}])
    }
  };

  return (
    <div className='containeur'>
      <Sidebar openSidebar={openSidebar} stateSidebar={StateSidebar}/>        
      <div className='containeur0'>
        <Header stateSidebar={StateSidebar}/>
        <div className='containeur_Home'>
          <span className='entete'>
            Dashboard Application
            <div style={{height: "2px", background: "#ffc400", width: "100%", borderRadius:"10px"}}></div>
          </span>
          <span style={{marginTop:20, display:"flex", alignItems:"center", flexDirection:"column"}}>
            <select  name="select_server" id="select_server" value={selectedValue} onChange={handleChange}>
              <option value="" >Choose Application</option>
              {listApps.map(item => (<option key={item.id} value={item.id}>{item.name}</option>))}
            </select>
            <p style={{color:"#000", fontSize:18, fontWeight:"bolder", marginTop:10}}>Date and hour recorded : {RecordHour} </p>
          </span>
          <div className='container_appdash'>
            <div className='infos_text'>
              <div className='text'>
                <div style={{height: "8px", background: "#ffc400", width: "8px", borderRadius:"100%"}}></div>
                <span>Application Directory : {dataMetrics.length !== 1 ? dataMetrics[1].value: dataMetrics[0].value}</span>    
              </div>
              <div className='text'>
                <div style={{height: "8px", background: "#ffc400", width: "8px", borderRadius:"100%"}}></div>
                <span>Application PID : {dataMetrics.length !== 1 ? dataMetrics[0].value: dataMetrics[0].value}</span>
              </div>
              <div className='text'>
                <div style={{height: "8px", background: "#ffc400", width: "8px", borderRadius:"100%"}}></div>
                <span>Application Statut : {dataMetrics.length !== 1 ? dataMetrics[2].value: dataMetrics[0].value}</span>
              </div>
              <div className='text'>
                <div style={{height: "8px", background: "#ffc400", width: "8px", borderRadius:"100%"}}></div>
                <span>Application Availabality : {dataMetrics.length !== 1 ? dataMetrics[3].value: dataMetrics[0].value}</span>
              </div>
              <div className='text'>
                <div style={{height: "8px", background: "#ffc400", width: "8px", borderRadius:"100%"}}></div>
                <span>Cpu consommed by application {"(%)"} : {dataMetrics.length !== 1 ? dataMetrics[4].value: dataMetrics[0].value} %</span>
              </div>
              <div className='text'>
                <div style={{height: "8px", background: "#ffc400", width: "8px", borderRadius:"100%"}}></div>
                <span>Ram used by application {"(%)"} : {dataMetrics.length !== 1 ? dataMetrics[5].value: dataMetrics[0].value} %</span>
              </div>
              <div className='text'>
                <div style={{height: "8px", background: "#ffc400", width: "8px", borderRadius:"100%"}}></div>
                <span>Ram used by application {"(in Mo)"} : {dataMetrics.length !== 1 ? dataMetrics[6].value: dataMetrics[0].value} Mo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardApp;