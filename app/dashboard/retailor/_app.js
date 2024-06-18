// import '@/styles/globals.css'
import axios from 'axios';
import {createContext, useEffect, useState} from 'react'

export const userContext = createContext();


export default function App({Component, pageProps}) {
  const [user, setUser] = useState([]);
  axios.defaults.withCredentials = true;
  useEffect(()=>{
    isLoggedInUser();
  }, [])

  const isLoggedInUser = async() =>{
    try{
      const response = await axios.get(`http://localhost:8083/verifyretailor/getUserdata `)
      setUser(response.data)
    }catch(error){
      console.log("Error fetching user data", error)
    }
  } 
  return (
    <userContext.Provider value={user}>
      <Component {...pageProps} />
    </userContext.Provider>
  )
}