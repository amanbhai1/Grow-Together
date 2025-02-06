import React from 'react'

const progressBar = ({key,name,progress}) => {
  return (
    <>
  <button className="group relative">
    <div className='font-semibold text-lg'>
        {name}
    </div>
    <div className="group-hover:blur-2xl absolute -inset-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500 opacity-20 group-hover:opacity-50 blur-xl rounded-xl transition-all duration-500" />
    <div className="relative flex items-center gap-2 border-[#14B8A6] bg-[#14B8A6] p-4 pr-4 border rounded-xl h-28">
      <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-lg h-20">
        <div className="relative">
          <div className="group-hover:blur-md group-hover:bg-teal-500/30 absolute -inset-1 bg-teal-500/20 blur-sm rounded-lg transition-all duration-300" />
          <svg
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            className="relative w-6 h-6 text-teal-500"
          >
            <path
              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="font-bold text-black text-lg">{progress}</span>
            <svg
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              className="w-4 h-4 text-emerald-500 transform transition-transform group-hover:translate-y-[-2px] duration-300"
            >
              <path
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="font-medium text-[10px] text-slate-700">
            Progress
          </span>
        </div>
      </div>
      <div className="flex flex-1 justify-evenly items-center">
        <div className="flex gap-3">
          <div className="flex flex-col items-center gap-1">
            <div className="bg-slate-800 p-[2px] rounded-full w-3 h-8">
              <div className="group-hover:h-6 bg-white rounded-full w-full h-4 transition-all duration-300" />
            </div>
            <span className="font-medium text-[10px] text-black">Course</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="bg-slate-800 p-[2px] rounded-full w-3 h-8">
              <div className="group-hover:h-7 bg-white rounded-full w-full h-6 transition-all duration-300" />
            </div>
            <span className="font-medium text-[10px] text-black">Test</span>
          </div>
        </div>
        {/* <div className="flex items-center gap-1.5">
          <div className="bg-emerald-500 shadow-emerald-500/50 shadow-lg rounded-full w-2 h-2" />
          <span className="font-semibold text-slate-300 text-xs">ONLINE</span>
        </div> */}
      </div>
      <div className="-bottom-px absolute inset-x-0 bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-0 group-hover:opacity-100 h-px transition-opacity duration-500" />
      <div className="-top-px absolute inset-x-0 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 h-px transition-opacity duration-500" />
    </div>
  </button>
</>
  )
}

export default progressBar
