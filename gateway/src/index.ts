import { GraphQLServer } from 'graphql-yoga';
import { mergeSchemas } from 'graphql-tools';
import { getAuthSchema } from './schemas/auth';
import { getAppSchema } from './schemas/app';

const start = async () => {
    try {
        // Auth schema
        const authSchema = await getAuthSchema();
        const appSchema = await getAppSchema();
       
        // Linkage schema
        const linkSchema = `
            extend type AuthPayLoad {
                user: Author
            }
        `;

        // Resultant schema along with linkage resolvers
        const schema = mergeSchemas({
            schemas: [authSchema, appSchema, linkSchema],
            resolvers: {
                AuthPayLoad: {
                    user: {
                        resolve: async (parent, args, context, info) => {
                            try {
                                const data = await info.mergeInfo.delegateToSchema({
                                    schema: appSchema,
                                    operation: 'query',
                                    fieldName: 'author',
                                    args: {
                                        name: 'shashikant'
                                    },
                                    context,
                                    info
                                });
                                return data;
                            }
                            catch (e) {
                                throw (e);
                            }
                        }
                    }
                }
            }
        })


        const server = new GraphQLServer({
            schema        
        })
        server.start({port: "7777"}, ({port}) => console.log(`GraphQL server is running on http://localhost:${port}`))
    }
    catch (e) {
        throw (e)
    }
}

start();