import React from 'react';

function BrowseMentors() {
    return (
        <div className="mt-12 mb-24 min-h-[400px] w-[90%] sm:w-4/5 mx-auto rounded-2xl relative">
            <img
                className="absolute w-full h-full rounded-2xl object-cover opacity-50"
                src="https://wallpapers.com/images/hd/light-teal-background-jghnusake73k9gxm.jpg"
                alt="Background"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                {/* Mentor Images */}
                <img
                    className="absolute top-6 left-4 w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full object-cover"
                    src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="
                    alt=""
                />
                <img
                    className="absolute top-36 left-20 sm:top-40 sm:left-36 md:top-52 md:left-72 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover"
                    src="https://www.profilebakery.com/wp-content/uploads/2024/05/Profile-picture-created-with-ai.jpeg"
                    alt=""
                />
                <img
                    className="absolute top-20 right-16 sm:top-24 sm:right-20 md:top-24 md:right-24 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover"
                    src="https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.jpg?b=1&s=612x612&w=0&k=20&c=MsKXmwf7TDRdKRn_lHohhmD5rvVvnGs9ry0xl6CrMT4="
                    alt=""
                />
                {/* Dots */}
                <div className="absolute top-32 left-40 sm:left-52 w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-slate-200"></div>
                <div className="absolute top-16 left-24 sm:top-20 sm:left-36 md:left-48 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-200"></div>
                <div className="absolute top-56 right-12 sm:top-60 sm:right-20 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-red-200"></div>
                <div className="absolute top-72 left-20 sm:top-80 sm:left-32 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-200"></div>
                <div className="absolute top-8 right-8 sm:top-10 sm:right-10 w-4 h-4 rounded-full bg-yellow-200"></div>
                {/* Text and Button */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl max-w-lg md:max-w-3xl z-10">
                    Seeking 4000+ <span className="font-bold">mentors</span> from 60+ countries
                </h1>
                <p className="mt-4 text-gray-500 text-sm sm:text-base md:text-lg max-w-md md:max-w-2xl z-10">
                    to help you achieve and overcome any challenges you face.
                </p>
                <button className="mt-8 py-2 sm:py-3 md:py-4 bg-teal-400 px-6 sm:px-8 md:px-10 text-white font-semibold rounded-2xl hover:shadow-lg transition-all z-10">
                    Browse All Mentors
                </button>
            </div>
        </div>
    );
}

export default BrowseMentors;