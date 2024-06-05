import { Outlet } from "react-router";
import Header from "../../components/Header";
import { Container } from "@radix-ui/themes";

const RootLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default RootLayout;
