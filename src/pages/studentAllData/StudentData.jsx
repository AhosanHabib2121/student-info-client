import {Link} from "react-router-dom";
import {AiFillDelete} from "react-icons/ai";
import {BiSolidPencil} from "react-icons/bi";
import {useContext, useEffect, useState} from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../axiosSecure/UseAxiosSecure";
import { AuthContext } from "../../authProviders/AuthProviders";
import { useQuery } from "@tanstack/react-query";

const StudentData = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const getStudentData = async () => {
    const res = await axiosSecure.get(`/studentInfo?email=${user?.email}`);
    return res;
  }

  const {data:studentData, isLoading, isError, refetch} = useQuery({
    queryKey: ["studentData"],
    queryFn: getStudentData,
  });
  console.log(studentData?.data);

  if (isLoading) {
    return <p className=" text-red-700 text-center">Loading........</p>
  }
  if (isError) {
    return <p className=" text-red-700 text-center">Something messing here (error)</p>;
  }




  // handleDelete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/studentInfo/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount === 1) {
              Swal.fire(
                "Deleted!",
                "Student information has been deleted.",
                "success"
              );
              refetch()
            }
          });
      }
    });
  };
  return (
    <div className="max-w-4xl mx-auto my-8 bg-base-200">
      <h2 className="text-center text-4xl font-bold text-teal-600 pt-5">
        Total Student : {studentData?.data.length}
      </h2>
      <div className="overflow-x-auto p-12">
        <table className="table">
          {/* head */}
          <thead className=" text-lg">
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Student Email</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {studentData?.data.map((student, idx) => (
              <tr key={student._id}>
                <th>{idx + 1}</th>
                <td>{student.student_name}</td>
                <td>{student.student_email}</td>
                <td>{student.gender}</td>
                <td>{student.status}</td>
                <td>
                  <div className="btn-group  gap-5 lg:btn-group-horizontal">
                    <Link
                      to={`/studentUpdate/${student._id}`}
                      className=" text-blue-500 text-2xl"
                    >
                      <BiSolidPencil />
                    </Link>
                    <button
                      onClick={() => handleDelete(student._id)}
                      className=" text-red-500 text-2xl"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentData;
