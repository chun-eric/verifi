// essential for authentication and access controls
import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Interface
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "admin" | "compliance-officer" | "analyst" | "auditor";
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;

  // methods
  matchPassword(enteredPassword: string): Promise<boolean>; // return type Promise resolves to boolean (true/false)
  getSignedJwtToken(): string; // return type string
}

//  User Schema
const UserSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: [true, "Please provide a first name"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Please provide a last name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide a first name"],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false, // Don't return password by default
    },
    role: {
      type: String,
      enum: ["admin", "compliance-officer", "analyst", "auditor"],
      default: "analyst",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true, // convenient way to automaticaly include and update createdAt and updatedAt
  }
);

// Encrypt password before saving to database
// pre is a middleware pre save hook before anything is saved to MongoDb
UserSchema.pre<IUser>("save", async function (next) {
  // if it hasnt modified the password return
  if (!this.isModified("password")) {
    return next(); // this refers to the current document
  }

  const salt = await bcrypt.genSalt(10); // generates random salt to 10 digits
  this.password = await bcrypt.hash(this.password, salt); // converst plain text password, coverts to hash using salt.
  next(); // continues operation
});

// Check if password matches
// UserSchema.methods gives us access to our methods from IUser interface
UserSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT Token
UserSchema.methods.getSignedJwtToken = function (): string {
  return jwt.sign(
    {
      id: this._id.toString(),
      role: this.role,
    },
    process.env.JWT_SECRET || "",
    {
      expiresIn: parseInt(process.env.JWT_EXPIRE || "3600"),
    }
  );
};

export default mongoose.model<IUser>("User", UserSchema);
