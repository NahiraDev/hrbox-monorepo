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
        setShowGraded: (state, action: PayloadAction<boolean>) => {
            state.showGraded = action.payload;
        },
        setShowNoGrade: (state, action: PayloadAction<boolean>) => {
            state.showNoGrade = action.payload;
        },
        toggleShowGraded: (state) => {
            state.showGraded = !state.showGraded;
        },
        toggleShowNoGrade: (state) => {
            state.showNoGrade = !state.showNoGrade;
        },
        resetJDFilter: () => initialState,
    },
});

export const {
    setShowGraded,
    setShowNoGrade,
    toggleShowGraded,
    toggleShowNoGrade,
    resetJDFilter,
} = jdFilterSlice.actions;

export default jdFilterSlice.reducer;
