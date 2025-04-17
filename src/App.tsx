import { Outlet } from 'react-router';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';

const App = () => {
  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex flex-1 px-1 max-h-[100px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default App;
