import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPublic } from "../../api/axios";
import { asyncHandler } from "../../utils/helpers/asyncHandlers";
import { createFilterQuery } from "../../utils/helpers/listingsHelper";


// ✅ Add Listing
export const addListing = createAsyncThunk(
  "listing/add",
  asyncHandler(async (props) => {
    const { axios, data } = props;
    const response = await axios.post("/api/listings", data);
    return response.data;
  })
);

// ✅ Get All Listings for Admin (Projects Page)
export const getAllListings = createAsyncThunk(
  "listing/getAllListings",
  asyncHandler(async (props) => {
    const response = await axiosPublic.get("/api/listings", {
      params: props, // Supports pagination if needed
    });
    return response.data;
  })
);

// ✅ Get Listings with Filters
export const getListings = createAsyncThunk(
  "listing/getAll",
  asyncHandler(async (props, thunkAPI) => {
    const { getState } = thunkAPI;
    const { cache, count } = getState().listing;
    const filter = getState().filter;
    const query = createFilterQuery(filter);
    const cacheKey = JSON.stringify({ query, count });

    if (cache[cacheKey]) {
      return { listings: cache[cacheKey], count: JSON.parse(cacheKey).count, cacheKey };
    }

    const response = await axiosPublic.get("/api/listings", { params: query });
    return { listings: response.data.listings, count: response.data.count, cacheKey };
  })
);

// ✅ Get Single Listing by ID
export const getListing = createAsyncThunk(
  "listing/get",
  asyncHandler(async (props) => {
    const { id } = props;
    const response = await axiosPublic.get(`/api/listings/${id}`);
    return response.data;
  })
);

// ✅ Get Logged-in User's Listings
export const getMyListing = createAsyncThunk(
  "listing/getMy",
  asyncHandler(async (props) => {
    const response = await axiosPublic.get("/api/listings", { params: props });
    return response.data;
  })
);

// ✅ Delete Listing
export const deleteListing = createAsyncThunk(
  "listing/delete",
  asyncHandler(async (props) => {
    const { axios, id } = props;
    const response = await axios.delete(`/api/listings/${id}`);
    return response.data;
  })
);

// ✅ Update Listing
export const updateListing = createAsyncThunk(
  "listing/update",
  asyncHandler(async (props) => {
    const { axios, data } = props;
    const response = await axios.put(`/api/listings/${data?._id}`, data);
    return response?.data;
  })
);

export const getCategoryWiseCount = createAsyncThunk(
  "category/count",
  asyncHandler(async () => {
    const response = await axiosPublic.get("/api/listings/category/count");
    return response.data;
  })
);
