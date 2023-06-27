const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  removeThought,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUser).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser)
.put(updateUser);


// /api/users/:userId/:thoughtId
router.route('/:userId/:thoughtId').delete(removeThought);

// /api/users/:userId/friends
router.route('/:userId/friends').post(addFriend)

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
.delete(removeFriend);




module.exports = router;
