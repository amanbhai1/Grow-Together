let Testimonials = () => {
  return (
    <div className="bg-white w-full mx-auto px-4 md:px-8 lg:px-16 xl:px-24 py-12">
      <div className="border w-12 mx-auto mb-8 rounded-tr-3xl rounded-tl-3xl rounded-bl-3xl p-2">
        <img
          className="w-8 h-8 mx-auto"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png"
          alt="Heart Icon"
        />
      </div>
      <h2 className="text-2xl md:text-4xl font-semibold text-center text-gray-800">
        Don't just take our word for it!
      </h2>
      <p className="text-center text-gray-600 mt-4">
        Hear what the community is saying about us
      </p>
      <div className="py-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-2 md:mt-10 justify-center">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-opacity-70 p-6 rounded-xl  max-w-xs mx-auto transition duration-300 ease-in-out shadow-lg w-80 hover:bg-teal-60 hover:text-white"
            style={{ backgroundColor: testimonial.bgColor }}
          >
            <p className="text-lg italic">"{testimonial.quote}"</p>
            <div className="flex items-center mt-4">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div className="ml-4">
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-sm">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const testimonials = [
  {
    quote:
      "I have been very fortunate to mentor amazing people that have worked for me over the years. Many have gone on to become entrepreneurs, leaders, and incredible mentors.",
    name: "Asif",
    role: "Consultant & Investor",
    image:
      "https://i.pinimg.com/736x/8f/99/2a/8f992ad5475a0e783bbf8708e863f08c.jpg",
    bgColor: "#DBEAFE",
    hover:"bg-teal-600"
  },
  {
    quote:
      "As an entrepreneur, I am faced with constant challenges. Having great mentors has taught me valuable lessons, saved me time, and created lifelong friendships.",
    name: "Larry",
    role: "Co-Founder, Mercom",
    image:
      "https://imageio.forbes.com/specials-images/imageserve/5e8b62cfc095010007bffea0/0x0.jpg?format=jpg&crop=4529,4532,x0,y652,safe&height=416&width=416&fit=bounds",
    bgColor: "#FBCFE8",
  },
  {
    quote:
      "Everyone needs a mentor, seriously. What would I have done without one, when growing my business to multi-million dollar level? I've never done that before. Mentors make you feel like you've been there and done that — almost an unspoken requirement when having ultimate faith to achieve.",
    name: "Matt",
    role: "CEO at Product Vessel, Partner at Mentoree",
    image:
      "https://cdn.britannica.com/37/242337-050-0B1577DC/Actor-Matt-Damon-Cannes-France-2021.jpg",
    bgColor: "#DBEAFE",
  },
  {
    quote:
      "Having a relationship with a great mentor has opened up my world to new ideas, inspired me to do more, and has allowed me to collaborate with some of my mentor's peers.",
    name: "Amanda",
    role: "Developer",
    image:
      "https://variety.com/wp-content/uploads/2024/02/amanda.jpg",
    bgColor: "#FEF3C7",
  },
];


export default Testimonials;