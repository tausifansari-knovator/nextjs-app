import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRETclear,
});

export async function POST(request) {
  try {
    console.log("Starting file upload process...");
    const formData = await request.formData();
    const file = formData.get("file");
    console.log("File received:", file ? "Yes" : "No");

    if (!file) {
      console.log("No file provided in request");
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    console.log("File converted to buffer, size:", buffer.length);

    // Upload to Cloudinary
    console.log("Starting Cloudinary upload...");
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "profile_images",
            resource_type: "auto",
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(error);
            }
            console.log("Cloudinary upload successful:", result.secure_url);
            resolve(result);
          }
        )
        .end(buffer);
    });

    console.log("Upload complete, returning URL:", result.secure_url);
    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Error uploading file" },
      { status: 500 }
    );
  }
} 