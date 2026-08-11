import Topbar from './Topbar';
import { Outlet } from 'react-router-dom';


export default function Layout() {
    return (
        <>
            <Topbar />
            <Outlet />
        </>
    );
}
