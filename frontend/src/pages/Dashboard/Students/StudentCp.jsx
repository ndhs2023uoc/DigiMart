import React from "react";
import { Link } from "react-router-dom";
import useUser from "../../../hooks/useUser";

const StudentCp = () => {
  const { currentUser } = useUser();

  return (
    <div className="h-screen  flex justify-center items-center p-2">
      <div>
        <div>
          <div>
            <img
              onContextMenu={(e) => e.preventDefault()}
              className="h-[200px]"
              placeholder="blur"
            />
            <h1>
              Hi,{" "}
              <span className="text-secondary items-stretch">
                {currentUser?.name}!{" "}
              </span>
              Welcome to Your DashBoard
            </h1>

            <p className="text-center tex-base py-2">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Recusandae doloremque maxime asperiores quos eum, totam natus,
              odit illo blanditiis deleniti rem? Deleniti optio ea sit
              consectetur nulla ut dolorum labore.
            </p>

            <div className="text-center">
              <h2 className="font-bold">
                You jump any page you want from here .
              </h2>
              <div className="flex items-center justify-center my-4 gap-3 flex-wrap">
                <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1">
                  <Link to="../enrolled-classes">My Enroll</Link>
                </div>

                <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1">
                  <Link to="../my-selected">My Selected</Link>
                </div>

                <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1">
                  <Link to="../my-payment">Payment History</Link>
                </div>

                <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1">
                  <Link to="../apply-instructor">Join as a Instructor</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCp;
