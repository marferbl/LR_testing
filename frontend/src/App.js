import RegisterForm from "./components/register-form";
import { Flex } from "@chakra-ui/react";

function App() {
  return (
    <Flex justify={"center"} align={"center"} minH={"100vh"} bgColor={"#19ab4f9e"}>
      <RegisterForm />
    </Flex>
  );
}

export default App;
