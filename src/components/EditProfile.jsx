import React, { useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [aboutUs, setAboutUs] = useState(user.aboutUs);
  const [imageUrl, setImageUrl] = useState(user.imageUrl);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age);
  const [errorMessage, setErrorMessage] = useState("");
  const [showToastMessage, setShowToastMessage] = useState(false);
  const handleSaveProfile = async () => {
    //Clear Errors
    setErrorMessage("");
    try {
      const payload = { firstName, lastName, aboutUs, imageUrl, gender, age };
      console.log("Payload being sent:", payload);
      const response = await axios.patch(
        BASE_URL + "profile/edit",
        {
          firstName,
          lastName,
          aboutUs,
          imageUrl,
          gender,
          age,
        },
        { withCredentials: true }
      );
      dispatch(addUser(response?.data?.data));
      setShowToastMessage(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setErrorMessage(err?.response?.data);
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs">
                  <div className="label my-2">
                    <span className="label-text">First Name:</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label my-2">
                    <span className="label-text">Last Name:</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label my-2">
                    <span className="label-text">Image Url:</span>
                  </div>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Provide your image url"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label my-2">
                    <span className="label-text">Age:</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter your age"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label my-2">
                    <span className="label-text">About Us:</span>
                  </div>
                  <textarea
                    className="textarea textarea-primary"
                    placeholder="Provide information about you"
                    value={aboutUs}
                    onChange={(e) => setAboutUs(e.target.value)}
                  ></textarea>
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label my-2">
                    <span className="label-text">Gender :</span>
                  </div>
                  <select
                    value={gender || ""} // If gender is undefined or null, show the default empty value
                    className="select select-primary w-full max-w-xs"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="" disabled>
                      Kindly select gender
                    </option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                    <option value="others">others</option>
                  </select>
                </label>
              </div>
              <p className="text-red-500">{errorMessage}</p>
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={handleSaveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{
            firstName,
            lastName,
            aboutUs,
            gender,
            imageUrl,
            age,
          }}
        />
      </div>
      {showToastMessage && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
