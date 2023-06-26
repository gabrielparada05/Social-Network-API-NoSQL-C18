const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');


// Aggregate function to get the number of user overall
const headCount = async () => {
  const numberOfUser = await User.aggregate()
    .count('userCount');
  return numberOfUser;
}

module.exports = {
 // GET USER
  async getUser(req, res) {
    try {
      const users = await User.find();

      const userObj = {
        users,
        headCount: await headCount(),
      };

      res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findById(req.params.userId)
        .select('-__v')
        //GET a single user by its _id and populated thought and friend data
        .populate('thoughts')
        .populate('friends')
        .exec();
  
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
  
      res.json({ user });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },


  // POST a new user
  async createUser(req, res) {
    try {
      const { username, email } = req.body;
      const newUser = new User({
        username,
        email
      });
      const createdUser = await newUser.save()
      res.json(createdUser);
    } catch (err) {
      res.status(500).json(err);
    }
    },

    /// update by id



  // Delete a user 
  async deleteUser(req, res) {
    try {
      const user = await user.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }
//Remove a user's associated thoughts when deleted
      const thought = await Thought.findOneAndUpdate(
        { user: req.params.userId },
        { $pull: { students: req.params.userId } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: 'User deleted, but no thought found',
        });
      }

      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  



  // Remove thought from a user
  async removeThought(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { thought: { thoughtId: req.params.thoughtId } } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
