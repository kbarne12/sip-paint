const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reviewSchema = new Schema(
  {
  reviewer: {type: Schema.Types.ObjectId, ref: "User"} ,
  rating: { type: Number, min: 1, max: 10 },
  content: String,
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