import React, { useEffect, useState } from 'react';
import Routes from './components/Routes/'
import '../src/styles/App.css';
import { UidContext } from './components/Routes/AppContext';
import axios from 'axios';


function App() {

  const [uid, setUid] = useState(null);

  useEffect(()=>{
    const fetchToken = async()=>{
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
      .then((res)=>{
        setUid(res.data);
      })
      .catch((err)=> console.log("No token"));
    };
    fetchToken();
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <Routes/>
    </UidContext.Provider>
  );
}

export default App;
