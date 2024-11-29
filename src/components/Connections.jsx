import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchConnections();
  }, []);
  const fetchConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + "user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(response?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  if (!connections) return null;

  if (connections.length === 0) return <h1>No Connections Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>
      {connections.map((connection) => {
        const { _id, aboutUs, firstName, imageUrl, lastName, age, gender } =
          connection;
        return (
          <div
            key={_id}
            className=" flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                src={imageUrl}
                className="w-20 h-20 rounded-full object-cover"
              ></img>
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + " " + gender}</p>}
              <p>{aboutUs}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
