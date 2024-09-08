import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";

const EnrolledClass = () => {
  const { classId } = useParams();
  const [classDetails, setClassDetails] = useState(null);
  const axiosFetch = useAxiosFetch();

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await axiosFetch.get(`/enrolled-class/${classId}`);
        console.log("response", response.data);
        if (response.data) {
          setClassDetails(response.data);
        } else {
          console.error("No data received from the server");
        }
      } catch (error) {
        console.error("Error fetching class details:", error);
      }
    };

    fetchClassDetails();
  }, [classId, axiosFetch]);

  if (!classDetails) {
    return <div className="text-center mt-8">Loading...</div>;
  }
  return (
    <div className="container mx-auto my-8 px-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={classDetails.classImage}
          alt={classDetails.className}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4">{classDetails.className}</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Instructor</h3>
              <p className="mb-1">
                <span className="font-medium">
                  {classDetails.instructorName}
                </span>
              </p>
              <p className="mb-3 text-sm text-gray-600">
                {classDetails.instructorEmail}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Course Description</h3>
              <p className="text-gray-700 whitespace-pre-wrap">
                {classDetails.course_description}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Course Resources</h3>

            <span className="text-gray-500 text-decoration-line">
              <a href={classDetails.resourses}>Resource</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EnrolledClass;
