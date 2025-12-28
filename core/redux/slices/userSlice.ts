import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  isProfileComplete: boolean;
  FirstName: string,
  LastName: string,
  NationalCode: number,
  DateOfBirth: string,
  Gender: number,
  MaritalStatus: number,
  MilitaryServiceStatus: number,
  City: number,
  MinimumSalary: number,
  Address: string,
  OrganizationalCategory: number,
  WorkingCategory: number[],
  Description: string,
  SocialMediaLinks: string,

}

const initialState: { user: User | null } = { user: null };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    updateProfileComplete: (state, action: PayloadAction<boolean>) => {
      if (state.user) state.user.isProfileComplete = action.payload;
    }
  }
});

export const { setUser, updateProfileComplete } = userSlice.actions;
export default userSlice.reducer;