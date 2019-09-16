import * as path from 'path';
import { GraphQLSchema } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'
import { importSchema } from 'graphql-import'
import { Query } from './resolver';

export const getAuthSchema = async (): Promise<GraphQLSchema> => {
    return makeExecutableSchema({
    typeDefs: importSchema(path.join(__dirname, 'userSchema.graphql')),
    resolvers: {
        Query
    }
  })
}