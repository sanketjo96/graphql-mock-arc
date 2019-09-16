import * as path from 'path';
import { join } from 'path';
import { GraphQLServer } from 'graphql-yoga';
import { Prisma } from 'prisma-binding';
import { makeExecutableSchema } from 'graphql-tools'
import { importSchema } from 'graphql-import';
import {Query} from './resolvers/query';

const start = async () => {
    try {
        // App schema
        const resolvers = {
            Query
        }
        const schema = makeExecutableSchema({
            typeDefs: importSchema(path.join(__dirname, 'schema.graphql')),
            resolvers
        });

        const prisma: Prisma = new Prisma({
            typeDefs: join(__dirname, 'generated', 'prisma.graphql'),
            endpoint: 'http://localhost:4466',
            debug: false,
        });

        const server = new GraphQLServer({
            schema,
            middlewares: 
            context: req => ({
                ...req,
                prisma
            })
        })
        server.start(() => console.log(`GraphQL server is running on http://localhost:4000`))
    }
    catch (e) {
        throw (e)
    }
}

start();