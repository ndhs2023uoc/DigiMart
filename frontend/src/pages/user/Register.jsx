import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineLock,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlinePicture,
  AiOutlineUser,
} from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "../../components/Social/GoogleLogin";
import { AuthContext } from "../../utilities/providors/AuthProvider";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const { signUp, updateUser, setError } = useContext(AuthContext);
  const [registerError, setRegisterError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  const onSubmit = async (data) => {
    setRegisterError("");
    try {
      const response = await axios.get(
        `http://localhost:3000/check-user/${data.email}`
      );
      if (response.status === 200) {
        setRegisterError("Email already exists. Please use a different email.");
        return;
      }
    } catch (error) {
      if (error.response && error.response.status !== 404) {
        setRegisterError("An error occurred. Please try again.");
        return;
      }
    }

    signUp(data.email, data.password).then((result) => {
      const user = result.user;
      if (user) {
        updateUser(data.name, data.photoUrl)
          .then(() => {
            const userImp = {
              name: user?.displayName,
              email: user?.email,
              photoURL: user?.photoURL,
              role: "user",
              gender: data.gender,
              phone: data.phoneNumber,
              address: data.address,
            };

            if (user.email && user.displayName) {
              axios
                .post("http://localhost:3000/new-user", userImp)
                .then(() => {
                  setError("");
                  navigate("/");
                })
                .catch((err) => {
                  setRegisterError(
                    "An error occurred during registration. Please try again."
                  );
                });
            }
          })
          .catch((err) => {
            setRegisterError(err.message);
          });
      }
    });
  };

  return (
    <div className="flex justify-center items-center pt-14 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6">Please Register</h2>
        {registerError && (
          <p className="text-red-500 text-center mb-4">{registerError}</p>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-5">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                <AiOutlineUser className="inline-block mr-2 mb-1 texl-lg" />
                Name
              </label>
              <input
                type="text"
                placeholder="Enter Your Name"
                {...register("name", { required: true })}
                className="w-full border-gray-300 border rounded-mb py-2 px-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                <AiOutlineMail className="inline-block mr-2 mb-1 texl-lg" />
                Email
              </label>
              <input
                type="text"
                placeholder="Enter Your Email"
                {...register("email", { required: true })}
                className="w-full border-gray-300 border rounded-mb py-2 px-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                <AiOutlineLock className="inline-block mr-2 mb-1 texl-lg" />
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                {...register("password", { required: true })}
                className="w-full border-gray-300 border rounded-mb py-2 px-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-bold mb-2"
              >
                <AiOutlineLock className="inline-block mr-2 mb-1 texl-lg" />
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === password || "Password does not match",
                })}
                className="w-full border-gray-300 border rounded-mb py-2 px-2 focus:outline-none focus:ring focus:border-blue-300"
              />
              {errors.confirmPassword && (
                <div className="text-red-500 text-sm w-full mt-1">
                  <p>{errors.confirmPassword.message}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-gray-700 font-bold mb-2"
              >
                <AiOutlinePhone className="inline-block mr-2 mb-1 texl-lg" />
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Phone Number"
                {...register("phone", { required: true })}
                className="w-full border-gray-300 border rounded-mb py-2 px-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="photoUrl"
                className="block text-gray-700 font-bold mb-2"
              >
                <AiOutlinePicture className="inline-block mr-2 mb-1 texl-lg" />
                Photo URL
              </label>
              <input
                type="text"
                placeholder="Photo URL"
                {...register("photoUrl")}
                className="w-full border-gray-300 border rounded-mb py-2 px-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>

          <div>
            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block text-gray-700 font-bold mb-2"
              >
                <AiOutlineUser className="inline-block mr-2 mb-1 texl-lg" />
                Gender
              </label>

              <select
                {...register("gender", { required: true })}
                className="w-full border border-gray rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-gray-700 font-bold mb-2"
              >
                <HiOutlineLocationMarker className="inline-block mr-2 mb-1 texl-lg" />
                Address
              </label>
              <textarea
                {...register("address", { required: true })}
                rows="3"
                placeholder="Enter Address"
                className="w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
              ></textarea>
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-secondary hover:bg-red-500 text-white py-2 px-4 rounded-md"
            >
              Register
            </button>
          </div>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="underline text-secondary">
            Login
          </Link>
        </p>
        <div>
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
