const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema(
  {
    title: String,
    price: Number,
    rating: Number,
    location: String,
    students: [{type: Schema.Types.ObjectId, ref: "User"}],
    instructor: {type: Schema.Types.ObjectId}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Lesson', classSchema);