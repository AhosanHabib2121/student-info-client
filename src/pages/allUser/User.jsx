import { useLoaderData } from "react-router-dom";

const User = () => {
    const user = useLoaderData()
    return (
        <div className=" bg-base-200 max-w-6xl mx-auto p-8 my-8 ">
            <div className="overflow-x-auto">
                <h2 className=" text-center text-2xl font-bold mb-5 text-teal-500">User Data</h2>
                <table className="table">
                    {/* head */}
                    <thead className=" text-base">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>LastSignIn</th>
                        <th>LastSignUp</th>
                    </tr>
                    </thead>
                    <tbody>

                    {/* row  */}
                        {
                            user.map((singleUser, idx) => <tr key={ singleUser._id}>
                                <th>{ idx +1}</th>
                                <td>{singleUser.name}</td>
                                <td>{singleUser.email}</td>
                                <td>{singleUser.lastLoginAt}</td>
                                <td>{singleUser.createdAt}</td>
                            </tr>)
                        }
                    
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default User;