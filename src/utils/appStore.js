import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../utils/userSlice";
import feedSlice from "../utils/feedSlice";
import Feed from "../components/Feed";

const appStore = configureStore({
  reducer: {
    user: userSlice,
    feed: feedSlice,
  },
});

export default appStore;
