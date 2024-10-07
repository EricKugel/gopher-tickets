import { Schema, model, models } from "mongoose";

export const UserSchema = new Schema({
  user_id: {
    type: String
  },
  title: {
    type: String
  },
  date: {
    type: Date
  },
  time: {
    type: String,
  },
  location: {
    type: String,
  },
  seat: {
    type: String,
  },
  price: {
    type: Number,
  },
  obo: {
    type: Boolean,
  }
});

const Ticket = models?.Ticket || model("Ticket", UserSchema);
export default Ticket;
