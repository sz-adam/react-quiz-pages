import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NameContext } from '../context/NameContext';
import '../styles/Home.css'


export default function Home() {
    const { setNickName}=useContext(NameContext)

    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();
  
  
    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };
  
  
    const handleButtonClick = () => {
  
      if (inputValue !== '') {
        setNickName(inputValue );
        navigate('/quiz');
      }
    };
  
    return (
      <div className='home-container'>
        <h1>Welcome, this is a quiz app</h1>
        <div className='container'>
        <input type="text" value={inputValue} onChange={handleInputChange} placeholder='Your nickname' />
        <button className='home-buttton' onClick={handleButtonClick}>Start Quiz
        </button>
        </div>
  
      </div>
    );
  }
  