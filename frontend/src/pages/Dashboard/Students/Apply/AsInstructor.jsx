import React, { useEffect, useState } from "react";
import useUser from "../../../../hooks/useUser";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import { FaUser, FaEnvelope, FaBookOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AsInstructor = () => {
  const { currentUser } = useUser();
  const [submittedData, setSubmittedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosFetch = useAxiosFetch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.email) {
      axiosFetch
        .get(`/applied-instructors/${currentUser.email}`)
        .then((res) => {
          setSubmittedData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [currentUser?.email, axiosFetch]);

  const onSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const experience = e.target.experience.value;

    const data = { name, email, experience, status: "pending" };

    axiosFetch.post(`/as-instructor`, data).then((res) => {
      setSubmittedData(data);
      alert("Application submitted successfully");
      navigate("/dashboard");
    });
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-2xl w-full mx-auto p-6 bg-white rounded-lg shadow-md items-center">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Apply as <span className="text-secondary">INSTRUCTOR</span>
        </h2>

        {submittedData ? (
          <div className="text-center text-green-600 mb-4">
            You have already submitted an application. It is currently under
            review.
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="flex items-center border-b border-gray-300 py-2">
                <FaUser className="text-gray-400 mr-3" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={currentUser?.name}
                  readOnly
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  placeholder="Name"
                />
              </div>
              <div className="flex items-center border-b border-gray-300 py-2">
                <FaEnvelope className="text-gray-400 mr-3" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={currentUser?.email}
                  readOnly
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  placeholder="Email"
                />
              </div>
              <div className="flex items-center border-b border-gray-300 py-2">
                <FaBookOpen className="text-gray-400 mr-3" />
                <textarea
                  id="experience"
                  name="experience"
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  placeholder="Describe your teaching experience"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-secondary hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AsInstructor;
