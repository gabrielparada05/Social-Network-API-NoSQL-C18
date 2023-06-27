const { Schema, Types, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create a course model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      /// Use a getter method to format the timestamp on query
    },
    username: {
      type: String,
      required:true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Thought = model('Thought', thoughtSchema);

Thought.create([
  {
    thoughtText: "Just had a great day!",
    createdAt: "2022-01-01T09:00:00.000Z",
    username: "user1",
    reactions: []
  },
  {
    thoughtText: "Excited for the weekend!",
    createdAt: "2022-01-02T14:30:00.000Z",
    username: "user2",
    reactions: []
  },
  {
    thoughtText: "Feeling motivated today!",
    createdAt: "2022-01-03T20:15:00.000Z",
    username: "user3",
    reactions: []
  },
  {
    thoughtText: "Reflecting on life's lessons.",
    createdAt: "2022-01-04T11:45:00.000Z",
    username: "user4",
    reactions: []
  },
  {
    thoughtText: "Enjoying the little things.",
    createdAt: "2022-01-05T16:20:00.000Z",
    username: "user5",
    reactions: []
  }
]);

module.exports = Thought;
