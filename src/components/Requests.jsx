import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchRequests();
  }, []);
  const fetchRequests = async () => {
    try {
      const response = await axios.get(BASE_URL + "user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(response?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  const reviewRequest = async (status, id) => {
    try {
      const response = await axios.post(
        BASE_URL + "request/review/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));
    } catch (err) {
      console.log(err);
    }
  };

  if (!requests) return null;

  if (requests.length === 0)
    return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connection Requests</h1>
      {requests.map((request) => {
        const { _id, aboutUs, firstName, imageUrl, lastName, age, gender } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className=" flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img src={imageUrl} className="w-20 h-20 rounded-full"></img>
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + " " + gender}</p>}
              <p>{aboutUs}</p>
            </div>
            <div>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
