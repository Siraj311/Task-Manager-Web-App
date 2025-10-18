import { Outlet } from "react-router"
import Header from "./Header/Header"
import './Layout.css';

const Layout = () => {

  return (
    <div className="layout-container">
      <div className="layout-main">

        <Header />

        <main className="layout-content">
          <Outlet />
        </main>
      
      </div>
    </div>
  )
}

export default Layout