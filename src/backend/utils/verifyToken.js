import jwt from "jsonwebtoken";

export function verifyAdmin(request) {
  try {
    const authHeader = request.headers.get("authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return { success: false, error: "Authentication token is missing", status: 401 };
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.isAdmin) {
      return { success: false, error: "Insufficient permissions", status: 403 };
    }

    return { success: true, user: decoded };
  } catch (error) {
    return { success: false, error: "Invalid or expired session", status: 401 };
  }
}