import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const GetClassDetail = () => {
  const { id } = useParams();
  const [classDetails, setClassDetails] = useState(null);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/class/${id}`).then((res) => {
      setClassDetails(res.data);
    });

    axiosSecure.get(`/enrolled-classes/${id}`).then((res) => {
      setEnrolledStudents(res.data);
    });
  }, [id, axiosSecure]);

  if (!classDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{classDetails.name}</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <img
          src={classDetails.image}
          alt={classDetails.name}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-600 mb-2">
          Instructor: {classDetails.instructorName}
        </p>
        <p className="text-gray-600 mb-2">
          Available Seats: {classDetails.availableSeats}
        </p>
        <p className="text-gray-600 mb-2">Price: ${classDetails.price}</p>
        <p className="text-gray-600">Status: {classDetails.status}</p>
      </div>

      <h2 className="text-2xl font-bold mb-4">Enrolled Students</h2>
      {enrolledStudents.length === 0 ? (
        <p>No students enrolled yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {enrolledStudents.map((student) => (
            <div
              key={student._id}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <h3 className="font-bold text-lg mb-2">{student.name}</h3>
              <p className="text-gray-600">{student.email}</p>
              <p className="text-gray-600">
                Enrolled on:{" "}
                {new Date(student.enrollmentDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetClassDetail;
