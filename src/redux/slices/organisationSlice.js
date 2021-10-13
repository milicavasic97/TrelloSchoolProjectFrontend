import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import memberService, { state } from "../../services/member.service";
import organisationService from "../../services/organisation.service";

export const getAllOrganisationsForMe = createAsyncThunk(
  "getAllOrganisationsForMe",
  (memberId) => organisationService.getAllOrganisationsForMe(memberId)
);

export const getOrganisationById = createAsyncThunk(
  "getOrganisationById",
  (organisationId) => organisationService.getById(organisationId)
);

export const getBoards = createAsyncThunk("getBoards", (organisationId) =>
  organisationService.getBoardsForOrganisation(organisationId)
);

export const getMembers = createAsyncThunk("getMembers", (organisationId) =>
  organisationService.getMembersForOrganisation(organisationId)
);

export const insert = createAsyncThunk(
  "insert",
  (organisation, { rejectWithValue }) =>
    organisationService.insertOrganisation(organisation).catch(rejectWithValue)
);

export const update = createAsyncThunk(
  "update",
  (organisation, { rejectWithValue }) =>
    organisationService.updateOrganisation(organisation).catch(rejectWithValue)
);

export const remove = createAsyncThunk(
  "remove",
  (organisationId, { rejectWithValue }) =>
    organisationService
      .deleteOrganisation(organisationId)
      .then(() => organisationId)
      .catch(rejectWithValue)
);

const setShowBoardsAction = (state, action) => {
  state.showBoards = true;
  state.showMembers = false;
};

const setShowMembersAction = (state, action) => {
  state.showBoards = false;
  state.showMembers = true;
};

const resetAction = (state, action) => {
  state.organisationList = [];
  state.organisation = null;
  state.boards = [];
  state.members = [];
  state.showBoards = false;
  state.showMembers = false;
};

const organisationSlice = createSlice({
  name: "organisations",
  initialState: {
    organisationList: [],
    organisation: null,
    boards: [],
    members: [],
    showBoards: false,
    showMembers: false,
  },
  reducers: {
    setShowBoards: setShowBoardsAction,
    setShowMembers: setShowMembersAction,
    resetOrganisationSlice: resetAction,
  },
  extraReducers: {
    [getAllOrganisationsForMe.fulfilled]: (state, action) => {
      state.organisationList = action.payload;
    },
    [getOrganisationById.fulfilled]: (state, action) => {
      state.organisation = action.payload;
    },
    [getBoards.fulfilled]: (state, action) => {
      state.boards = action.payload;
    },
    [getMembers.fulfilled]: (state, action) => {
      state.members = action.payload;
    },
    [insert.fulfilled]: (state, action) => {
      state.organisation = action.payload;
      state.boards = [];
      state.members = [];
      state.invitedMembers = [];
      state.showBoards = true;
      state.showMembers = false;
    },
    [update.fulfilled]: (state, action) => {
      // state.organisation = action.payload;
      // return action.payload;
      state.organisation = action.payload;
    },
  },
});
export const { setShowBoards, setShowMembers, resetOrganisationSlice } =
  organisationSlice.actions;
export default organisationSlice.reducer;
