import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, aboutUs, firstName, imageUrl, lastName, age, gender } = user;
  const handleButtonClick = async (status, userId) => {
    try {
      const response = await axios.post(
        BASE_URL + "request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(_id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={imageUrl} alt="user-profile-image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " " + gender}</p>}
        <p>{aboutUs}</p>
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => handleButtonClick("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleButtonClick("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
