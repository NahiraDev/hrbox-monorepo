import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateProfile, Profile } from "@hrbox/modules/messenger/types";

const ProfileReducer = createSlice({
  name: "user",
  initialState: initialStateProfile,
  reducers: {
    setUserProfile(state, action: PayloadAction<Profile>) {
      state.profile = action.payload;
    }
  }
});

export const { setUserProfile } = ProfileReducer.actions;
export default ProfileReducer.reducer;
