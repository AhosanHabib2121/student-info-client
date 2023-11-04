import { Link, NavLink, useNavigate} from "react-router-dom";
import './Header.css'
import { useContext } from "react";
import { AuthContext } from "../../authProviders/AuthProviders";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  // sign out here
  const handleSignOut = () => {
    logOut().then(() => { }).catch()
    navigate('/')
  }

    const navlink = (
      <>
        <li>
          <NavLink
            to="/"
            className={({isActive}) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/studentData">Student Data</NavLink>
        </li>
        <li>
          <NavLink to="/user">Users</NavLink>
        </li>
        <div>
          <p className=" text-yellow-200">{user?.displayName}</p>
        </div>
        {user ? (
          <div>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        ) : (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
      </>
    );
    return (
        <div className="bg-teal-600">
            <div className="navbar max-w-6xl mx-auto ">
                <div className="navbar-start ">
                    <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                       {navlink}
                    </ul>
                    </div>
                    <Link to= '/' className=" normal-case text-2xl  text-slate-200 font-bold">Student Info</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu-horizontal px-1 space-x-5 text-lg font-semibold text-slate-200">
                        {navlink}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;