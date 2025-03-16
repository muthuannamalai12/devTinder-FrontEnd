import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  useEffect(() => {
    getFeedData();
  }, []);
  const getFeedData = async () => {
    try {
      const response = await axios.get(BASE_URL + "user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(response?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  if (!feed) return null;

  if (feed.length === 0)
    return <h1 className="flex justify-center my-10">No Users Found !!</h1>;

  return (
    feed && (
      <div className="flex justify-center my-10">
        {feed && <UserCard user={feed[0]} />}
      </div>
    )
  );
};

export default Feed;
