import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/App.css';
import { Table } from './modules/features/dashboard/Users/Table/Table';
import { Header } from './components/shared/layouts/Header';
import { Routes, Route } from 'react-router-dom';
import { Login } from './modules/features/Login/Login';
import { PrivateRoutes } from './components/shared/routes/PrivateRoutes';
import { ErorrRoutes, IsLoggedInRoute } from './components/shared/routes/PublicRoutes';

function App() {
  return (
    <div className='App'>
      <Header></Header>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/dashboard/users' element={<Table />}></Route>
        </Route>

        <Route element={<IsLoggedInRoute />}>
          <Route path='/' element={<Login />} />
        </Route>
        <Route element={<ErorrRoutes />}>
          <Route path='*'></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
