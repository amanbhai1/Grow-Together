import React from 'react';
import aman from '../assets/aman.jpg';
import satyam from '../assets/satyam.jpg';
import krish from '../assets/krish.jpeg';
import parth from '../assets/parth.jpg';
import vikash from '../assets/vikash.jpg';

const teamMembers = [
  {
    name: "Aman Gupta",
    role: "Backend Developer",
    description: "Aman is passionate about building scalable and efficient backend systems. He loves solving complex problems and ensuring seamless server-side operations.",
    image: aman,
  },
  {
    name: "Krish Bharadwaj",
    role: "Frontend Developer",
    description: "Krish specializes in creating intuitive and responsive user interfaces. He is dedicated to delivering a seamless user experience.",
    image: krish,
  },
  {
    name: "Vikas Shakya",
    role: "Frontend Developer",
    description: "Vikas is a creative frontend developer with a keen eye for design. He focuses on building visually appealing and user-friendly applications.",
    image: vikash,
  },
  {
    name: "Kushal Sharma",
    role: "Backend Developer",
    description: "Kushal is an expert in database management and API integrations. He ensures that the backend systems are robust and reliable.",
    image: satyam,
  },
  {
    name: "Gaurav Bhardwaj",
    role: "Full Stack Developer",
    description: "Gaurav is a versatile developer who excels in both frontend and backend technologies. He is passionate about building end-to-end solutions.",
    image: parth,
  },
];

const Aboutus = () => {
  return (
    <div>
      {/* Hero Section */}
      <header className="relative w-full h-[400px] bg-gray-800" id="home">
        <div className="absolute inset-0 opacity-70">
          <img
            src="https://media.istockphoto.com/id/1570178815/photo/father-helping-son-with-homework.jpg?s=1024x1024&w=is&k=20&c=cSu1B3lYG-JTaTwGAQ9wiI51VociHDwSqHX75vps2mY="
            alt="Background"
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">Grow Together</h1>
          <p className="text-2xl mb-6 animate-fade-in">One stop solution for flour grinding services</p>
          <a
            href="#contactUs"
            className="px-8 py-4 bg-[#006A4E] text-white font-medium rounded-full hover:bg-[#004d36] transition duration-300 animate-bounce"
          >
            Contact Us
          </a>
        </div>
      </header>

      {/* Our Mission Section */}
      <section className="py-16 bg-gray-50" id="services">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center animate-slide-in">
            Our Mission
          </h2>
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
              <h3 className="text-3xl font-semibold mb-6 text-gray-800">About Us</h3>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Mentor X Student is dedicated to connecting mentors and students to foster growth and learning. Our platform provides a space where experienced professionals can share their knowledge and guide students towards achieving their academic and career goals. We believe in the power of mentorship and the positive impact it can have on a student's life. Our mission is to create meaningful connections that foster growth, learning, and success.
              </p>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                We are committed to providing a seamless experience for both mentors and students. Our platform is designed to be user-friendly, intuitive, and accessible to everyone. Whether you are a student looking for guidance or a mentor willing to share your expertise, Mentor X Student is here to help you achieve your goals.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our team is passionate about education and technology. We are constantly working to improve our platform and add new features to enhance the user experience. Join us on this journey and let's grow together!
              </p>
            </div>
            <div className="w-full md:w-1/2 px-4">
              <h3 className="text-3xl font-semibold mb-6 text-gray-800">Contact Information</h3>
              <p className="text-gray-700 mb-4 text-lg">Phone: +123 456 7890</p>
              <p className="text-gray-700 mb-4 text-lg">Email: support@growtogether.com</p>
              <p className="text-gray-700 mb-4 text-lg">Address: Sale galli, 60 foot road, Latur</p>
              <div className="mt-8">
                <h3 className="text-3xl font-semibold mb-6 text-gray-800">Why Choose Us?</h3>
                <ul className="list-disc list-inside text-gray-700 text-lg">
                  <li className="mb-3">Experienced and dedicated team</li>
                  <li className="mb-3">User-friendly platform</li>
                  <li className="mb-3">Personalized mentorship programs</li>
                  <li className="mb-3">24/7 customer support</li>
                  <li>Affordable pricing plans</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="bg-[#1F2937] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-semibold text-[#FBBF24] tracking-wide uppercase text-3xl sm:text-4xl animate-slide-in">
            Our Team
          </h2>
          <p className="mt-4 text-xl sm:text-2xl leading-7 text-white animate-slide-in">
            Meet the Developers
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-[#374151] shadow-lg rounded-lg p-6 transition transform hover:-translate-y-2 hover:shadow-2xl hover:bg-[#4B5563] hover:cursor-pointer hover:shadow-[0_0_20px_10px_rgba(251,191,36,0.5)] animate-fade-in"
            >
              <img
                className="h-40 w-40 rounded-full mx-auto border-4 border-[#FBBF24] object-cover"
                src={member.image}
                alt={member.name}
              />
              <div className="text-center mt-6">
                <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                <p className="mt-2 text-lg text-[#FBBF24] uppercase tracking-widest">
                  {member.role}
                </p>
                <p className="mt-4 text-sm text-gray-300">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional About Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center animate-slide-in">
            More About Us
          </h2>
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
              <h3 className="text-3xl font-semibold mb-6 text-gray-800">Our Vision</h3>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Our vision is to create a world where every student has access to quality mentorship and resources to achieve their dreams. We aim to bridge the gap between students and mentors by providing a platform that is inclusive, accessible, and effective.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                We believe that mentorship is the key to unlocking a student's potential. By connecting students with experienced professionals, we hope to inspire and empower the next generation of leaders, innovators, and change-makers.
              </p>
            </div>
            <div className="w-full md:w-1/2 px-4">
              <h3 className="text-3xl font-semibold mb-6 text-gray-800">Our Values</h3>
              <ul className="list-disc list-inside text-gray-700 text-lg">
                <li className="mb-3">Integrity: We are committed to honesty and transparency in everything we do.</li>
                <li className="mb-3">Excellence: We strive for excellence in our platform and services.</li>
                <li className="mb-3">Innovation: We are constantly innovating to improve the user experience.</li>
                <li className="mb-3">Community: We believe in the power of community and collaboration.</li>
                <li>Empathy: We care about the needs and aspirations of our users.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Aboutus;