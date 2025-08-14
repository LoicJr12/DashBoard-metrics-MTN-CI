import * as React from 'react'
import '../../styles/Users.css'
import '../../styles/Serveurs.css'
import Backdrop from '@mui/material/Backdrop';
import { IoIosAddCircle } from "react-icons/io";
//import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { LuPencilLine } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import AddServer from './AddServer';
import Sidebar from './Sidebar';
import Header from './Header';
import axiosInstance from '../AxiosInstance';



function Serveurs() {
  const [data, setData] = React.useState([]);
  const dataRef = React.useRef(data);

  const ServerListRequest = React.useCallback(async () => {

    axiosInstance.get('/listserver')  // Remplacez '/endpoint' par votre endpoint
        .then(response => {
          const resultat = response.data;
          setData(resultat)
          dataRef.current = resultat;
          console.log("User List has been charged with success", resultat)
        })
        .catch(error => {
          console.error('There was an error!', error);
    });

  }, []);

  React.useEffect(() => {
    dataRef.current = data;
  }, [data]);

  React.useEffect(() => {
    ServerListRequest();
  }, [ServerListRequest]);

  const UsersColumns1 = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'adresse_ip', headerName: 'IP Address', width: 130 },
    { field: 'description', headerName: 'Description', width: 130},
  ]

  const UsersColumns2 = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'server_physique name', headerName: 'Physical Server', width: 130 },
    { field: 'port', headerName: 'Ports', width: 100},
    { field: 'is_active', headerName: 'Status',  width: 100},
    { field: 'description', headerName: 'Description',  width: 180},
  ]

  const Action = [
    {field:'action', headerName: 'Actions',with: 300,
      renderCell: () => {
        return(
          <div className='ActionUser'style={{width: 300}}>
            <span className='edit'>Edit <LuPencilLine/></span>
            <span className='delete'>Delete <MdDelete/></span>
          </div>
        )
      }
    }
  ]


  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true)
  };

  const [openSidebar, setOpenSidebar] = React.useState(false)
  function StateSidebar(){
      setOpenSidebar(!openSidebar)
  }

  return (
    <div className='containeur'>
      <Sidebar openSidebar={openSidebar} stateSidebar={StateSidebar}/>        
      <div className='containeur0'>
        <Header stateSidebar={StateSidebar}/>
        <div className='containeur_list_users'>
          <span>
            List of Servers
            <div style={{height: "2px", background: "#ffc400", width: "100%", borderRadius:"10px"}}></div>
          </span>
          <div className='dataTable'>
            <div className='dataTable_Text'>
              <span>
                Physical Server
                <div style={{height: "2px", background: "#ffc400", width: "100%", borderRadius:"10px"}}></div>
              </span>
              <button onClick={() => {handleOpen()}}> Add new server <IoIosAddCircle/></button>
            </div>
            <Backdrop open={open} sx={{color:'#fff', display:'flex', flexDirection:'column', gap:'10px',zIndex: (theme) => theme.zIndex.drawer + 1 }}>
              <Button onClick={handleClose} sx={{color: 'red', fontSize: '18px', fontWeight: '900'}}>Close</Button>
              <AddServer/>
            </Backdrop>
            <DataGrid 
              style={{background:'#fff', borderRadius:'5px', width:'95%'}}
              rows={data}
              columns={UsersColumns1.concat(Action)}
              initialState={{
                pagination: {paginationModel: { page: 0, pageSize: 5 }},
              }}
              pageSizeOptions={[5 ,10, 15, 20]}
              checkboxSelection
            />
          </div>
          <div className='dataTable'>
            <div className='dataTable_Text'>
              <span>
                Application Server
                <div style={{height: "2px", background: "#ffc400", width: "100%", borderRadius:"10px"}}></div>
              </span>
              <button onClick={handleOpen}> Add new server <IoIosAddCircle/></button>
            </div>
            <DataGrid 
              style={{background:'#fff', borderRadius:'5px', width:'95%'}}
              rows={data}
              columns={UsersColumns2}
              initialState={{
                pagination: {paginationModel: { page: 0, pageSize: 5 }},
              }}
              pageSizeOptions={[5 ,10, 15, 20]}
              checkboxSelection
            />
          </div>
          <div className='dataTable'>
            <div className='dataTable_Text'>
              <span>
                Database Server
                <div style={{height: "2px", background: "#ffc400", width: "100%", borderRadius:"10px"}}></div>
              </span>
              <button onClick={handleOpen}> Add new server <IoIosAddCircle/></button>
            </div>
            <DataGrid 
              style={{background:'#fff', borderRadius:'5px', width:'95%'}}
              rows={data}
              columns={UsersColumns2}
              initialState={{
                pagination: {paginationModel: { page: 0, pageSize: 5 }},
              }}
              pageSizeOptions={[5 ,10, 15, 20]}
              checkboxSelection
            />
          </div>
        </div>
      </div>
    </div>      
  )
}

export default Serveurs;
