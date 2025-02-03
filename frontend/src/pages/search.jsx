import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdOutlineStar } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
// Dropdown banaya tha library se ui theek nhi hai
// import { Listbox } from "@headlessui/react";
// import { ChevronDown } from "lucide-react";

// const options = [
// "All",
// "Engineering",
// "Programming",
// "Maths",
// "Science",
// "Sports",
// "Music",
// "Art",
// "Busisness",
// "Cooking",
// "Crafting",
// "Fashion",
// "Fitness",
// "Gaming",
// "Language",
// "Literature",
// "Technology",
// "Soft Skills",
// "Photograpy",
// "Hobbies"];

const Search = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState('');
  const [cat, setCat] = useState('All');
  const user = useSelector((state) => state.user.user);

  function handleTile(item) {
    navigate(`/course/${item}`);
  }

  const getSearchResult = async (filter) => {
    axios.post('http://localhost:5000/api/getSearchResult', { filter: filter, category: cat }, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
      .then(res => {
        if (res.status === 200) {
          setResults(res.data.result);
        } else {
          toast.error('Server error');
        }
      })
      .catch(err => {
        toast.error('Something went wrong!');
      });
  };

  useEffect(() => {
    getSearchResult();
  }, []);

  return (
    <div className="flex justify-start items-center mt-8 w-full h-full">
      <div><Toaster /></div>
      <div className="flex flex-col justify-start items-center w-full h-full">
        <div className="flex justify-center items-center w-full h-20">
          <div className="flex bg-white shadow-md pr-4 rounded-l-3xl rounded-r-3xl w-1/2">
            <select className="bg-teal-100 px-8 py-3 border-none rounded-l-3xl appearance-none-none" value={cat} onChange={(e) => setCat(e.target.value)}>
              <option value="All">All Category</option>
              <option value="Engineering">Engineering</option>
              <option value="Programming">Programming</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="Sports">Sports</option>
              <option value="Music">Music</option>
              <option value="Art">Art</option>
              <option value="Business">Business</option>
              <option value="Cooking">Cooking</option>
              <option value="Crafts">Crafts</option>
              <option value="Fashion">Fashion</option>
              <option value="Fitness">Fitness</option>
              <option value="Gaming">Gaming</option>
              <option value="Language">Language</option>
              <option value="Literature">Literature</option>
              <option value="Technology">Technology</option>
              <option value="Soft skills">Soft skills</option>
              <option value="Photography">Photography</option>
              <option value="Hobbies">Hobbies</option>
            </select>
            {/* <Listbox value={cat} onChange={(e) => setCat(e.target.value)}>
              <div className="relative w-60">
                <Listbox.Button className="flex justify-between items-center bg-[#40ccc0] px-5 py-3 border-none rounded-l-3xl w-full">
                  {cat}
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </Listbox.Button>

                <Listbox.Options className="absolute border-gray-300 bg-[#40ccc0] shadow-lg backdrop-blur-sm mt-1 border rounded-lg w-full overflow-hidden">
                  {options.map((option, index) => (
                    <Listbox.Option key={index} value={option} className="hover:bg-gray-100 p-3 cursor-pointer">
                      {option}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox> */}
            <input
              type="text"
              placeholder="Search for a course"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-transparent pl-5 border-none w-full h-10 text-black outline-none"
            />
            <button
              onClick={(e) => { e.preventDefault(); getSearchResult(filter); }}
              className="border-0 bg-transparent rounded-full w-10 h-10 text-black">
              <CiSearch className="mr-2 text-2xl" />
            </button>
          </div>
        </div>
        <ul className="gap-1 grid grid-cols-3 mt-4 p-0 w-5/6 overflow-y-auto list-none">
          {results.map((item, index) => (
            <div
              className="relative hover:brightness-95 flex flex-row items-start gap-4 shadow-md hover:shadow-xl hover:shadow-teal-100/50 m-2 mb-2 p-2 border rounded-lg hover:scale-95 transition-transform duration-300"
              key={index}
              onClick={() => handleTile(item.courseId)}
            >
              <img
                src={`/images/${item.category}.jpg`}
                className="rounded-md w-1/2 h-full object-cover"
                loading="lazy"
              />
              <p className="bottom-2 left-2 absolute flex justify-center items-center border-[rgba(200,109,223,0.633)] bg-red-200 px-4 py-2 border rounded-full text-lg">
                {item.rating}<MdOutlineStar className="text-xs" />
              </p>
              <div className="flex items-end p-2 w-full">
                <div className="flex flex-col gap-2">
                  <p className="font-sans font-semibold text-2xl text-teal-700">{item.courseName}</p>
                  <p className="text-red-300 text-xl">By {item.courseTutor}</p>
                  <p className="line-clamp-5 text-lg">{item.courseDesc}</p>
                </div>
              </div>
            </div>
          ))}

        </ul>
      </div>
    </div>
  );
}

export default Search;
