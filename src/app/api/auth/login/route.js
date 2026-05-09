import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import { checkRateLimit } from '../../../../backend/utils/rateLimit';
const { User } = require("../../../../backend/models/user"); 
import jwt from 'jsonwebtoken';

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.ip || 'unknown_ip';
    const rateLimitResult = checkRateLimit(ip, 5, 15 * 60 * 1000); 

    if (!rateLimitResult.success) {
      return NextResponse.json({ error: "Too many login attempts. Please try again later." }, { status: 429 });
    }

    const body = await req.json();
    const parsed = loginSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ 
        error: parsed.error.errors[0].message 
      }, { status: 400 });
    }

    const { email, password } = parsed.data;

    const admin = await User.findOne({ where: { email } });

    if (!admin) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing in .env");
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: "15m" } 
    );

    return NextResponse.json({ 
      message: "Admin logged in successfully",
      token
    }, { status: 200 });

  } catch (error) {
    console.error("Login Error Details:", error);

    const errorMessage = error.name === 'SequelizeConnectionRefusedError' 
      ? "Database connection failed" 
      : "An internal server error occurred";

    return NextResponse.json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}
