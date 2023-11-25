import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  BoardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "boards",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  // Additional fields based on your specific requirements
  invite: {
    // Information related to invites
    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    invitedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Replace with the relevant model for the invite target
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
});

const Notification =
  mongoose.models.notifications ||
  mongoose.model("notifications", notificationSchema);

export default Notification;
