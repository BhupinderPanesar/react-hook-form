import { } from 'react'
import './App.css'
import { useQuery } from '@tanstack/react-query';
import { api } from './api';
import { Users } from './Users';
import { Divider } from 'semantic-ui-react'
import { CreateUpdateUser } from './CreateUpdateUser';
import { ToastContainer } from 'react-toastify';
import { Outlet, useLocation } from 'react-router-dom';

function App() {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: () => {
      return api.getAll();
    }
  });
  const location = useLocation();
  console.log("query data");
  console.log(query.data)

  return (
    <>
      {
        location.pathname === "/" ? (
          <>
            <Users users={query.data || []} />
            <Divider />
            <CreateUpdateUser />
            <ToastContainer />
          </>
        ) : (
          <>
            <Outlet />
            <ToastContainer />
          </>
        )
      }
    </>
  )
}

export default App
