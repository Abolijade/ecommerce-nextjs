import connect from "../../../lib/db";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    await connect();

    const normalizedEmail = email.toLowerCase();

    // Find user by email
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return new Response(
        JSON.stringify({ message: "User not found" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("Stored hashed password:", user.password);

    const valid = await bcrypt.compare(password.trim(), user.password);
    console.log("Password valid?", valid);

    if (!valid) {
      return new Response(
        JSON.stringify({ message: "Invalid password" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ message: "Login success", role: user.role }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
