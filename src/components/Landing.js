import React, { useEffect, useRef } from 'react';
import background from '../assets/BG-Image.png';
import logo from '../assets/LOGO2.png';
import VanillaTilt from 'vanilla-tilt';
import MapComponent from './MapComponent';

const Landing = () => {
  const mapComponentRef = useRef(null);

  useEffect(() => {
    // Initialize the VanillaTilt effect
    VanillaTilt.init(document.querySelectorAll('#logo'), {
      reverse: true,
      max: 10,
      speed: 400,
      scale: 1.1,
      glare: true,
      'max-glare': 1,
    });
  }, []);

  // useEffect(() => {
  //   const handleScroll = (event) => {
  //     // Detect if we're scrolling down
  //     const scrollY = window.scrollY;
  //     const landingBottom = landingSectionRef.current.getBoundingClientRect().bottom;

  //     if (scrollY > landingBottom - window.innerHeight && mapComponentRef.current) {
  //       // Scroll smoothly to the MapComponent when scrolling down and exiting the landing section
  //       mapComponentRef.current.scrollIntoView({ behavior: 'smooth' });
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll); // Cleanup the event listener
  //   };
  // }, [mapComponentRef]);

  return (
    <div className="landing" onScroll={() => {
      mapComponentRef.current?.scrollIntoView({
        behaviour : 'smooth'
      })
    }}>
      <main>
        <section
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          className="bg-transparent bg-center h-screen flex items-center justify-center"
        >
          <div className="text-center animate-fadeUp">
            <img
              id="logo"
              src={logo}
              alt="Company Logo"
              className="mx-auto my-6 object-cover object-center w-full xl:w-full max-w-[450px]" // Responsive sizing for the image
            />
          </div>
        </section>
      </main>

      {/* MapComponent to scroll to */}
      <MapComponent ref={mapComponentRef} />
    </div>
  );
};

export default Landing;
