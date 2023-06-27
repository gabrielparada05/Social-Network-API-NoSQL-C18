const { Schema, Types, model } = require('mongoose');



// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim:true, 
    },
    email: {
      type: String,
      required: true,
      unique: true,
      isEmail:true,
      validate: {
        validator: function (value) {
        
          return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
        },
        message: 'Invalid email address',
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      getters: true,
      //Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
      virtuals: true,
    },
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

User.deleteMany({}).then((deletedC) => {
  console.log(deletedC);

User.create([
  {
    username: "user1",
    email: "user1@example.com",
    thoughts: [],
    friends: []
  },
  {
    username: "user2",
    email: "user2@example.com",
    thoughts: [],
    friends: []
  },
  {
    username: "user3",
    email: "user3@example.com",
    thoughts: [],
    friends: []
  },
  {
    username: "user4",
    email: "user4@example.com",
    thoughts: [],
    friends: []
  },
  {
    username: "user5",
    email: "user5@example.com",
    thoughts: [],
    friends: []
  }
])
});

module.exports = User
