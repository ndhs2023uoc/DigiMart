import React, { useEffect, useState } from "react";
import useUser from "../../../../hooks/useUser";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import { FaUser, FaEnvelope, FaBookOpen } from "react-icons/fa";

const AsInstructor = () => {
  const { currentUser } = useUser();
  const [submittedData, setSubmittedData] = useState({});
  const [loading, setLoading] = useState(true);
  const axiosFetch = useAxiosFetch();

  useEffect(() => {
    axiosFetch
      .get(`/applied-instructors/${currentUser?.email}`)
      .then((res) => {
        setSubmittedData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const experience = e.target.experience.value;

    const data = { name, email, experience };

    axiosFetch.post(`/as-instructor`, data).then((res) => {
      alert("Application submitted successfully");
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Apply as Instructor
      </h2>
      {!submittedData?.map && (
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
      )}
      {submittedData?.map && (
        <div className="text-center text-gray-700">
          <p>Your application has been submitted and is under review.</p>
        </div>
      )}
    </div>
  );
};

export default AsInstructor;
