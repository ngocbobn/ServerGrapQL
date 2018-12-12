import UserType from './types/user_type';
import AuthService from '../services/auth';
import { GraphQLObjectType, GraphQLString } from 'graphql';

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        signup: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parrentValue, { email, password }, req) {
                return AuthService.signup({ email, password, req })
            }
        },
        login: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parrentValue, { email, password }, req) {
                console.log(email)
                return AuthService.login({ email, password, req })
            }
        },
        logout: {
            type: UserType,
            resolve(parrentValue, args, req) {
                const { user } = req
                req.logout();
                return user;
            }
        }
    }
})

export default mutation;