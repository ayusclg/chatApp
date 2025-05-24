import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import Cookies from 'js-cookie';

import RootLayout from './layout/RootLayout.jsx';
import HomePage from './pages/Home.jsx';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/Signin.jsx';

const App = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = Cookies.get('accessToken');  
    console.log(token);
    if (token) {
      const socket = io("http://127.0.0.1:3000");
      setSocket(socket);

      socket.on("newMessage", (data) => {
        console.log("received Message", data);
      });

      socket.emit("authenticate", { token });  
      socket.emit("message", "k xa khabar");

      return () => {
        socket.disconnect();
      };
    }
  }, []);

  return (
    <Router>
      <RootLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </RootLayout>
    </Router>
  );
};

export default App;
