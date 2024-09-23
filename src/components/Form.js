import React, { useEffect, useState } from 'react';
import ScrollReveal from './ScrollReveal';

const Form = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isScrolled, setIsScrolled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Failed to send message.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred.');
    }
  };

  const handleScroll = () => { 
    if (window.scrollY > 1500) { 
      setIsScrolled(true); 
    } 
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id='contact' className={`contact flex justify-around flex-wrap items-center min-h-screen bg-gradient-to-b from-orange-100 to-orange-400 p-8`}>
      
      <div className={`flex flex-col max-w-xl py-10 justify-center items-start ${isScrolled ? 'animate-fadeUp' : 'opacity-0 animate-none'}`}>
        
        <h3 className='text-4xl  font-bold my-3'>About Us</h3>
        <p className='text-lg '>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias tempore rerum eum! Adipisci provident voluptate fugit, blanditiis deleniti nisi veniam fuga tempore dolores numquam id ipsam, neque est ad unde.
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt quas voluptates itaque magni! At ipsa laboriosam, magni quaerat quibusdam eum veritatis? Earum vel facere quisquam officiis dignissimos ipsum, voluptas itaque?
        </p>
      
      </div>


      <form className={`bg-white p-8 py-10 rounded-lg shadow-md max-w-md w-full ${isScrolled ? 'animate-fadeUp' : 'opacity-0 animate-none'} `} onSubmit={handleSubmit}>
        
        <h2 className="text-2xl font-bold mb-4 text-center">Send us a message</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mt-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mt-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mt-2"
            rows="4"
            required
          />
        </div>
        <button type="submit" className="bg-yellow-900 hover:bg-yellow-700 transition-colors text-white p-2 rounded-lg w-full mt-4">
          Submit
        </button>
      
      </form>
    </div>
  );
};

export default Form;
