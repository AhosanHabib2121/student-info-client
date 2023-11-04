import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../authProviders/AuthProviders";

const Home = () => {
    const { user } = useContext(AuthContext)
    
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const student_name = form.student_name.value;
    const student_email = form.student_email.value;
    const gender = form.gender.value;
    const status = form.status.value;
    const userEmail = user?.email;
    const studentInfo = {
      student_name,
      student_email,
      gender,
      status,
      userEmail,
    };

    fetch("https://student-info-server-bay.vercel.app/studentInfo", {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(studentInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Very good",
            text: "Submit completed!",
          });
          form.reset();
        }
      });
  };
  return (
    <div className=" max-w-6xl mx-auto my-8">
      <div className=" min-h-screen bg-base-200">
        <h2 className=" text-center text-4xl font-bold text-teal-600 pt-5">
          Student Form
        </h2>
        <div className="hero-content">
          <div className="card w-full max-w-3xl">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="flex gap-4">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-lg font-semibold text-teal-600">
                      Student Name
                    </span>
                  </label>
                  <input
                    type="text"
                    name="student_name"
                    placeholder="student name"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className=" form-control w-full">
                  <label className="label">
                    <span className="label-text text-lg font-semibold text-teal-600">
                      Student Email
                    </span>
                  </label>
                  <input
                    type="email"
                    name="student_email"
                    placeholder="student email"
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor=""
                  className=" text-lg font-semibold text-teal-600"
                >
                  Gander
                </label>
                <div className=" flex gap-5">
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text mr-2">Male</span>
                      <input
                        type="radio"
                        value="Male"
                        name="gender"
                        className="radio"
                      />
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text mr-2">Female</span>
                      <input
                        type="radio"
                        value="Female"
                        name="gender"
                        className="radio"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor=""
                  className="text-lg font-semibold text-teal-600"
                >
                  Status
                </label>
                <div className=" flex gap-5">
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text mr-2">Active</span>
                      <input
                        type="radio"
                        value="Active"
                        name="status"
                        className="radio"
                      />
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text mr-2">Inactive</span>
                      <input
                        type="radio"
                        value="Inactive"
                        name="status"
                        className="radio"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className=" mt-8 text-right">
                <button className="px-4 py-2 rounded-lg font-semibold hover:bg-teal-700 bg-teal-600 text-white normal-case">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
