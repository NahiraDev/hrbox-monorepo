import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface JDFilterState {
    showGraded: boolean;
    showNoGrade: boolean;

}

const initialState: JDFilterState = {
    showGraded: true,
    showNoGrade: true,

};

const jdFilterSlice = createSlice({
    name: "jdFilter",
    initialState,
    reducers: {
        toggleShowGraded: (state) => {
            state.showGraded = !state.showGraded;
        },
        toggleShowNoGrade: (state) => {
            state.showNoGrade = !state.showNoGrade;
        }
    },
});

export const {
    toggleShowGraded,
    toggleShowNoGrade,
} = jdFilterSlice.actions;

export default jdFilterSlice.reducer;
