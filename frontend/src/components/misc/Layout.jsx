import { Outlet } from "react-router-dom";
import { HeaderMenu } from "./Header/HeaderMenu";
import FooterCentered from "./FooterCentered";
import Navbar from "./Navbar";

const footerStyle = {
  width: "100%",
  textAlign: "center",
};

const Layout = () => {
  return (
    <div>
      <HeaderMenu />
      <main>
        <Outlet />
      </main>
      <footer style={footerStyle}>
        <FooterCentered />
      </footer>
    </div>
  );
};

export default Layout;
