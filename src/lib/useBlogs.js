import { useState, useEffect } from "react";
import axios from "axios";

export const useBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("api/blog");
      const data = await res.data;
      setBlogs(data);
    } catch (err) {
      throw new Error(`Something went wrong! Original error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const createBlogs = async (newblog) => {
    try {
      await axios.post("api/blog", newblog);
      fetchBlogs();
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const updateBlogs = async (id, updates) => {
    try {
      const res = await axios.put(`api/blog/${id}`, updates);
      console.log("Updated blog:", res);
      fetchBlogs();
    } catch (err) {
      throw new Error(`Something went wrong! Original error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlogs = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/api/blog/${id}`);
      fetchBlogs();
      console.log("Blog deleted successfully.");
    } catch (err) {
      console.error("Failed to delete blog:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return { blogs, loading, createBlogs, deleteBlogs, updateBlogs };
};
