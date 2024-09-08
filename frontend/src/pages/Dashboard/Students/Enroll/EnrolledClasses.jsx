import React, { useState, useEffect } from "react";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import useUser from "../../../../hooks/useUser";
import { useNavigate } from "react-router-dom";

const EnrolledClasses = () => {
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const { currentUser } = useUser();
  const axiosFetch = useAxiosFetch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrolledClasses = async () => {
      try {
        const response = await axiosFetch.get(
          `/enrolled-classes/${currentUser.email}`
        );
        setEnrolledClasses(response.data);
      } catch (error) {
        console.error("Error fetching enrolled classes:", error);
      }
    };

    if (currentUser?.email) {
      fetchEnrolledClasses();
    }
  }, [currentUser?.email, axiosFetch]);

  const handleViewClass = (classId) => {
    navigate(`/dashboard/enrolled-class/${classId}`);
  };

  return (
    <div className="container mx-auto my-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">
        My <span className="text-secondary">Enrolled</span> Classes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledClasses.map((enrolledClass, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <img
              src={enrolledClass.classImage}
              alt={enrolledClass.className}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">
                {enrolledClass.className}
              </h3>
              <p className="text-gray-600 mb-1">
                <strong>Instructor:</strong> {enrolledClass.instructorName}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Email:</strong> {enrolledClass.instructorEmail}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Price:</strong> ${enrolledClass.price}
              </p>
              <p className="text-gray-600 mb-3">
                <strong>Enrolled on:</strong>{" "}
                {new Date(enrolledClass.enrollmentDate).toLocaleDateString()}
              </p>

              <button
                onClick={() => handleViewClass(enrolledClass._id)}
                className="w-full bg-secondary hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                View Class Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrolledClasses;
