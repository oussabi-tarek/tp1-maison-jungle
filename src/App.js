import './App.css';
import NavBar from './components/Navbar';
import React from 'react';
import Footer from './components/Footer';
import './styles/Home.css'
import Section from './components/Section';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './components/Register';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={
      <div className='homeContainer'>
      <NavBar loggedIn={loggedIn}/>
      <Section loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <Footer/>
      </div>
    }/>
    <Route path='/register' element={<Register/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
