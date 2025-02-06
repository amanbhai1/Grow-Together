const PrivacyPolicy = () => {
    return (
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen py-12">
            <div className="container mx-auto max-w-5xl px-6">
                <div className="bg-white rounded-lg shadow-xl p-8">
                    {/* <!-- Header --> */}
                    <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-10">
                        <span className="text-[#006A4E]">Privacy Policy</span>
                    </h1>

                    {/* <!-- Section: Introduction --> */}
                    <section className="text-lg text-gray-600 mb-8 leading-relaxed">
                        <p className="mb-4">
                            Welcome to <span className="font-semibold text-[#006A4E]">Grow Together</span>! Your privacy is our top priority. This document explains how we collect, use, and protect your information while ensuring transparency and trust.
                        </p>
                        <p>By using our services, you agree to the terms outlined in this Privacy Policy.</p>
                    </section>

                    {/* <!-- Divider --> */}
                    <div className="border-b border-gray-300 my-6"></div>

                    {/* <!-- Section: Information We Collect --> */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <span className="bg-[#006A4E] text-white w-8 h-8 flex justify-center items-center rounded-full mr-3">
                                1
                            </span>
                            Information We Collect
                        </h2>
                        <ul className="list-inside list-disc text-gray-600 pl-4 space-y-2">
                            <li><strong>Account Information:</strong> Name, email address, phone number, profile photo.</li>
                            <li><strong>Content:</strong> Messages, images, videos, or files shared via chat or posts.</li>
                            <li><strong>Automatically Collected Data:</strong> Device information, IP address, usage data.</li>
                            <li><strong>Third-Party Data:</strong> Analytics or payment data from authorized SDKs.</li>
                        </ul>
                    </section>

                    {/* <!-- Section: How We Use Information --> */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <span className="bg-[#006A4E] text-white w-8 h-8 flex justify-center items-center rounded-full mr-3">
                                2
                            </span>
                            How We Use Your Information
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Your data is used to provide and improve our services, personalize your experience, ensure security, and comply with legal obligations.
                        </p>
                    </section>

                    {/* <!-- Section: Data Sharing --> */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <span className="bg-[#006A4E] text-white w-8 h-8 flex justify-center items-center rounded-full mr-3">
                                3
                            </span>
                            Data Sharing
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            We do not share your personal information with third parties except as necessary to provide our services, comply with the law, or protect our rights.
                        </p>
                    </section>

                    {/* <!-- Section: Data Security --> */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <span className="bg-[#006A4E] text-white w-8 h-8 flex justify-center items-center rounded-full mr-3">
                                4
                            </span>
                            Data Security
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            We implement security measures to protect your data from unauthorized access, alteration, disclosure, or destruction.
                        </p>
                    </section>

                    {/* <!-- Section: Changes to This Policy --> */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <span className="bg-[#006A4E] text-white w-8 h-8 flex justify-center items-center rounded-full mr-3">
                                5
                            </span>
                            Changes to This Policy
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on our website.
                        </p>
                    </section>

                    {/* <!-- Section: Contact Us --> */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <span className="bg-[#006A4E] text-white w-8 h-8 flex justify-center items-center rounded-full mr-3">
                                6
                            </span>
                            Contact Us
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            If you have any questions about this Privacy Policy, please contact us at support@mentorxstudent.com.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPolicy;