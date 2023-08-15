const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

// Aggregate function to get the total nubmer of users
const getTotalUsers = async () => {
    const numberOfUsers = await User.aggregate()
        .count('userCount');
    return numberOfUsers;
}

module.exports = {
    // TODO: Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();

            const userObj = {
                users,
                totalUsers: await getTotalUsers(),
            }
            res.json(userObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // TODO: Get user by ID
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId})
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }

            res.json({
                user,
            })
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // TODO: Delete User
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });

            res.json({ message: "user deleted!"});
            // get rid of user's posts, and friends
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // TODO: Update User
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.studentId },
                { username: req.params.username},
                { email: req.params.email},
            )
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // TODO: Create User
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // // TODO: Add friend => /api/users/:userId/friends/:friendId
    async addFriend(req, res) {
        try {
            // update users friends lists
            const friend = User.findOne({ _id: req.params.friendId });
            console.log(friend._id)

            // update the current user's friend list
            const user = User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { friends: friend._id }}
            );

        res.json({ message: "user added to friend list"});
        } catch (err) {
            console.log('blah')
            console.log(err);
            res.status(500).json(err);
        }
    },
    // // TODO: Remove friend => /api/users/:userId/friends/:friendId
    // async deleteFriend(req, res) {
    //     try {
    //         // ---TODO---- 

    //         // delete friend from friends array
    //     } catch (err) {
    //         console.log(err);
    //         res.status(500).json(err);
    //     }
    // },
}
