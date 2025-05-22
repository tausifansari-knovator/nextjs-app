import { connectToDB } from "@/lib/db";
import { Blog } from "@/models/Blog";

export async function GET() {
  await connectToDB();
  const blogs = await Blog.find().sort({ createdAt: -1 });
  if (!blogs || blogs.length === 0) {
    const response = new Response(
      JSON.stringify({ message: "No blogs found" }),
      { status: 404 }
    );
    console.log("GET response:", response);
  }
  return Response.json(blogs);
}

export async function POST(req) {
  const body = await req.json();
  await connectToDB();
  const blog = await Blog.create(body);
  return Response.json(blog);
}
