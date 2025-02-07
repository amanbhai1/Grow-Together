import { NavLink } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";

const HowItWorks = () => {
    const steps = [
        { img: 'https://mentoree.com/public/assets/app/img/registration2.png', title: "1. Create Your Profile", description: "With our registration form that takes time to properly understands each person, we’ll be able to recommend tailored matches for you.", nav: 'Register' },
        { img: 'https://mentoree.com/public/assets/app/img/search2.png', title: "2. Search Mentor", description: "From recommendations, search, or referral, and then book a time to meet.", nav: 'Search' },
        { img: 'https://mentoree.com/public/assets/app/img/connection2.png', title: "3. Make a Connection", description: "With someone who could change your life!", nav: 'See Testimonials' },
    ];

    return (
        <div className="py-12 w-5/5 mt-0 md:mt-12 mx-auto">
            <h2 className="md:text-4xl text-3xl text-center text-gray-800 leading-10 md:leading-0">How <span className="text-teal-400">Grow</span><span className="text-red-300">Together</span> Works</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-6 w-5/6 mx-auto">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="p-6 rounded-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                        style={{
                            animation: `fadeIn 0.5s ease-out ${index * 0.2}s both`,
                        }}
                    >
                        <img
                            src={step.img}
                            alt=""
                            className="mb-4 mx-auto h-52 object-cover opacity-80 hover:opacity-100 transition"
                        />
                        <h3 className="text-2xl font-bold text-teal-600">{step.title}</h3>
                        <p className="text-gray-700 mt-4 font-sans text-md md:text-xl">{step.description}</p>
                        <NavLink to="/mentor">
                            <button className="px-12 mt-8 py-3 bg-gradient-to-r from-teal-500 to-teal-500 text-white rounded-2xl transform transition hover:scale-105 hover:from-teal-600 hover:to-teal-600 shadow-lg hover:shadow-2xl">
                                {step.nav}
                            </button>
                        </NavLink>
                    </div>
                ))}
            </div>

            {/* Custom CSS for animation */}
            <style jsx>{`
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `}</style>
            <div
                className="mt-9 md:mt-12 bg-teal-100 py-12"
                style={{
                    clipPath: "polygon(0 0, 25% 5%, 60% 0, 5% -10%, 100% 0, 100% 100%, 0 100%)",
                    WebkitClipPath: "polygon(0 0, 25% 5%, 60% 0, 5% -10%, 100% 0, 100% 100%, 0 100%)",
                    background: "linear-gradient(to bottom, #e6fffa 0%, transparent 100%)", // Gradient background a teal shade
                }}
            >

                <div className="p-8 grid md:grid-cols-2 gap-12 w-4/5 mx-auto">
                    <div className="p-4">
                        <img className="rounded-2xl border "
                            src="https://img.freepik.com/free-photo/portrait-cute-young-brunette-student-holding-exercise-books-isolated-white-wall_231208-11488.jpg"
                            alt=""
                        />
                        <div className="flex items-center gap-4 text-3xl mt-4 justify-center sm:justify-start">
                            <NavLink to='/mentee'>
                                <button className="relative group md:text-3xl text-2xl mt-4">
                                    Find a Mentor
                                    <span
                                        className="absolute inline-block h-full w-8 ml-2 transform opacity-0 group-hover:translate-x-2 group-hover:opacity-100 transition-all duration-300 ease-in-out"
                                    >
                                        <HiOutlineArrowRight />
                                    </span>
                                </button>
                            </NavLink>
                        </div>

                        <h3 className="text-lg md:text-2xl text-center md:text-left text-gray-400 mt-2">Register Now</h3>
                    </div>
                    <div className="p-4">
                        <img className="rounded-2xl border "
                            src="https://images.squarespace-cdn.com/content/v1/5951cc071b10e3977f15d46a/1640286069536-WXR2TOU68622IIFLA31C/customer-success-skills-coaching-and-mentoring.jpg"
                            alt=""
                        />
                        <div className="flex items-center gap-4 text-3xl mt-4">
                            <NavLink to='/mentor'>
                                <button className="relative group md:text-3xl text-2xl mt-4">
                                    Become a Mentor
                                    <span
                                        className="absolute inline-block h-full w-8 ml-2 transform opacity-0 group-hover:translate-x-2 group-hover:opacity-100 transition-all duration-300 ease-in-out"
                                    >
                                        <HiOutlineArrowRight />
                                    </span>
                                </button>
                            </NavLink>
                        </div>

                        <h3 className="text-gray-400 mt-2 text-lg md:text-2xl text-center md:text-left">Get Started</h3>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default HowItWorks;
