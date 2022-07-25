import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axios, errorResponse } from "../../helpers";

const initialState = {
  data: [],
  isFetched : false,
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchTodo = createAsyncThunk("todo/get", async () => {
  try {
    const response = await axios.get("/todo/1.0.0/to-do-list");
    return response.data;
  } catch (err) {
    return errorResponse(err);
  }
});

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state,action) => {
      state.data.push(action.payload)
    },
    editTodo: (state,action) => {
      const index = state.data.findIndex(data => data.id === action.payload.id);
      state.data[index] = action.payload ;
    },
    deleteTodo: (state,action) => {
        const index = state.data.findIndex(data => data.id === action.payload.id);
        if(index > -1){
          state.data.splice(index, 1);
        }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchTodo.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isFetched = true;
        state.data = action.payload;
        state.error = null;
    });
    builder.addCase(fetchTodo.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const todoData = (state) => state.todo;
export const { addTodo, editTodo ,deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
