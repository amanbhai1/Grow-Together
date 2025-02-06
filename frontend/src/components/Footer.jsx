import React from 'react';
import GrowTogetherLogo from '../assets/growTogetherLogo.png'


function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 py-8 w-5/6 mx-auto ">
            <div className="container mx-auto px-4 md:flex md:justify-between md:items-start gap-32">
                {/* Logo and Description Section */}
                <div className="mb-6 md:mb-0 md:w-1/3">
                    <img className="w-52" src={GrowTogetherLogo} alt="" />
                    <p className="mt-4 text-gray-500">
                        Search amazing individuals around the globe, find a mentor, expand your network, and learn from incredible people!
                    </p>
                </div>

                {/* Links Section */}
                <div className="grid grid-cols-3 gap-6 md:w-2/3">
                    {/* Explore */}
                    <div>
                        <h3 className="text-gray-800 font-bold mb-4">Explore</h3>
                        <ul className="space-y-2 text-gray-500">
                            <li>
                                <a href="#" className="hover:text-gray-800">Search / Browse Mentors</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-800">Mentor Registration</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-800">Mentee Registration</a>
                            </li>
                        </ul>
                    </div>

                    {/* About */}
                    <div>
                        <h3 className="text-gray-800 font-bold mb-4">About</h3>
                        <ul className="space-y-2 text-gray-500">
                            <li>
                                <a href="/aboutus" className="hover:text-gray-800">About us</a>
                            </li>
                            <li>
                                <a href="/feedback" className="hover:text-gray-800">Feedback</a>
                            </li>
                            <li>
                                <a href="/privacy-policy" className="hover:text-gray-800">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="/contactus" className="hover:text-gray-800">Contact Us</a>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-gray-800 font-bold mb-4">Social</h3>
                        <ul className="space-y-2 text-gray-500">
                            <li>
                                <a href="#" className="hover:text-blue-800">LinkedIn</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-pink-500">Instagram</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-green-800">Watsapp</a>

                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-800">FaceBook</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-200 mt-6 pt-6 text-center">
                <p className="text-gray-500 text-sm">
                    Copyright © GrowTogether 2024. All Rights Reserved.
                    <span className="text-blue-500 font-bold">The Code Sneaker's<span className="text-black">™</span></span> Company
                </p>
            </div>
        </footer>

    )
}

export default Footer;
