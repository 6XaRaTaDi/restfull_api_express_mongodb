import mongoose from "mongoose";

const { Schema } = mongoose

const gigSchema = {
  userId: {
    type: Number,
    unique: true,
  }
}