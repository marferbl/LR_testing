import React, { useState } from "react";
import { Text, Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import { useBackendUrlBuilder } from "../hooks/useBackendUrlBuilder";
import CaptchaComponent from "./captcha-component";
import { useToast } from "@chakra-ui/react";
import { isEmpty } from "../hooks/isEmpty";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [surnames, setSurnames] = useState("");
  const [birth, setBirth] = useState("");
  const [email, setEmail] = useState("");
  const toast = useToast();

  const registerURL = useBackendUrlBuilder("/user/signup");

  const [captcha, setCaptcha] = useState(null);
  const [emptyFieldMessage, setEmptyFieldMessage] = useState(false);

  const resetFields = () => {
    setName("");
    setSurnames("");
    setBirth("");
    setEmail("");
  };

  const handleSubmit = () => {
    if (isEmpty(name) || isEmpty(surnames) || isEmpty(birth) || isEmpty(email)) {
      setEmptyFieldMessage(true);
    } else {
      axios
        .post(registerURL, { name, surnames, birth, email })
        .then((res) => {
          setEmptyFieldMessage(false);
          toast({
            title: "CUENTA CREADA.",
            description: "Cuenta creada correctamente",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        })
        .catch((err) => {
          toast({
            title: "ERROR",
            description: err.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });

      resetFields();
    }
  };
  return (
    <Box borderWidth={2} py={6} px={12} rounded={"xl"} bgColor={"white"}>
      <Text fontSize={22} textAlign={"center"} mb={8}>
        Registro
      </Text>
      <FormControl isRequired my={5}>
        <FormLabel htmlFor="name">Nombre</FormLabel>
        <Input id="name" placeholder="Nombre" onChange={(e) => setName(e.target.value)} value={name} />
      </FormControl>
      <FormControl isRequired my={5}>
        <FormLabel htmlFor="surnames">Apellidos</FormLabel>
        <Input id="surnames" placeholder="Apellidos" onChange={(e) => setSurnames(e.target.value)} value={surnames} />
      </FormControl>
      <FormControl isRequired my={5}>
        <FormLabel htmlFor="surnames">Correo electronico</FormLabel>
        <Input id="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email} />
      </FormControl>
      <FormControl isRequired my={5}>
        <FormLabel htmlFor="surnames">Fecha de nacimiento</FormLabel>
        <Input
          type="date"
          id="birth"
          placeholder="Fecha de nacimiento"
          onChange={(e) => setBirth(e.target.value)}
          value={birth}
        />
      </FormControl>
      <CaptchaComponent setCaptcha={setCaptcha} />
      <Button mt={4} bgColor={"#0b5fff"} color={"white"} type="submit" width={"100%"} onClick={handleSubmit} disabled={!captcha}>
        Submit
      </Button>

      {emptyFieldMessage && (
        <Text my={2} color={"red"}>
          Rellena todos los campos
        </Text>
      )}
    </Box>
  );
};

export default RegisterForm;
