import React, { useEffect, useRef } from 'react';

const ScrollReveal = ({ children }) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeUp');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref} className="opacity-0 transition-opacity duration-1000 ease-in-out w-full h-full flex flex-col mx-auto items-center justify-center">
      {children}
    </div>
  );
};

export default ScrollReveal;
