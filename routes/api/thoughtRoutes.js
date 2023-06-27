const router = require('express').Router();
const {
  getThought,
  getSingleThought,
  createNewThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/').get(getThought).post(createNewThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

 // /api/thoughts/:thoughtId/reactions
 router.route('/:thoughtId/reactions').post(addReaction)

 router.route('/:thoughtId/:reactionId').delete(removeReaction);
module.exports = router;
