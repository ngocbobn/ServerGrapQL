import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: {
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    }
})

export default UserType