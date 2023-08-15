const { ObjectId } = require('mongoose').Types;
const { User, model } = require('../model');

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

            if (!user) {
                return res.status(404).json({ message: 'User does not exist'});
            }

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
}
