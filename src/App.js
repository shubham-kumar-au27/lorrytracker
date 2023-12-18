import './App.css';
import { RouterProvider ,createBrowserRouter} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import SandBookingForm from './components/Bookingform';
import Orderstage from './components/Orderstage';

function App() {
  const appRouter = createBrowserRouter([
    {
      path:'/',
      element:<Login/>
      
    },
    {
      path:'/home',
      element:<Home/>
    },
    {
      path:'/createOrder',
      element:<SandBookingForm/>
    },
    {
      path:'/orderstatus',
      element:<Orderstage/>
    }
  
  ])
  return (
    <Provider store={appStore}>
      <div className="App w-full">
      <RouterProvider router={appRouter}/>
      </div>
    </Provider>
  );
}

export default App;
