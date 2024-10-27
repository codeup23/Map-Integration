import React, { useEffect, useRef, useState } from 'react';
import background from '../assets/bg-image1.jpg';
import logo from '../assets/LOGO2.png';
import VanillaTilt from 'vanilla-tilt';
import MapComponent from './MapComponent';

const Landing = () => {
  const mapComponentRef = useRef(null);
  const scrollLinkRef = useRef(null);
  const landingSectionRef = useRef(null);
  const [isInLandingSection, setIsInLandingSection] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [zIndex, setZIndex] = useState(1); // Initially set to positive z-index
  const [opacity, setOpacity] = useState(1); // Opacity for smooth transition

  useEffect(() => {
    VanillaTilt.init(document.querySelectorAll('#logo'), {
      reverse: true,
      max: 10,
      speed: 400,
      scale: 1.1,
      glare: true,
      'max-glare': 10,
    });
  }, []);

  // useEffect(() => {
  //   window.addEventListener('wheel', handleScroll);

  //   return () => {
  //     window.removeEventListener('wheel', handleScroll);
  //   };
  // }, [isInLandingSection, lastScrollTop]);

  return (
    <div>
      <main 
        className="landing" 
        ref={landingSectionRef}
      >

        <section
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          className="bg-transparent bg-center h-screen flex flex-col md:flex-row items-center justify-around px-10 md:px-20 space-y-1 md:space-y-0 pb-10"
        >
          {/* Right Side: Logo with Conditional Shrinking */}
          <div className="animate-fadeUp">
            <img
              id="logo"
              src={logo}
              alt="Company Logo"
              className="object-contain object-center w-full max-w-[300px] md:max-w-[450px] lg:max-w-[550px] overflow-hidden"
              style={{
                maxHeight: '350px',
              }}
            />
          </div>
        </section>
      </main>

      </div>
  );
};

export default Landing;
