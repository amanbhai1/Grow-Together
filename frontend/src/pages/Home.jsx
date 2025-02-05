// import Navbar from "../components/Navbar";
import SearchFilter from "../components/home/SearchFilter";
import Testimonial from "../components/home/Testimonial";
import HowItWorks from "../components/home/HowItWorks";
import FAQ from "../components/home/FAQ";
// import MentorCategory from "../components/home/MentorCategory";
import CategoryCarousel from "../components/home/CategoryCarousel";
import BrowseMentors from "../components/home/BrowseMentor";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <SearchFilter />
      <Testimonial />
      <HowItWorks />
      <FAQ/>
      <CategoryCarousel/>
      <BrowseMentors/>
    </div>
  );
};

export default Home;
