import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './components/Quiz';
import './App.css';
import { NameContext, NameContextDefaults } from './context/NameContext';

function App() {
  const[nickName, setNickName] =useState(NameContextDefaults)
  const [initialized, setInitialized] = useState(false)
  
  //save name
  useEffect(() => {
    if (localStorage.getItem("nickName") !== null) {     
      setNickName(JSON.parse(localStorage.getItem("nickName")));
    }
    setInitialized(true);
  }, []);
  
  useEffect(() => {
    if (initialized) {
      localStorage.setItem('nickName', JSON.stringify(nickName));
    }
  }, [nickName,initialized]);
  return (
    <NameContext.Provider value={{nickName, setNickName}}>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </div>
    </Router>
    </NameContext.Provider>
  );
 
}

export default App;
