import './App.css';
import { RouterProvider ,createBrowserRouter} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  const appRouter = createBrowserRouter([
    {
      path:'/',
      element:<Login/>
      
    },
    {
      path:'/home',
      element:<Home/>
    }
  ])
  return (
    
      <div className="App">
      <RouterProvider router={appRouter}/>
      </div>
    
  
  );
}

export default App;
