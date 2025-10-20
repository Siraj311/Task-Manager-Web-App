import { Outlet } from "react-router"
import Header from "./Header/Header"
import PublicHeader from "./Header/PublicHeader"
import './Layout.css';

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Layout = ({ route }) => {

  return (
    <div className="layout-container">
      <div className="layout-main">
        <ToastContainer position="top-right" autoClose={2000} />

        {route === 'public' && <PublicHeader />}
        {route === 'protected' && <Header />}

        <main className="layout-content">
          <Outlet />
        </main>
      
      </div>
    </div>
  )
}

export default Layout