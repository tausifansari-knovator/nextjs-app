import { connectToDB } from "@/lib/db";
import { Blog } from "@/models/Blog";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const body = await req.json();

  await connectToDB();
  console.log("params:", params);
  const updated = await Blog.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(_, { params }) {
  await connectToDB();
  await Blog.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted" });
}
