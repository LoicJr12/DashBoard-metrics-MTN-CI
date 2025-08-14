import * as React from 'react'
import '../../styles/Users.css'
import Backdrop from '@mui/material/Backdrop';
import { IoIosAddCircle } from "react-icons/io";
import axiosInstance from '../AxiosInstance';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { LuPencilLine } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import AddUser from './AddUser';
import Sidebar from './Sidebar';
import Header from './Header';



function Users() {
  const [data, setData] = React.useState([]);
  const dataRef = React.useRef(data);

  const UsersColumns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'Name', width: 160 },
    { field: 'email', headerName: 'Email', width: 200},
    { field: 'username', headerName: 'Username',  width: 130},
    { field: 'date_joined', headerName: 'Date de creation',  width: 180},
  ]

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

  const UserListRequest = React.useCallback(async () => {

    axiosInstance.get('/user')  // Remplacez '/endpoint' par votre endpoint
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
    for(const item of data){
      if(item.date_joined !== null){
        item.date_joined = formatDate(item.date_joined)
        console.log(item.date_joined)
      }
    }
  }, [data]);

  React.useEffect(() => {
    UserListRequest();
  }, [UserListRequest]);

  const Action = [
    {field:'action', headerName: 'Actions',with: 220,
      renderCell: () => {
        return(
          <div className='ActionUser'style={{width: 220}}>
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
    setOpen(true);
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
            List of Users
            <div style={{height: "2px", background: "#ffc400", width: "100%", borderRadius:"10px"}}></div>
          </span>
          <div className='dataTable'>
            <button onClick={handleOpen}> Add new user <IoIosAddCircle/></button>
            <Backdrop open={open} sx={{color:'#fff', display:'flex', flexDirection:'column', gap:'10px',zIndex: (theme) => theme.zIndex.drawer + 1 }}>
              <Button onClick={handleClose} sx={{color: 'red', fontSize: '18px', fontWeight: '900'}}>Close</Button>
              <AddUser/>
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

export default Users;
