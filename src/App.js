import React, { useState, useEffect } from 'react';
import Sitebar from './Home/Navbar';
import Auth from './auth/Auth';
import WorkoutIndex from './workouts/WorkoutIndex';

function App() {

  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
  if (localStorage.getItem('token')) {
    setSessionToken(localStorage.getItem('token'));
  }
  }, [])

  const updateToken = (newToken) => {
  localStorage.setItem('token', newToken);
  setSessionToken(newToken);
  console.log(sessionToken);
}
// resetting the state of our sessionToken to an empty string and then clearing our token from local storage
  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  }

  const protectedViews = () => {
    return(
      sessionToken === localStorage.getItem('token') ? <WorkoutIndex token ={sessionToken}/> : <Auth updateToken={updateToken}/>)
  }

  return (
    <div>
     <Sitebar clickLogout={clearToken}/>
     {protectedViews()}
    </div>
  );
}



export default App;
