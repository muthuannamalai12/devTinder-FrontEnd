import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../utils/userSlice";
import feedSlice from "../utils/feedSlice";
import connectionSlice from "../utils/connectionSlice";
import requestSlice from "../utils/requestSlice";

const appStore = configureStore({
  reducer: {
    user: userSlice,
    feed: feedSlice,
    connections: connectionSlice,
    requests: requestSlice,
  },
});

export default appStore;
