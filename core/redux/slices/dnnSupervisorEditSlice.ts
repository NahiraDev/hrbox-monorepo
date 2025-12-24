import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DnnSupervisorEditState {
  isEditMode: boolean;
}


const initialState: DnnSupervisorEditState = {
  isEditMode: false,
};

export const dnnSupervisorEditSlice = createSlice({
  name: "dnnSupervisorEdit",
  initialState,
  reducers: {
    setEditMode: (state, action: PayloadAction<boolean>) => {
      state.isEditMode = action.payload;
    },
    toggleEditMode: (state) => {
      state.isEditMode = !state.isEditMode;
    },
  },
});

export const { setEditMode, toggleEditMode } =
  dnnSupervisorEditSlice.actions;

export default dnnSupervisorEditSlice.reducer;
