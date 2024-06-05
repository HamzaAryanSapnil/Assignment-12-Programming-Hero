import axios from "axios";
import { useEffect, useState } from "react";

const useOurPackages = () => {
  const [ourPackages, setOurPackages] = useState([]);
  useEffect(() => {
      axios.get("ourPackages.json")
          .then((data) => {
              setOurPackages(data.data)
          });
  }, []);

  return [ourPackages];
};

export default useOurPackages;
