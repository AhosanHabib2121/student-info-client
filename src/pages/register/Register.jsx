import {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../authProviders/AuthProviders";
import Swal from "sweetalert2";

const Register = () => {
  const {createAccount, profileUpdate} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo_url = form.photo_url.value;
    const email = form.email.value;
    const password = form.password.value;

    // create account
    createAccount(email, password)
      .then((data) => {
        // profile update
        profileUpdate(name, photo_url).then(() => {
          const createdAt = data.user?.metadata.creationTime;
          const userData = {
            name,
            photo_url,
            email,
            password,
            createdAt,
          };
          fetch("https://student-info-server-bay.vercel.app/users", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(userData),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
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
                  title: "Account create successfully",
                });
                navigate("/");
              }
            });
        });
      })
      .catch((error) => console.error(error.message));
  };
  return (
    <div className=" min-h-screen bg-base-200">
      <div className="hero-content flex-col pt-12 ">
        <div className="text-center ">
          <h1 className="text-5xl font-bold pb-4">Register</h1>
        </div>

        <div className=" w-full max-w-lg rounded-lg bg-teal-500">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="name"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo Url</span>
              </label>
              <input
                type="text"
                name="photo_url"
                placeholder="photo url"
                className="input input-bordered"
                required
              />
            </div>

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
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary normal-case">Register</button>
            </div>
          </form>
          <div className=" py-5 text-center">
            <p>
              Already have an account?
              <Link to="/login" className=" text-blue-700">
                {" "}
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
