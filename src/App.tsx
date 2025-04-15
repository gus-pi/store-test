import { Outlet } from 'react-router';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';

const App = () => {
  return (
    <div>
      <NavBar />
      <SideBar />
      <Outlet />
    </div>
  );
};
export default App;
