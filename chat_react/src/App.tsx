import { Route, Routes } from "react-router-dom"
import { Button, ButtonGroup } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { Home } from "@/router/Home"
import { Chat } from "@/router/Chat"
import socketIOClient from "socket.io-client"
import { useEffect } from "react"
import configs from "@/config/config"

const ENDPOINT = `localhost:${configs().NEST.PORT}`

function App() {
  const socket = socketIOClient(ENDPOINT)
  console.log("APP",ENDPOINT)


  const enterChattingRoom = async () => {
    try {
      const data = socket.emit("msgToServer", "hello world")
      navigate("/chat")
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const unloadCallback = (event: any) => {
      event.preventDefault()
      const data = socket.emit("leaveRoom", "leave Room")
      console.log(data)
      event.returnValue = ""
      return ""
    }

    window.addEventListener("beforeunload", unloadCallback)
    return () => window.removeEventListener("beforeunload", unloadCallback)
  }, [])

  // const { isLoading, error, data } = useQuery(["enterChattingRoom"], () =>
  //   enterChattingRoom()
  // )

  const navigate = useNavigate()
  return (
    <div>
      <Button onClick={() => navigate(-1)}>go back</Button>
      <Button onClick={() => navigate("/home")}>Home</Button>
      <Button onClick={enterChattingRoom}>Chat</Button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  )
}

export default App
