import { configureStore } from "@reduxjs/toolkit";

import ThemeSlice from "./theme/ThemeSlice";
import YoutubeSlice from "./youtube/YoutubeSlice";

export const store = configureStore({
    reducer: {
      youtubeApp: YoutubeSlice.reducer,
      themeApp: ThemeSlice.reducer
    },
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;