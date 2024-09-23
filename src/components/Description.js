import { useState, useEffect } from 'react';
import vector from '../assets/description-image.png';
import ScrollReveal from './ScrollReveal';

const Description = () => {
    const [isSmWindow, setIsSmWindow] = useState(false);

    const handleScreen = () => {
        if(window.innerWidth <= 360) {
            setIsSmWindow(true);
        }
        else{
            setIsSmWindow(false);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleScreen);
        return () => window.removeEventListener('resize', handleScreen);
    }, []);

  return (
    <div 
      id='description' 
      className='description h-screen max-w-screen mx-auto flex flex-col md:flex-row items-center justify-center bg-orange-100 py-16 px-6 md:px-12'
    >
        {/* Text Section */}
        <div className="text-box flex flex-col items-center justify-center md:w-1/2 w-full mb-8 md:mb-0 px-4">
          <ScrollReveal>
            <h1 className="text-3xl md:text-4xl text-center md:text-left font-bold mb-4">
              Changing the world through personalized digital experiences.
            </h1>
            <p className="text-base md:text-lg text-center md:text-left leading-relaxed mb-6">
              Founded 40 years ago on the simple idea of creating innovative products that change the world, Adobe offers groundbreaking technology that empowers everyone, everywhere to imagine, create, and bring any digital experience to life.
            </p>
          </ScrollReveal>
        </div>

        {/* Image Section */}
        <div className={`image-box ${isSmWindow ? 'w-3/5' : 'w-full'} md:w-1/2 w-full flex items-center justify-center mx-auto`}>
          <ScrollReveal>
            <img 
              src={vector} 
              alt="About us" 
              className="w-full md:w-3/4 max-w-md object-cover object-center"
            />
          </ScrollReveal>
        </div>
    </div>
  )
}

export default Description;
