import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdOutlineStar } from 'react-icons/md';
import { CiSearch } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

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
    axios
      .post(
        'http://localhost:5000/api/getSearchResult',
        { filter: filter, category: cat },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setResults(res.data.result);
        } else {
          toast.error('Server error');
        }
      })
      .catch((err) => {
        toast.error('Something went wrong!');
      });
  };

  useEffect(() => {
    getSearchResult();
  }, []);

  return (
    <div className="flex justify-start items-center mt-8 w-full h-full">
      <div>
        <Toaster />
      </div>
      <div className="flex flex-col justify-start items-center w-full h-full">
        {/* Search Bar */}
        <div className="flex justify-center items-center w-full h-20">
          <div className="flex bg-white shadow-md pr-4 rounded-3xl w-full md:w-1/2">
            <select
              className="bg-teal-100 px-4 md:px-8 py-3 border-none rounded-l-3xl appearance-none"
              value={cat}
              onChange={(e) => setCat(e.target.value)}
            >
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
            <input
              type="text"
              placeholder="Search for a course"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                getSearchResult(filter);
              }}
              className="bg-transparent pl-5 border-none w-full h-10 text-black outline-none"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                getSearchResult(filter);
              }}
              className="border-0 bg-transparent rounded-full w-10 h-10 text-black"
            >
              <CiSearch className="mr-2 text-2xl" />
            </button>
          </div>
        </div>

        {/* Results Grid */}
        <ul className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 p-0 w-5/6 overflow-y-auto list-none">
          {results.map((item, index) => (
            <div
              className="relative hover:brightness-95 flex flex-col sm:flex-row items-start gap-4 shadow-md hover:shadow-xl hover:shadow-teal-100/50 m-2 mb-2 p-2 border rounded-lg hover:scale-95 transition-transform duration-300"
              key={index}
              onClick={() => handleTile(item.courseId)}
            >
              <img
                src={`/images/${item.category}.jpg`}
                className="rounded-md w-full sm:w-1/2 h-48 sm:h-full object-cover"
                loading="lazy"
                alt={item.courseName}
              />
              <p className="absolute top-2 right-2 flex justify-center items-center border-[rgba(200,109,223,0.633)] bg-red-200 px-4 py-2 border rounded-full text-lg">
                {item.rating}
                <MdOutlineStar className="text-xs" />
              </p>
              <div className="flex items-end p-2 w-full">
                <div className="flex flex-col gap-2">
                  <p className="font-sans font-semibold text-xl sm:text-2xl text-teal-700">
                    {item.courseName}
                  </p>
                  <p className="text-red-300 text-lg sm:text-xl">
                    By {item.courseTutor}
                  </p>
                  <p className="line-clamp-3 text-base sm:text-lg">
                    {item.courseDesc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;