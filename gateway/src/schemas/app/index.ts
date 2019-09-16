import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import introspectSchema from 'graphql-tools/dist/stitching/introspectSchema';
import makeRemoteExecutableSchema from 'graphql-tools/dist/stitching/makeRemoteExecutableSchema';

const link = new HttpLink({ uri: 'http://localhost:4000/', fetch });

export const getAppSchema = async () => {
    const schema = await introspectSchema(link);
    const executableSchema = makeRemoteExecutableSchema({
        schema,
        link,
    });

    return executableSchema;
}