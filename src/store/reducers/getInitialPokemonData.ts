import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/constants";

export const getInitialPokemonData = createAsyncThunk(
  "pokemon/initialData",
  async () => {
    try {
      const { data } = await axios.get(`${API_URL}/pokemon?limit=5000`);
      return data.results;
    } catch (err) {
      console.error(err);
    }
  }
);
