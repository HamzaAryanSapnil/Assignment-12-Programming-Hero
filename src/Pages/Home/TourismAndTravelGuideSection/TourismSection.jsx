import { useState } from "react";
import { Link } from "react-router-dom";
import useOurPackages from "../../../Hooks/useOurPackages";
import OurPackagesCards from "../../../Components/OurPackagesCards/OurPackagesCards";

const TourismSection = () => {
  const [ourPackages, loading, refetch] = useOurPackages();
  // i need to write tabs function
  const [toggleTabs, setToggleTabs] = useState(1);
  const handleToggleTabs = (index) => {
    setToggleTabs(index);
  };
  return loading ? (
    <div className="flex justify-center items-center min-h-screen">
      {" "}
      <span className="loading loading-spinner loading-lg"></span>{" "}
    </div>
  ) : (
    <div className="my-20">
      <div
        role="tablist"
        className="tabs tabs-lg"
      >
        <Link
          onClick={() => handleToggleTabs(1)}
          role="tab"
          className={toggleTabs === 1 ? "tab tab-active   border-b-4" : "tab"}
          style={{
            borderBottom: toggleTabs === 1 && "4px solid rgb(249 115 22)",
          }}
        >
          Tab 1
        </Link>
        <Link
          onClick={() => handleToggleTabs(2)}
          role="tab"
          className={toggleTabs === 2 ? "tab tab-active border-b-4 " : "tab"}
          style={{
            borderBottom: toggleTabs === 2 && "4px solid rgb(249 115 22)",
          }}
        >
          Tab 2
        </Link>
        <Link
          onClick={() => handleToggleTabs(3)}
          role="tab"
          className={toggleTabs === 3 ? "tab tab-active border-b-4 " : "tab"}
          style={{
            borderBottom: toggleTabs === 3 && "4px solid rgb(249 115 22)",
          }}
        >
          Tab 3
        </Link>
      </div>
      {/* i need to write the content for these tabs */}
      <h1 className={toggleTabs === 1 ? "" : "tab-content"}>hello 1st tab</h1>
      <div className={toggleTabs === 2 ? "" : "tab-content"}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 my-10 container mx-auto justify-center items-center justify-items-center">
          {ourPackages.map((item, index) => (
            <OurPackagesCards
              key={index}
              item={item}
            ></OurPackagesCards>
          ))}
        </div>
      </div>
      <h1 className={toggleTabs === 3 ? "" : "tab-content"}>hello 3rd tab</h1>
    </div>
  );
};

export default TourismSection;
