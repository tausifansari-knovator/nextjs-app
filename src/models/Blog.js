import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  link: {
    type: String,
    validate: {
      validator: function (v) {
        // Allow full URLs or internal paths like /blog/:id
        return /^https?:\/\/\S+$/.test(v) || /^\/[\w\-\/:]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL or path!`,
    },
    required: [true, "Blog link is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
