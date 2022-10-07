const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const Entry = require('../models/Entry');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
        });

        return user;
      }

      throw new AuthenticationError('Not logged in');
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addEntry: async (parent, args, context) => {
      if (context.user) {
        const entry = await Entry.create({...args, username: context.user.username });
        await User.findByIdAndUpdate(
          {
            _id: context.user._id
          },
          {
            $push: { entries: entry._id}
          },
          {
            new: true
          }
        );

        return entry;
      }
      throw new AuthenticationError('You need to be looged in!');
    }
  }
};

module.exports = resolvers;
