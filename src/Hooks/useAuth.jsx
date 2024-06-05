import { useContext,  } from "react";
import { AuthContext } from "../Auth_Provider/AuthProvider";

const useAuth = () => {
   const all = useContext(AuthContext);
   return all;
};

export default useAuth;
