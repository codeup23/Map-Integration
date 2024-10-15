import React, { useEffect, useRef, useState } from 'react';
import background from '../assets/BG-Image.png';
import logo from '../assets/LOGO2.png';
import VanillaTilt from 'vanilla-tilt';
import MapComponent from './MapComponent';

const Landing = () => {
  const mapComponentRef = useRef(null);
  const scrollLinkRef = useRef(null);
  const landingSectionRef = useRef(null);
  const [isInLandingSection, setIsInLandingSection] = useState(true); // Track if user is in the Landing section
  const [lastScrollTop, setLastScrollTop] = useState(0); // Track the scroll direction

  useEffect(() => {
    // Initialize VanillaTilt effect for the logo
    VanillaTilt.init(document.querySelectorAll('#logo'), {
      reverse: true,
      max: 10,
      speed: 400,
      scale: 1.1,
      glare: true,
      'max-glare': 10,
    });
  }, []);

  const handleScroll = () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Detect if the user is scrolling down and is in the landing section
    if (isInLandingSection && currentScrollTop > lastScrollTop && scrollLinkRef.current) {
      scrollLinkRef.current.click(); // Trigger scroll to MapComponent
    }
    setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop); // Update scroll position
  };

  useEffect(() => {
    // IntersectionObserver to track visibility of the landing section
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInLandingSection(entry.isIntersecting); // Update when the landing section is visible
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (landingSectionRef.current) {
      observer.observe(landingSectionRef.current);
    }

    return () => {
      if (landingSectionRef.current) {
        observer.unobserve(landingSectionRef.current); // Clean up observer
      }
    };
  }, []);

  // Use both 'wheel' (for mouse and touchpad) and 'scroll' events for broader compatibility
  useEffect(() => {
    window.addEventListener('wheel', handleScroll); // Listen for mouse scroll (wheel) events
    // window.addEventListener('scroll', handleScroll); // Listen for general scroll events (touchpad, keyboard, etc.)

    return () => {
      window.removeEventListener('wheel', handleScroll); // Clean up wheel event listener
      // window.removeEventListener('scroll', handleScroll); // Clean up scroll event listener
    };

    console.log("Scroll Event");
  }, [isInLandingSection, lastScrollTop]);

  return (
    <div>
      <main className="landing" ref={landingSectionRef}>
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
              className="mx-auto my-6 object-cover object-center w-full xl:w-full max-w-[450px]"
            />
          </div>
        </section>

        {/* Scroll link to MapComponent */}
        <a className="scrollLink" href="#mapComponent" ref={scrollLinkRef}></a>
      </main>

      {/* MapComponent */}
      <MapComponent ref={mapComponentRef} id={"mapComponent"} />
    </div>
  );
};

export default Landing;
