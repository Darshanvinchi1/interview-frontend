import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Admin from './components/admin';
import Login from './components/login';
import SingUp from './components/signup';
import Vote from './components/vote';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,

  },
  {
    path: "/signup",
    element: <SingUp />
  },
  {
    path: "/vote",
    element: <Vote />
  },
  {
    path: "/admin",
    element: <Admin />
  }
])

function App() {
  return (
    <RouterProvider router={router}>
      <div>App.js</div>
    </RouterProvider>
  );
}

export default App;
