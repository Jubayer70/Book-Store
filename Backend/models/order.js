const mongoos = require("mongoose");
const order = new mongoos.Schema(
  {
    user: {
      type: mongoos.Types.ObjectId,
      ref: "user",
    },
    book: {
      type: mongoos.Types.ObjectId,
      ref: "books"
    },
    status: {
      type: String,
      default: "Order Placed",
      enum: ["Order Placed","Out For Delivery","Delivered","Canceled"],
    },
  }, { timestamps: true }
);
module.exports = mongoos.model("order", order);