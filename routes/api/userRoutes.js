const router = requires('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    // TODO:
    addFriend,
} = require('../../controllers/userController');

// api/users
router.route('/').get(getUser).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/users/:userId/friends/:friendId
router.route('./:userId/friends/:friendId').post(addFriend).delete(deleteFriend);
