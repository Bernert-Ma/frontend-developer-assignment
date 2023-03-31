import { ChakraProvider } from "@chakra-ui/react";
import { ReactComponent as TimescaleLogo } from "../assets/logo.svg";
import Layout from "./Layout";

const App = () => (
  <ChakraProvider>
    <TimescaleLogo />
    <Layout />
  </ChakraProvider>
);

export default App;
