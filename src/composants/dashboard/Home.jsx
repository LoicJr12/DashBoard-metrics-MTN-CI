import React from 'react';
import '../../styles/Home.css'
import Disponibility from '../wigets_home/Disponibility.jsx';
import InfosRamCpu from '../wigets_home/InfosRamCpu.jsx';
import InfoStockage from '../wigets_home/InfoStockage.jsx';
import axiosInstance from '../AxiosInstance';


function Home(){
    const [selectedValue, setSelectedValue] = React.useState('0000-00-00 00:00:00');
    const [RecordHour, setRecordHour] = React.useState('')
    const [listRam, setListRam] = React.useState([{'id':0,'value':'0'},{'id':1,'value':'0'},{'id':2, 'value':'0'}])
    const [listCpu, setListCpu] = React.useState([{'id':0,'value':'0'},{'id':1,'value':'0'},{'id':2, 'value':'0'}])
    const [listDisk, setListDisk] = React.useState([{'id':0,'value':'0'},{'id':1,'value':'0'},{'id':2, 'value':'0'}, {'id':3, 'value':'0'}])
    const [nameDisk, setNameDisk] = React.useState('')
    
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

    const addRamValue = (Data) => {
        let list = []
        list = [...list, Data.find(item => item.name === 'Ram_Total')];
        list = [...list, Data.find(item => item.name === 'Ram_Used')];
        list = [...list, Data.find(item => item.name === 'Ram_Used_Percent')];
        return list;
    };

    const addHour = (Data) => {
        let list = []
        list = [...list, Data.find(item => item.name === 'Ram_Total')];
        return formatDate(list[0].date_joined)
    }

    const addCpuValue = (Data) => {
        let list = []
        list = [...list, Data.find(item => item.name === 'Cpu_Frequence')];
        list = [...list, Data.find(item => item.name === 'Cpu_Used_Percent')];
        list = [...list, Data.find(item => item.name === 'Cpu_Hearts')];
        return list;
    };

    const addDiskValue = (Data) => {
        let list = []
        list = [...list, Data.find(item => item.name === 'Disk_Total')];
        list = [...list, Data.find(item => item.name === 'Disk_Used')];
        list = [...list, Data.find(item => item.name === 'Disk_Used_Percent')];
        list = [...list, Data.find(item => item.name === 'Disk_Free')];
        return list;
    }

    const addDiskName = (Data) => {
        let list = []
        list = [...list, Data.find(item => item.name === 'Disk_Total')]
        console.log(list)
        const description = list[0].description
        const recuperation = description.indexOf("C:");
        const nameDisk = description.substring(recuperation, recuperation + 2);
        console.log(nameDisk)
        return nameDisk;
    } 

    const MetriquesServeursRequest = async (id) => {
        const parameter = JSON.stringify({ IdServeur : id })
        await axiosInstance.post('/metricserver', parameter)
            .then(response => {
              const resultat = response.data
              const updatedRam = addRamValue(resultat)
              const updatedCpu = addCpuValue(resultat)
              const updatedDisk = addDiskValue(resultat)
              const updateHour = addHour(resultat)
              const updatedDiskName = addDiskName(resultat)
              setListRam(updatedRam)
              setListCpu(updatedCpu)
              setListDisk(updatedDisk)
              setRecordHour(updateHour)
              setNameDisk(updatedDiskName)
              console.log("Request List Metrics has been forwaded with success", resultat)
            })
            .catch(error => {
              console.error('There was an error!', error);
        });
    
    };
    const [listServer, setListServer] = React.useState([]);

    const ServerListRequest = React.useCallback(async () => {

        await axiosInstance.get('/listserver')  // Remplacez '/endpoint' par votre endpoint
            .then(response => {
              const resultat = response.data;
              setListServer(resultat)
              console.log("Request List Server has been forwaded with success", response.data)
            })
            .catch(error => {
              console.error('There was an error!', error);
        });
    
    }, []);
    
    React.useEffect(() => {
        ServerListRequest();
    }, [ServerListRequest]);
    
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        const id_server = parseInt(event.target.value, 10)
        if (id_server){
            console.log(id_server, typeof(id_server))
            MetriquesServeursRequest(id_server)
        }else {
            setListRam([{'id':0,'value':'0'},{'id':1,'value':'0'},{'id':2, 'value':'0'}])
            setListCpu([{'id':0,'value':'0'},{'id':1,'value':'0'},{'id':2, 'value':'0'}])
            setListDisk([{'id':0,'value':'0'},{'id':1,'value':'0'},{'id':2, 'value':'0'}, {'id':3, 'value':'0'}])
            setRecordHour('')
            setNameDisk('')
        }
    };

    return(
        <div className='containeur_Home'>
            <span className='entete'>
                Dashboard Server
                <div style={{height: "2px", background: "#ffc400", width: "100%", borderRadius:"10px"}}></div>
            </span>
            <span style={{marginTop:20, display:"flex", alignItems:"center", flexDirection:"column"}}>
                <select  name="select_server" id="select_server" value={selectedValue} onChange={handleChange}>
                    <option value="" >Choose server</option>
                    {listServer.map(item => (<option key={item.id} value={item.id}>{item.name}</option>))}
                </select>
                <p style={{color:"#000", fontSize:18, fontWeight:"bolder", marginTop:10}}>Date and hour recorded : {RecordHour} </p>
            </span>
            <div className='section1'>
                <Disponibility infos="server"/>
                <Disponibility infos="database"/>
                <Disponibility infos="application"/>
            </div>
            <div className='section2'>
                <InfosRamCpu infos = "ram" dataValue = {listRam}/>
                <InfosRamCpu infos = "cpu" dataValue = {listCpu}/>
            </div>
            <div className="section3">
                <InfoStockage nameDisk = {nameDisk}  valueDisk={listDisk}/>
            </div>
        </div>
    )
}


export default Home;