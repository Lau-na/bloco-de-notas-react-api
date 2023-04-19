import mongoose, { Schema } from "mongoose";

const category = new Schema({
  description: { type: String, required: true },
  icon: { type: String, required: true },
  color: { type: String, required: true },
});

const note = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, required: true },
  category: { type: category, required: true },
});

category.set("toJSON", { virtuals: true });
note.set("toJSON", { virtuals: true });

export const Note = mongoose.model("Note", note);
export const Category = mongoose.model("Category", category);
