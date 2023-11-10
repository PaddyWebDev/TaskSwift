import mongoose, { Mongoose } from "mongoose";

// Define the schema
const subTaskSchema = new mongoose.Schema({
  SubTaskName: String,
});

const taskSchema = new mongoose.Schema({
  TaskName: String,
  SubTasks: [subTaskSchema],
});

const AddedMemberSchema = new mongoose.Schema({
  MemberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // If you have a User model, you can reference it here
  },
  MemberName: String,
});

const boardSchema = new mongoose.Schema(
  {
    BoardName: String,
    Tasks: [taskSchema],

    AddedMember: [AddedMemberSchema],

    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // If you have a User model, you can reference it here
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Create the model

const Board = mongoose.models.Board || mongoose.model("Board", boardSchema);
export default Board;
