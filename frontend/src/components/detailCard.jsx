import React from 'react'
import { useSelector } from 'react-redux';

const detailCard = ({ fname, lname, rollno, mobile, email }) => {
    const selectedImage = useSelector((state) => state.images.selectedImage);
    return (
        <div className="group relative z-[100] flex flex-col justify-center items-center gap-3 bg-white shadow-xl snap-start rounded-md w-full transition-all duration-300 cursor-pointer overflow-hidden profile-card shrink-0">
            <div className="flex flex-col justify-center items-center gap-1 pt-5 w-full avatar">
                <div className="before:group-hover:size-[1%] after:group-hover:size-[1%] relative after:top-4 before:bottom-4 z-40 before:absolute after:absolute flex justify-center items-center before:bg-[#58b0e0] after:bg-[#58b0e0] w-full before:w-full after:w-full before:h-[6px] after:h-[6px] before:group-hover:transition-all before:transition-all after:group-hover:transition-all after:transition-all before:group-hover:duration-300 before:duration-300 after:group-hover:duration-300 after:duration-300 before:delay-300 before:group-hover:delay-0 after:delay-300 after:group-hover:delay-0 img_container">
                    {/* <svg
                className="z-40 border-4 border-white group-hover:border-8 rounded-full transition-all group-hover:transition-all duration-300 group-hover:duration-300 size-36"
                id="avatar"
                viewBox="0 0 61.8 61.8"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g data-name="Layer 2">
                    <g data-name="—ÎÓÈ 1">
                        <path
                            d="M31.129 8.432c21.281 0 12.987 35.266 0 35.266-12.266 0-21.281-35.266 0-35.266z"
                            fillRule="evenodd"
                            fill="#ffe8be"
                        />
                        <circle fill="#58b0e0" r="30.9" cy="30.9" cx="30.9" />
                        <path
                            d="M45.487 19.987l-29.173.175s1.048 16.148-2.619 21.21h35.701c-.92-1.35-3.353-1.785-3.909-21.385z"
                            fillRule="evenodd"
                            fill="#60350a"
                        />
                        <path
                            d="M18.135 45.599l7.206-3.187 11.55-.3 7.42 3.897-5.357 11.215-7.613 4.088-7.875-4.35-5.331-11.363z"
                            fillRule="evenodd"
                            fill="#d5e1ed"
                        />
                        <path
                            d="M24.744 38.68l12.931.084v8.949l-12.931-.085V38.68z"
                            fillRule="evenodd"
                            fill="#f9dca4"
                        />
                        <path
                            opacity=".11"
                            d="M37.677 38.778v3.58a9.168 9.168 0 0 1-.04 1.226 6.898 6.898 0 0 1-.313 1.327c-4.37 4.165-11.379.78-12.49-6.333z"
                            fillRule="evenodd"
                        />
                        <path
                            d="M52.797 52.701a30.896 30.896 0 0 1-44.08-.293l1.221-3.098 9.103-4.122c3.262 5.98 6.81 11.524 12.317 15.455A45.397 45.397 0 0 0 43.2 45.483l8.144 3.853z"
                            fillRule="evenodd"
                            fill="#434955"
                        />
                        <path
                            d="M19.11 24.183c-2.958 1.29-.442 7.41 1.42 7.383a30.842 30.842 0 01-1.42-7.383zM43.507 24.182c2.96 1.292.443 7.411-1.419 7.384a30.832 30.832 0 001.419-7.384z"
                            fillRule="evenodd"
                            fill="#f9dca4"
                        />
                        <path
                            d="M31.114 8.666c8.722 0 12.377 6.2 12.601 13.367.307 9.81-5.675 21.43-12.6 21.43-6.56 0-12.706-12.018-12.333-21.928.26-6.953 3.814-12.869 12.332-12.869z"
                            fillRule="evenodd"
                            fill="#ffe8be"
                        />
                        <path
                            d="M33.399 24.983a7.536 7.536 0 0 1 5.223-.993h.005c5.154.63 5.234 2.232 4.733 2.601a2.885 2.885 0 0 0-.785 1.022 6.566 6.566 0 0 1-1.052 2.922 5.175 5.175 0 0 1-3.464 2.312c-.168.027-.34.048-.516.058a4.345 4.345 0 0 1-3.65-1.554 8.33 8.33 0 0 1-1.478-2.53v.003s-.797-1.636-2.072-.114a8.446 8.446 0 0 1-1.52 2.64 4.347 4.347 0 0 1-3.651 1.555 5.242 5.242 0 0 1-.516-.058 5.176 5.176 0 0 1-3.464-2.312 6.568 6.568 0 0 1-1.052-2.921 2.75 2.75 0 0 0-.77-1.023c-.5-.37-.425-1.973 4.729-2.603h.002a7.545 7.545 0 0 1 5.24 1.01l-.001-.001.003.002.215.131a3.93 3.93 0 0 0 3.842-.148l-.001.001zm-4.672.638a6.638 6.638 0 0 0-6.157-.253c-1.511.686-1.972 1.17-1.386 3.163a5.617 5.617 0 0 0 .712 1.532 4.204 4.204 0 0 0 3.326 1.995 3.536 3.536 0 0 0 2.966-1.272 7.597 7.597 0 0 0 1.36-2.37c.679-1.78.862-1.863-.82-2.795zm10.947-.45a6.727 6.727 0 0 0-5.886.565c-1.538.911-1.258 1.063-.578 2.79a7.476 7.476 0 0 0 1.316 2.26 3.536 3.536 0 0 0 2.967 1.272 4.228 4.228 0 0 0 .43-.048 4.34 4.34 0 0 0 2.896-1.947 5.593 5.593 0 0 0 .684-1.44c.702-2.25.076-2.751-1.828-3.451z"
                            fillRule="evenodd"
                            fill="#464449"
                        />
                        <path
                            d="M17.89 25.608c0-.638.984-.886 1.598 2.943a22.164 22.164 0 0 0 .956-4.813c1.162.225 2.278 2.848 1.927 5.148 3.166-.777 11.303-5.687 13.949-12.324 6.772 3.901 6.735 12.094 6.735 12.094s.358-1.9.558-3.516c.066-.538.293-.733.798-.213C48.073 17.343 42.3 5.75 31.297 5.57c-15.108-.246-17.03 16.114-13.406 20.039z"
                            fillRule="evenodd"
                            fill="#8a5c42"
                        />
                        <path
                            d="M24.765 42.431a14.125 14.125 0 0 0 6.463 5.236l-4.208 6.144-5.917-9.78z"
                            fillRule="evenodd"
                            fill="#fff"
                        />
                        <path
                            d="M37.682 42.431a14.126 14.126 0 0 1-6.463 5.236l4.209 6.144 5.953-9.668z"
                            fillRule="evenodd"
                            fill="#fff"
                        />
                        <circle fill="#434955" r=".839" cy="52.562" cx="31.223" />
                        <circle fill="#434955" r=".839" cy="56.291" cx="31.223" />
                        <path
                            d="M41.997 24.737c1.784.712 1.719 1.581 1.367 1.841a2.886 2.886 0 0 0-.785 1.022 6.618 6.618 0 0 1-.582 2.086v-4.949zm-21.469 4.479a6.619 6.619 0 0 1-.384-1.615 2.748 2.748 0 0 0-.77-1.023c-.337-.249-.413-1.06 1.154-1.754z"
                            fillRule="evenodd"
                            fill="#464449"
                        />
                    </g>
                </g>
            </svg> */}
                    <div className="z-40 border-4 border-white group-hover:border-8 rounded-full transition-all group-hover:transition-all duration-300 group-hover:duration-300 size-36">
                        <img src={selectedImage} alt="Profile" className="border-4 hover:border-8 bg-white rounded-full w-36 h-36 transition-all duration-300" />
                    </div>
                    <div className="group-hover:size-[1%] z-10 absolute bg-[#58b0e0] w-full transition-all group-hover:transition-all duration-300 group-hover:duration-300 delay-700 group-hover:delay-0 size-[60%]" />
                </div>
            </div>
            <div className="relative w-full *:text-center *:leading-4 headings">
                <p className="font-semibold font-serif text-[#434955] text-3xl">
                    {fname} {lname}
                </p>
                <p className="left-4 absolute font-semibold text-[#434955] text-md">🎓 Roll Number: {rollno}</p>
            </div>
            <div className="flex justify-left items-center pt-3 pl-5 w-full">
                <ul className="*:inline-flex flex flex-col *:justify-center items-start *:items-center gap-2 *:gap-2 pb-3 *:border-b-[1.5px] *:border-b-stone-700 has-[:last]:border-b-0 *:border-dotted *:font-semibold *:text-[#434955] *:text-md">
                    <li>
                        <svg
                            id="phone"
                            viewBox="0 0 24 24"
                            className="group-hover:fill-[#58b0e0] fill-stone-700"
                            height={15}
                            width={15}
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M19.23 15.26l-2.54-.29c-.61-.07-1.21.14-1.64.57l-1.84 1.84c-2.83-1.44-5.15-3.75-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52c-.12-1.01-.97-1.77-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z" />
                        </svg>
                        <p className='text-md'>Mobile Number: {mobile}</p>
                    </li>
                    <li>
                        <svg
                            className="group-hover:fill-[#58b0e0] fill-stone-700"
                            height={15}
                            width={15}
                            id="mail"
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16,14.81,28.78,6.6A3,3,0,0,0,27,6H5a3,3,0,0,0-1.78.6Z"
                                fill="#231f20"
                            />
                            <path
                                d="M16.54,16.84h0l-.17.08-.08,0A1,1,0,0,1,16,17h0a1,1,0,0,1-.25,0l-.08,0-.17-.08h0L2.1,8.26A3,3,0,0,0,2,9V23a3,3,0,0,0,3,3H27a3,3,0,0,0,3-3V9a3,3,0,0,0-.1-.74Z"
                                fill="#231f20"
                            />
                        </svg>
                        <p>{email}</p>
                    </li>
                </ul>
            </div>
            <hr className="group-hover:h-5 bg-[#58b0e0] w-full h-3 transition-all group-hover:transition-all duration-300 group-hover:duration-300" />
        </div>
    )
}

export default detailCard
