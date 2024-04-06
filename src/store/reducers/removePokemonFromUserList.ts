import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteDoc, doc } from "firebase/firestore";
import { pokemonListRef } from "../../configs/firebase";

export const removePokemonFromUserList = createAsyncThunk(
  "pokemonApp/removePokemonFromUserList",
  async ({ id }: { id: string }) => {
    try {
      await deleteDoc(doc(pokemonListRef, id));
      return { id };
    } catch (err) {
      console.log(err);
    }
  }
);
