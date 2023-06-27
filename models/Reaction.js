const { Schema, Types, model } = require('mongoose');


const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //Use a getter method to format the timestamp on query
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Reaction = model('Reaction', reactionSchema);

// Reaction.deleteMany({}).then((deletedC) => {
//   console.log(deletedC);

// Reaction.create([
//   {
//     reactionBody: "Great post!",
//     username: "user1",
//     createdAt: "2022-01-01T09:00:00.000Z"
//   },
//   {
//     reactionBody: "Interesting topic!",
//     username: "user2",
//     createdAt: "2022-01-02T14:30:00.000Z"
//   },
//   {
//     reactionBody: "I agree!",
//     username: "user3",
//     createdAt: "2022-01-03T20:15:00.000Z"
//   },
//   {
//     reactionBody: "Well said!",
//     username: "user4",
//     createdAt: "2022-01-04T11:45:00.000Z"
//   },
//   {
//     reactionBody: "I have a different opinion.",
//     username: "user5",
//     createdAt: "2022-01-05T16:20:00.000Z"
//   }
// ])
// });

module.exports = reactionSchema;
