import { configureStore } from "@reduxjs/toolkit";
import memberSlice from "./slices/memberSlice";
import organisationSlice from "./slices/organisationSlice";


export default configureStore({
    reducer: {
        members: memberSlice,
        organisations: organisationSlice,
    },
});