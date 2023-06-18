import { useState } from "react"
import {
  ChakraProvider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  extendTheme,
  Text,
  Box,
  useToast,
  Flex,
  Center,
  Container,
  Button,
} from "@chakra-ui/react"
import socketIOClient from "socket.io-client"
import { theme } from "../theme/theme"
import configs from "@/config/config"

const ENDPOINT = `localhost:${configs().NEST.PORT}`



const socket = socketIOClient(ENDPOINT)

export const Chat = () => {
  const [userName, setUserName] = useState("")
  const [context, setContext] = useState("")
  const [chatList, setChatList] = useState([])

console.log("chat",ENDPOINT)

  const onKeyUp = (event: any) => {
    if (event.charCode === 13) {
      setChatList((state) => state.concat(event.target.value))
      const data = socket.emit("msgToServer", event.target.value)
      console.log(data)
      setContext("")
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(userName)
    console.log("hello worl")
    localStorage.setItem("userName", userName)
  }

  return (
    <ChakraProvider theme={theme}>
      <Flex>
        <Center w="100px" bg={"gray.300"}>
          <Text>로그인 리스트</Text>
        </Center>
        <Box p={8}>
          <FormControl className="home__container" onSubmit={handleSubmit}>
            <Text fontSize={"6xl"}>Sign in to Open Chat</Text>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Box p={3}>
              <Input
                width={400}
                id="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <Button
                // isLoading
                loadingText="Submitting"
                colorScheme={"cyan"}
                size={"md"}
                type={"submit"}
              >
                SIGN IN
              </Button>
            </Box>
            <br></br>
            <FormLabel htmlFor="context">Chatting</FormLabel>
            <Box color={"gray.300"} border={"1px"}>
              <Container colorScheme={"cyan"} backdropBlur="md">
                채팅내용
              </Container>
              <Container>채팅 2</Container>
              {chatList.map((value,index) => {
                return (
                  <Container
                    key={index}
                    backgroundColor={"red.100"}
                    border={"3px"}
                    color={"black"}
                    textAlign={"end"}
                  >
                    {localStorage.getItem("userName") + `: ${value}`}
                  </Container>
                )
              })}
              <Input
                type="text"
                size={"md"}
                width={550}
                value={context}
                onKeyPress={onKeyUp}
                onChange={(e) => setContext(e.target.value)}
              ></Input>
            </Box>
          </FormControl>
        </Box>
      </Flex>
    </ChakraProvider>
  )
}
