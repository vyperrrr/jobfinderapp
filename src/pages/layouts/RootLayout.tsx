import { Outlet } from "react-router";
import Header from "../../components/Header";

const RootLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default RootLayout;
