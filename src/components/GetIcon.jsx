import { useState, useEffect } from "react";
import axios from "axios";

const GetIcon = () => {
  const [iconInfo, setIconInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const baseURL = "https://www.weatherapi.com/docs/conditions.json";

  useEffect(() => {
    setIsLoading(true);
    const fetchIcon = async () => {
      try {
        const response = await axios.get(baseURL);
        setIconInfo(response.data);
      } catch (error) {
        console.error("Error fetching weather code :", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchIcon();
  }, []);

  return { iconInfo, isLoading };
};

export default GetIcon;
