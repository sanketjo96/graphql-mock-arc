export const Query = {
    author: async (root, args, context, info) => {
        const data = await context.prisma.query.authors({
            where: {
                name: args.name
            }
        }, info);
        return data[0];
    },
    authors: async (root, args, context, info) => {
        return context.prisma.query.authors({}, info);
    },
    comments: async (root, args, context, info) => {
        return context.prisma.query.comments({}, info);
    }
}