import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import memberService from "../../services/member.service";

export const login = createAsyncThunk("login", ({username, password}) => 
    memberService.login(username, password)
);

export const authState = createAsyncThunk("authState", () =>
    memberService.state()
);

const logoutAction = (state, action) => {
    memberService.logout();
    state.authenticated = false;
    state.loading = false;
    state.members = [];
    state.member = null;
}

const onSuccessAuth = (state, action) => {
    state.authenticated = true;
    state.authenticationFailed = false;
    state.loading = false;
    state.role = action.payload.role;
    state.member = action.payload;
};

const memberSlice = createSlice({
    name: "members",
    initialState: {
        authenticated: false,
        authenticationFailed: false,
        loading: true,
        member: null,
        role: null,
        members: [],
    },
    reducers: {
        logout: logoutAction,
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.loading = true;
        },
        [login.rejected]: (state, action) => {
            state.authenticationFailed = true;
            state.loading = false;
        },
        [login.fulfilled]: onSuccessAuth,
        [authState.pending]: (state, action) => {
            state.loading = true;
        },
        [authState.rejected]: (state, action) => {
            state.loading = false;
        },
        [authState.fulfilled]: onSuccessAuth,

    },

});

export const { logout } = memberSlice.actions;
export default memberSlice.reducer;