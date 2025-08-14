import React from 'react'
import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Backdrop from '@mui/material/Backdrop';
import { IoIosAddCircle } from "react-icons/io";
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { LuPencilLine } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import AddApps from './AddApps';
import axiosInstance from '../AxiosInstance';



export default function Applications() {
  const [data, setData] = React.useState([]);
  const dataRef = React.useRef(data);

  const AppListRequest = React.useCallback(async () => {

    axiosInstance.get('/listapp')  // Remplacez '/endpoint' par votre endpoint
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
    AppListRequest();
  }, [AppListRequest]);

  const UsersColumns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'version', headerName: 'Version', width: 130 },
    { field: 'type', headerName: 'Type', width: 130 },
    { field: 'lien', headerName: 'Link', width: 130 },
    { field: 'serveur_id', headerName: 'Id_Serveur', width: 100},
    { field: 'description', headerName: 'Description',  width: 100},
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

  const [openSidebar, setOpenSidebar] = useState(false)
  function StateSidebar(){
    setOpenSidebar(!openSidebar)
  }

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };


  return (
    <div className='containeur'>
      <Sidebar openSidebar={openSidebar} stateSidebar={StateSidebar}/>        
      <div className='containeur0'>
        <Header stateSidebar={StateSidebar}/>
        <div className='containeur_list_users'>
          <span>
            List of Applications
            <div style={{height: "2px", background: "#ffc400", width: "100%", borderRadius:"10px"}}></div>
          </span>
          <div className='dataTable'>
            <button onClick={handleOpen}> Add apps <IoIosAddCircle/></button>
            <Backdrop open={open} sx={{color:'#fff', display:'flex', flexDirection:'column', gap:'10px',zIndex: (theme) => theme.zIndex.drawer + 1 }}>
              <Button onClick={handleClose} sx={{color: 'red', fontSize: '18px', fontWeight: '900'}}>Close</Button>
              <AddApps/>
            </Backdrop>
            <DataGrid 
              style={{background:'#fff', borderRadius:'5px', width:'95%'}}
              rows={data}
              columns={UsersColumns.concat(Action)}
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
