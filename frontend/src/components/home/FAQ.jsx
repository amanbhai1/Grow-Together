import React, { useState } from "react";

const FAQ = () => {
    const [activeCategory, setActiveCategory] = useState("General");
    const [activeIndex, setActiveIndex] = useState(null);

    const categories = {
        General: [
            {
                question: "What is Mentoree?",
                answer: "Mentoree is a platform that connects mentors and mentees from all walks of life.",
            },
            {
                question: "Why did you create Mentoree?",
                answer: "We created Mentoree to bridge the gap between mentors and mentees and foster growth.",
            },
            {
                question: "How can I join Mentoree?",
                answer: "You can join Mentoree by signing up on our platform.",
            },
            {
                question: "Is Mentoree free to use?",
                answer: "Yes, Mentoree is free to use for everyone.",
            },
            {
                question: "What is the purpose of Mentoree?",
                answer: "Mentoree aims to connect mentors and mentees for personal and professional growth.",
            },
            {
                question: "How can I contact Mentoree support?",
                answer: "You can contact support through our 'Contact Us' page.",
            },
            {
                question: "Can I switch between mentor and mentee roles?",
                answer: "Yes, you can switch roles as per your preference.",
            },
            {
                question: "What industries does Mentoree support?",
                answer: "Mentoree supports various industries including technology, finance, education, and more.",
            },
            {
                question: "Is Mentoree available worldwide?",
                answer: "Yes, Mentoree is accessible globally.",
            },
        ],
        "For Mentors": [
            {
                question: "What makes a good mentor?",
                answer: "A good mentor is supportive, experienced, and a great listener.",
            },
            {
                question: "Can mentors set their availability?",
                answer: "Yes, mentors can customize their availability to match their schedules.",
            },
            {
                question: "How do I become a mentor?",
                answer: "You can become a mentor by registering and completing your mentor profile.",
            },
        ],
        "For Mentees": [
            {
                question: "How do I find a mentor?",
                answer: "You can find a mentor by exploring profiles that match your interests and goals.",
            },
            {
                question: "Is there a cost to join?",
                answer: "No, joining the platform is completely free for mentees.",
            },
            {
                question: "What should I look for in a mentor?",
                answer: "Look for a mentor with relevant experience and a willingness to guide.",
            },
            {
                question: "How do I schedule a session with a mentor?",
                answer: "You can schedule sessions through the mentor's availability calendar.",
            },
            {
                question: "Can I have multiple mentors?",
                answer: "Yes, you can connect with multiple mentors based on your needs.",
            },
            {
                question: "What is expected from mentees?",
                answer: "Mentees are expected to be proactive, prepared, and open to learning.",
            },
        ],
    };

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 md:mt-12 mt-0 mb-32 relative">
            {/* Decorative Divs */}
            <div
                className="absolute transform rotate-[55deg] bg-teal-100 rounded-2xl h-24 w-24 md:h-52 md:w-52"
                style={{ top: "10%", left: "-45%" }}
            ></div>
            <div
                className="absolute transform rotate-[55deg] bg-teal-100 rounded-2xl h-24 w-24 md:h-52 md:w-52"
                style={{ top: "70%", right: "-45%" }}
            ></div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-center mb-8">
                Frequently Asked Questions
            </h2>

            {/* Category Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
                {Object.keys(categories).map((category) => (
                    <button
                        key={category}
                        onClick={() => {
                            setActiveCategory(category);
                            setActiveIndex(null); // Reset active question
                        }}
                        className={`px-4 py-2 text-sm sm:text-lg rounded-lg border ${activeCategory === category
                            ? "bg-teal-300 text-white"
                            : "bg-gray-100 text-gray-600"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* FAQs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {categories[activeCategory].map((faq, index) => (
                    <div
                        key={index}
                        className={`border border-gray-200 p-4 rounded-lg shadow-sm ${activeIndex === index ? "border-red-300" : ""}`}
                    >
                        <div
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => toggleAnswer(index)}
                        >
                            <h3 className="font-semibold text-base sm:text-lg">{faq.question}</h3>
                            <button
                                className={`text-xl sm:text-2xl transition-transform ${activeIndex === index ? "rotate-180" : ""}`}
                            >
                                {activeIndex === index ? "-" : "+"}
                            </button>
                        </div>
                        <div
                            className={`overflow-hidden transition-all duration-300 ${activeIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                                }`}
                        >
                            <p className="mt-4 text-gray-600 text-sm sm:text-base">{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;