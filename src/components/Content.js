import React, { useEffect } from 'react';
import Landing from './Landing';
import Description from './Description';
import Form from './Form';
import MapComponent from './MapComponent';
import {Footer} from './Footer';

const Content = () => {
  useEffect(() => {
    let isScrolling = false;
    const handleScroll = (event) => {
      if (isScrolling) return;

      isScrolling = true;
      setTimeout(() => {
        isScrolling = false;
      }, 1000);

      const direction = event.deltaY > 0 ? 'down' : 'up';
      const sections = document.querySelectorAll('.snap-section');
      const currentSectionIndex = Math.round(window.scrollY / window.innerHeight);

      // Only scroll between the first two sections (index 0 and 1)
      if (currentSectionIndex <= 1) {
        if (direction === 'down' && currentSectionIndex < sections.length - 1) {
          sections[currentSectionIndex + 1].scrollIntoView({ behavior: 'smooth' });
        } else if (direction === 'up' && currentSectionIndex > 0) {
          sections[currentSectionIndex - 1].scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, []);

  return (
    <div className="content-container">
      {/* Scroll-snapping container for first two sections */}
      <div className="h-screen snap-y snap-mandatory overflow-y-scroll">
        <div className="h-screen snap-start snap-section">
          <Landing />
        </div>
        
      <div className="h-screen snap-start snap-section">
          <MapComponent />
        </div>
      </div>

      {/* Normal scroll for the rest of the sections */}
      <div className="normal-scroll">
        
        <div className="h-screen">
          <Description />
        </div>
        <div className="h-screen">
          <Form />
        </div>
        <div className="h-auto">
            <Footer></Footer>
        </div>
      </div>
    </div>
  );
};

export default Content;
