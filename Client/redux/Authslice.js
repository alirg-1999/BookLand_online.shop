import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LoginApi } from "@/pages/api/serverApi";
import Cookies from "js-cookie";

export const loginData = createAsyncThunk("/auth", async (userData) => {
  const response = await LoginApi(userData).then((res) => {
    Cookies.set("userToken", res.data.token);
    Cookies.set("user", userData.phone_number);
    window.location.href = "/";
  });
  return response.data;
});

const initialState = {
  loading: false,
  user: null,
  userToken: Cookies.get("userToken") || null,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    userInfo: (state, action) => {
      state.user = action.payload;
    },
    logout: () => {
      Cookies.remove("user");
      Cookies.remove("userToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginData.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })

      .addCase(loginData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { userInfo } = userSlice.actions;
export default userSlice.reducer;
