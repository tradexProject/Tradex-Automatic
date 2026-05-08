import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const { User } = require("@/backend/models/user");

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});


export async function POST(req) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    let decoded;

    try {
      if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is missing");
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = changePasswordSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ 
        error: parsed.error.errors[0].message 
      }, { status: 400 });
    }

    const { currentPassword, newPassword } = parsed.data;

    const admin = await User.findOne({ where: { id: decoded.id } });

    if (!admin) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Incorrect current password" }, { status: 400 });
    }

    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    admin.password = hashedNewPassword;
    await admin.save();

    return NextResponse.json({ 
      message: "Password updated successfully" 
    }, { status: 200 });

  } catch (error) {
    console.error("Change Password Error Details:", error);

    const errorMessage = error.name === 'SequelizeConnectionRefusedError' 
      ? "Database connection failed" 
      : "An internal server error occurred";

    return NextResponse.json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}
