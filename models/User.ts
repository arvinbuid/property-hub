import {model, models, Schema} from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    image: {
      type: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", userSchema);

export default User;
