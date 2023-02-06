const { user, User} = require('../models');
const { AuthenicationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
    me: async (parent, args, context) => {
        if(context.user) {
            const userData = await User.findOne ({_id: context.user.id })
             .select('_v -password')

        return userData;
        }

        throw new AuthenicationError('Not logged in');
    }
},

// Mutation are defined as part of schema. Mutation queries modify data in the data store and returns a value.  It can be used to
// (insert, update, or delete data). 
Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
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
    saveBook: async (parent, { input }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: input } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You must be logged in!')
    },

    removeBook: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: args.bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You must be logged in!')
    } 
  }
};

//Export resolvers
module.exports = resolvers;