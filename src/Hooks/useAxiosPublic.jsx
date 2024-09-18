import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: "https://assignment-12-tourist-guide-server-side.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
