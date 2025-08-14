import '../styles/App.css';
import Dashboard from './dashboard/Dashboard';
import Connexion from './login/Connexion';
import Users from './dashboard/Users.jsx'
import Serveurs from './dashboard/Serveurs.jsx'
import Applications from './dashboard/Applications.jsx'
import Profile  from './dashboard/Profile.jsx'
import DashboardApp from './dashboard/DashboardApp.jsx'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes.jsx';



function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element = {<Connexion/>} path="/"></Route>
        <Route element = {<Connexion/>} path="/login"></Route>
        <Route element = {<ProtectedRoutes/>}>
          <Route element = {<Dashboard/>} path="/dashboard"></Route>
          <Route element = {<DashboardApp/>} path="/dashboardapp"></Route>
          <Route element = {<Users/>} path="/dashboard/user"></Route>
          <Route element = {<Serveurs/>} path="/dashboard/server"></Route>
          <Route element = {<Applications/>} path="/dashboard/application"></Route>
          <Route element = {<Profile/>} path="/dashboard/profile"></Route>
        </Route>
      </Routes>
    </BrowserRouter> 
  );

}


export default App;