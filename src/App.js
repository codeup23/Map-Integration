// App.js
import React, { useRef } from 'react';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Description from './components/Description';
import Form from './components/Form';
import './App.css';
import MapComponent from './components/MapComponent';
import { Footer } from './components/Footer';

function App() {

  const mapComponentRef = useRef(null);

  useEffect(() => {
    // Scroll to the top on component mount (initial render)
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="App h-screen">
      
      <Navbar />

      <Landing/>

      <Description/>

      <Form/>
      
      <Footer/>
    </div>
  );
}

export default App;