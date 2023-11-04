import { useContext } from "react";
import {Navigate, useLocation} from "react-router-dom";
import {AuthContext } from "../authProviders/AuthProviders";

const PrivateRoutes = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location = useLocation();
    console.log(location);
    
    if (loading) {
        return (
        <>
            <div className=" text-center my-5">
            <progress className="progress w-56"></progress>
            </div>
        </>
        );
    }

    if (user?.email) {
      return children;
    }
    

  

  return (
    <Navigate state={location.pathname} to="/login">
      Login
    </Navigate>
  );
  // return <Navigate state={{from: location}} to='/login'>Login</Navigate>
};

export default PrivateRoutes;
