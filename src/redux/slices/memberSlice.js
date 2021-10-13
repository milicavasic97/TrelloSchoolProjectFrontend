import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import memberService from "../../services/member.service";

export const login = createAsyncThunk("login", ({ username, password }) =>
  memberService.login(username, password)
);

export const authState = createAsyncThunk("authState", () =>
  memberService.state()
);

export const getAllMembers = createAsyncThunk("getAllMembers", () =>
  memberService.getAll()
);

export const getInvitations = createAsyncThunk(
  "getInvitationsForMember",
  (idMember) => memberService.getInvitations(idMember)
);

const logoutAction = (state, action) => {
  memberService.logout();
  state.authenticated = false;
  state.loading = false;
  state.members = [];
  state.member = null;
};

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
    membersForDropdown: [],
    invitations: [],
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
    [getAllMembers.fulfilled]: (state, action) => {
      state.membersForDropdown = [];
      for (var i = 0; i < action.payload.length; i++) {
        state.membersForDropdown[i] = {
          value: action.payload[i].email,
          label: action.payload[i].username,
        };
      }
    },
    [getInvitations.fulfilled]: (state, action) => {
      state.invitations = action.payload;
    },
  },
});

export const { logout } = memberSlice.actions;
export default memberSlice.reducer;
