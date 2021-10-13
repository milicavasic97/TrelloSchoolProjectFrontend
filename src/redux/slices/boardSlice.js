import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import boardService from "../../services/board.service";
import listService from "../../services/list.service";

export const getBoardById = createAsyncThunk("getBoardById", (boardId) =>
  boardService.getById(boardId)
);

export const getLists = createAsyncThunk("getLists", (boardId) =>
  boardService.getLists(boardId)
);

export const insertList = createAsyncThunk(
  "insertList",
  (list, { rejectWithValue }) =>
    listService.insertList(list).catch(rejectWithValue)
);

export const updateBoard = createAsyncThunk(
  "updateBoard",
  (board, { rejectWithValue }) =>
    boardService.updateBoard(board).catch(rejectWithValue)
);

export const updateList = createAsyncThunk(
  "updateList",
  (list, { rejectWithValue }) =>
    listService.updateList(list).catch(rejectWithValue)
);

export const removeBoard = createAsyncThunk(
  "removeBoard",
  (boardId, { rejectWithValue }) =>
    boardService.deleteBoard(boardId).catch(rejectWithValue)
);

export const removeList = createAsyncThunk(
  "removeList",
  (listId, { rejectWithValue }) =>
    listService.deleteList(listId).catch(rejectWithValue)
);

const boardSlice = createSlice({
  name: "boards",
  initialState: {
    board: null,
    trelloLists: [],
    reloadLists: false,
    reloadCards: false,
  },
  reducers: {
    setReloadLists: (state, action) => {
      state.reloadLists = !state.reloadLists;
    },
  },
  extraReducers: {
    [getBoardById.fulfilled]: (state, action) => {
      state.board = action.payload;
    },
    [getLists.fulfilled]: (state, action) => {
      state.trelloLists = [];
      state.trelloLists = action.payload;
    },
    [updateBoard.fulfilled]: (state, action) => {
      state.board = action.payload;
    },
  },
});

export const { setReloadLists } = boardSlice.actions;
export default boardSlice.reducer;
