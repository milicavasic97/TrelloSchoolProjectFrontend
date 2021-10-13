import { configureStore } from "@reduxjs/toolkit";
import memberSlice from "./slices/memberSlice";
import organisationSlice from "./slices/organisationSlice";
import boardSlice from "./slices/boardSlice";

export default configureStore({
    reducer: {
        members: memberSlice,
        organisations: organisationSlice,
        boards: boardSlice,
        
    },
    middleware: (getDefaultMiddleware) =>    
    getDefaultMiddleware({      
        serializableCheck: {        
            // Ignore these action types        
            ignoredActions: ['your/action/type'],        
            // Ignore these field paths in all actions        
            ignoredActionPaths: ['meta.arg', 'payload.timestamp'],        
            // Ignore these paths in the state        
            ignoredPaths: ['items.dates'],     
        },    
    }),
});