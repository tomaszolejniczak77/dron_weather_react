import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Kp = () => {
  const [kp, setKp] = useState();

  const baseURL =
    "https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json";

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      const currentData = response.data.length - 1;
      const kpData = response.data[currentData][1];
      setKp(kpData);
    });
  }, []);

  return { kp };
};

export default Kp;
