import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPublic } from "../../api/axios";
import { clearListingsState, clearMyListings } from "../listings/listingSlice";
import { clearFilters } from "../filter/filterSlice";

export const signUpUser = createAsyncThunk(
  "user/signup",
  async (props, { rejectWithValue }) => {
    try {
      console.log("Signup Request:", props);
      const response = await axiosPublic.post("/api/auth/signup", props);
      console.log("Signup Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const signInUser = createAsyncThunk(
  "user/signin",
  async (props, { rejectWithValue }) => {
    try {
      console.log("Signin Request:", props);
      const response = await axiosPublic.post("/api/auth/signin", props);
      console.log("Signin Response:", response.data);
      localStorage.setItem("Email", JSON.stringify(response?.data?.email));
      console.log("Response",response)
      console.log("Response",response.data.accessToken)


      // ✅ Store token in localStorage
      if (response?.data?.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
      }

      return response.data;
    } catch (error) {
      console.error("Signin Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const updateUser = createAsyncThunk(
  "user/update",
  async (props, { rejectWithValue }) => {
    try {
      const { id, userData, axios } = props;
      console.log("Update Request:", props);
      const response = await axios.put(`/api/user/update/${id}`, userData);
      console.log("Update Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Update Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const generateToken = createAsyncThunk(
  "user/token",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Generating Token...");
      const response = await axiosPublic.get(`/api/auth/token`);
      console.log("Token Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Token Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/delete",
  async (props, thunkAPI) => {
    try {
      const { id, axios } = props;
      const { dispatch } = thunkAPI;
      console.log("Delete Request:", props);
      const response = await axios.delete(`/api/user/delete/${id}`);
      console.log("Delete Response:", response.data);
      dispatch(clearMyListings());
      return response.data;
    } catch (error) {
      console.error("Delete Error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      const { dispatch } = thunkAPI;
      console.log("Logging Out...");
      const response = await axiosPublic.get(`/api/auth/logout`);
      console.log("Logout Response:", response.data);
      dispatch(clearListingsState());
      dispatch(clearFilters());
      return response.data;
    } catch (error) {
      console.error("Logout Error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
