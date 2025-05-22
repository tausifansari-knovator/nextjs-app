import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "@/models/User";
import {connectToDB} from "@/lib/db";

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);
    console.log("Current session:", session);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { name, email, image } = await request.json();
    console.log("Update data received:", { name, email, image });

    // Connect to database
    await connectToDB();
    console.log("Database connected");

    // Update user in database
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { name, email, image },
      { new: true }
    );
    console.log("Updated user:", updatedUser);

    if (!updatedUser) {
      console.log("User not found for email:", session.user.email);
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Error updating user" },
      { status: 500 }
    );
  }
} 