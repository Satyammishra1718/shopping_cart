import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {useTypewriter,Cursor} from 'react-simple-typewriter'

function Home() {

    const [text] = useTypewriter({
        words : ['Shopping Express!'],
        loop:{}
    })


  return (
    <>
      <Navbar showSearch={false} />
      <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f5f5f5', minHeight: '80vh' }}>
        <h1 style={{ color: '#3498db' }}>Welcome to <span style={{fontWeight:'bold'}}>{text}</span><Cursor/></h1>
        <p style={{ fontSize: '1.2rem', margin: '20px 0', color: '#555' }}>
          Your destination for the latest trends and amazing deals.
        </p>
        <p style={{ fontSize: '1.2rem', margin: '20px 0', color: '#555' }}>
          Discover a world of fashion and style at your fingertips.
        </p>
        <p style={{ fontSize: '1.2rem', margin: '20px 0', color: '#555' }}>
          Shop with confidence, shop with Shopping Express!
        </p>
      </div>
      <Footer />
    </>
  );
}

export default Home;
