import { Schema, model, models } from "mongoose";

/**
 * This section defines the schema for a user, specifying various properties like name, lastName, email, password, and isAdmin. It also includes validation rules such as required fields and email format validation. The select: false option for the password field means that the password won't be included in query results by default.
 */

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  lastName: {
    type: String,
    required: [true, "LastName is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email is invalid",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
