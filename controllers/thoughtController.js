const { Thought, User } = require('../models');

module.exports = {
  // GET to get all thoughts
  async getThought(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // GET to get a single thought by its _id
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId)
        .select('-__v')
       

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
      console.log(err)
    }
  },

  // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
  async createNewThought(req, res) {
    try {
      const { thoughtText, username, userId } = req.body;
  
      const newThought = new Thought({
        thoughtText,
        username
      });
  
      const createdThought = await newThought.save();
      
      const user = await User.findByIdAndUpdate(
        userId,
        { $push: { thoughts: createdThought._id } },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }
  
      res.json(createdThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

 // PUT to update a thought by its _id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE to remove a thought by its _id
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
      }

      // await Student.deleteMany({ _id: { $in: course.students } });
      res.json({ message: 'Thought deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // POST to create a reaction stored in a single thought's reactions array field
async addReaction(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body} },
      { runValidators: true, new: true }
    );

    if (!thought) {
      return res
        .status(404)
        .json({ message: 'No thought found with that ID :(' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
},


//DELETE to pull and remove a reaction by the reaction's reactionId value
async removeReaction(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    );

    if (!thought) {
      return res
        .status(404)
        .json({ message: 'No thought found with that ID :(' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
},

  
};
