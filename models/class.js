const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reviewSchema = new Schema(
  {
    msg: String,
    rating: Number,
    postedBy: {type: Schema.Types.ObjectId, ref: "User"}

  },
  {
    timestamps: true,
  }
)
const classSchema = new Schema(
  {
    title: String,
    price: Number,
    location: String,
    students: [{type: Schema.Types.ObjectId, ref: "User"}],
    instructor: {type: Schema.Types.ObjectId, ref: "User"},
    reviews: [reviewSchema]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Lesson', classSchema);