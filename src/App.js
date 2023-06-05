import './App.css';
import Login from './component/login';
import { Routes, Route,Redirect} from "react-router-dom";
import Register from './component/register';
import DashBoard from './component/dashboard';
import ForgetPassword from './component/forgetPassword';
import ResetPassword from './component/resetPassword';

function App() {
  return (
    <Routes>
      <Route  path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={<DashBoard/>}/>
      <Route path='/forgetPassword' element={<ForgetPassword/>}/>
      <Route path='/resetPassword/:id/:token' element={<ResetPassword/>}/>
      <Route exact path="/">
          <Redirect to="/login" />
      </Route>
      <Route path="*">
          <Redirect to="/login" />
      </Route>
    </Routes>
  );
}

export default App;
