import {useContext} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {AuthContext} from "../../authProviders/AuthProviders";

const Login = () => {
  const {accountLogin} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // create account
    accountLogin(email, password)
      .then((data) => {
        const lastLoginAt = data.user?.metadata?.lastSignInTime;
        const userData = {
          email,
          password,
          lastLoginAt,
        };
        fetch("https://student-info-server-bay.vercel.app/users", {
          method: "PATCH",
          headers: {"content-type": "application/json"},
          body: JSON.stringify(userData),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount) {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", Swal.stopTimer);
                  toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
              });
              Toast.fire({
                icon: "success",
                title: "Login successfully",
              });
              navigate(location?.state ? location?.state : "/");
            }
          });
      })
      .catch((error) => console.error(error.message));
  };
  return (
    <div className=" min-h-screen bg-base-200">
      <div className="hero-content flex-col pt-12 ">
        <div className="text-center ">
          <h1 className="text-5xl font-bold pb-4">Login now!</h1>
        </div>

        <div className=" w-full max-w-lg rounded-lg bg-teal-500">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary normal-case">Login</button>
            </div>
          </form>
          <div className=" py-5 text-center">
            <p>
              Create an account?
              <Link to="/register" className=" text-blue-700">
                {" "}
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
