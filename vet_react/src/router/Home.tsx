import axios from "axios"
import { useQuery } from "react-query"
import configs from "@/config/config"

const ENDPOINT = `http://localhost:${configs().NEST.PORT}`

export const Home = () => {
console.log("home",ENDPOINT)
  const fetchData = async () => {
    try {
      const { data } = await axios(ENDPOINT)
      return JSON.stringify(data)
    } catch (err) {
      console.log(err)
    }
  }

  const { isLoading, error, data } = useQuery(["fetchData"], () => fetchData())

  return (
    <>
      {error && <div>error</div>}
      {isLoading ? <div>loding</div> : <div>{data}</div>}
    </>
  )
}
