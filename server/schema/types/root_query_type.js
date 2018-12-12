import { GraphQLObjectType, GraphQLID, GraphQLList } from 'graphql';
import UserType from './user_type'
import User from '../../models/user';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    user: {
      type: UserType,
      resolve(parrentValue, args, req) {
        return req.user;
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    dummyField: {
      type: GraphQLID
    }
  })
});

export default RootQuery;
