import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import { Options } from 'graphql-binding'
import { makePrismaBindingClass, BasePrismaOptions } from 'prisma-binding'

export interface Query {
    blogs: <T = Array<Blog | null>>(args: { where?: BlogWhereInput | null, orderBy?: BlogOrderByInput | null, skip?: Int | null, after?: String | null, before?: String | null, first?: Int | null, last?: Int | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    comments: <T = Array<Comment | null>>(args: { where?: CommentWhereInput | null, orderBy?: CommentOrderByInput | null, skip?: Int | null, after?: String | null, before?: String | null, first?: Int | null, last?: Int | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    authors: <T = Array<Author | null>>(args: { where?: AuthorWhereInput | null, orderBy?: AuthorOrderByInput | null, skip?: Int | null, after?: String | null, before?: String | null, first?: Int | null, last?: Int | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    blog: <T = Blog | null>(args: { where: BlogWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    comment: <T = Comment | null>(args: { where: CommentWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    author: <T = Author | null>(args: { where: AuthorWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    blogsConnection: <T = BlogConnection>(args: { where?: BlogWhereInput | null, orderBy?: BlogOrderByInput | null, skip?: Int | null, after?: String | null, before?: String | null, first?: Int | null, last?: Int | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    commentsConnection: <T = CommentConnection>(args: { where?: CommentWhereInput | null, orderBy?: CommentOrderByInput | null, skip?: Int | null, after?: String | null, before?: String | null, first?: Int | null, last?: Int | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    authorsConnection: <T = AuthorConnection>(args: { where?: AuthorWhereInput | null, orderBy?: AuthorOrderByInput | null, skip?: Int | null, after?: String | null, before?: String | null, first?: Int | null, last?: Int | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    node: <T = Node | null>(args: { id: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> 
  }

export interface Mutation {
    createBlog: <T = Blog>(args: { data: BlogCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createComment: <T = Comment>(args: { data: CommentCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createAuthor: <T = Author>(args: { data: AuthorCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateBlog: <T = Blog | null>(args: { data: BlogUpdateInput, where: BlogWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updateComment: <T = Comment | null>(args: { data: CommentUpdateInput, where: CommentWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    updateAuthor: <T = Author | null>(args: { data: AuthorUpdateInput, where: AuthorWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deleteBlog: <T = Blog | null>(args: { where: BlogWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deleteComment: <T = Comment | null>(args: { where: CommentWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    deleteAuthor: <T = Author | null>(args: { where: AuthorWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    upsertBlog: <T = Blog>(args: { where: BlogWhereUniqueInput, create: BlogCreateInput, update: BlogUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertComment: <T = Comment>(args: { where: CommentWhereUniqueInput, create: CommentCreateInput, update: CommentUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertAuthor: <T = Author>(args: { where: AuthorWhereUniqueInput, create: AuthorCreateInput, update: AuthorUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyBlogs: <T = BatchPayload>(args: { data: BlogUpdateManyMutationInput, where?: BlogWhereInput | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyComments: <T = BatchPayload>(args: { data: CommentUpdateManyMutationInput, where?: CommentWhereInput | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyAuthors: <T = BatchPayload>(args: { data: AuthorUpdateManyMutationInput, where?: AuthorWhereInput | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyBlogs: <T = BatchPayload>(args: { where?: BlogWhereInput | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyComments: <T = BatchPayload>(args: { where?: CommentWhereInput | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyAuthors: <T = BatchPayload>(args: { where?: AuthorWhereInput | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Subscription {
    blog: <T = BlogSubscriptionPayload | null>(args: { where?: BlogSubscriptionWhereInput | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T | null>> ,
    comment: <T = CommentSubscriptionPayload | null>(args: { where?: CommentSubscriptionWhereInput | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T | null>> ,
    author: <T = AuthorSubscriptionPayload | null>(args: { where?: AuthorSubscriptionWhereInput | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T | null>> 
  }

export interface Exists {
  Blog: (where?: BlogWhereInput) => Promise<boolean>
  Comment: (where?: CommentWhereInput) => Promise<boolean>
  Author: (where?: AuthorWhereInput) => Promise<boolean>
}

export interface Prisma {
  query: Query
  mutation: Mutation
  subscription: Subscription
  exists: Exists
  request: <T = any>(query: string, variables?: {[key: string]: any}) => Promise<T>
  delegate(operation: 'query' | 'mutation', fieldName: string, args: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<any>;
delegateSubscription(fieldName: string, args?: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<any>>;
getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}

export interface BindingConstructor<T> {
  new(options: BasePrismaOptions): T
}
/**
 * Type Defs
*/

const typeDefs = `type AggregateAuthor {
  count: Int!
}

type AggregateBlog {
  count: Int!
}

type AggregateComment {
  count: Int!
}

type Author implements Node {
  id: ID!
  name: String!
  blog: Blog
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment!]
}

"""A connection to a list of items."""
type AuthorConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [AuthorEdge]!
  aggregate: AggregateAuthor!
}

input AuthorCreateInput {
  name: String!
  blog: BlogCreateOneInput
  comments: CommentCreateManyInput
}

input AuthorCreateOneInput {
  create: AuthorCreateInput
  connect: AuthorWhereUniqueInput
}

"""An edge in a connection."""
type AuthorEdge {
  """The item at the end of the edge."""
  node: Author!

  """A cursor for use in pagination."""
  cursor: String!
}

enum AuthorOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type AuthorPreviousValues {
  id: ID!
  name: String!
}

type AuthorSubscriptionPayload {
  mutation: MutationType!
  node: Author
  updatedFields: [String!]
  previousValues: AuthorPreviousValues
}

input AuthorSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [AuthorSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [AuthorSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [AuthorSubscriptionWhereInput!]

  """The subscription event gets dispatched when it's listed in mutation_in"""
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: AuthorWhereInput
}

input AuthorUpdateDataInput {
  name: String
  blog: BlogUpdateOneInput
  comments: CommentUpdateManyInput
}

input AuthorUpdateInput {
  name: String
  blog: BlogUpdateOneInput
  comments: CommentUpdateManyInput
}

input AuthorUpdateManyMutationInput {
  name: String
}

input AuthorUpdateOneInput {
  create: AuthorCreateInput
  connect: AuthorWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: AuthorUpdateDataInput
  upsert: AuthorUpsertNestedInput
}

input AuthorUpsertNestedInput {
  update: AuthorUpdateDataInput!
  create: AuthorCreateInput!
}

input AuthorWhereInput {
  """Logical AND on all given filters."""
  AND: [AuthorWhereInput!]

  """Logical OR on all given filters."""
  OR: [AuthorWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [AuthorWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  blog: BlogWhereInput
  comments_every: CommentWhereInput
  comments_some: CommentWhereInput
  comments_none: CommentWhereInput
}

input AuthorWhereUniqueInput {
  id: ID
}

type BatchPayload {
  """The number of nodes that have been affected by the Batch operation."""
  count: Long!
}

type Blog implements Node {
  id: ID!
  name: String
  owner: Author
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment!]
}

"""A connection to a list of items."""
type BlogConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [BlogEdge]!
  aggregate: AggregateBlog!
}

input BlogCreateInput {
  name: String
  owner: AuthorCreateOneInput
  comments: CommentCreateManyInput
}

input BlogCreateOneInput {
  create: BlogCreateInput
  connect: BlogWhereUniqueInput
}

"""An edge in a connection."""
type BlogEdge {
  """The item at the end of the edge."""
  node: Blog!

  """A cursor for use in pagination."""
  cursor: String!
}

enum BlogOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type BlogPreviousValues {
  id: ID!
  name: String
}

type BlogSubscriptionPayload {
  mutation: MutationType!
  node: Blog
  updatedFields: [String!]
  previousValues: BlogPreviousValues
}

input BlogSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [BlogSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [BlogSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [BlogSubscriptionWhereInput!]

  """The subscription event gets dispatched when it's listed in mutation_in"""
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: BlogWhereInput
}

input BlogUpdateDataInput {
  name: String
  owner: AuthorUpdateOneInput
  comments: CommentUpdateManyInput
}

input BlogUpdateInput {
  name: String
  owner: AuthorUpdateOneInput
  comments: CommentUpdateManyInput
}

input BlogUpdateManyMutationInput {
  name: String
}

input BlogUpdateOneInput {
  create: BlogCreateInput
  connect: BlogWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: BlogUpdateDataInput
  upsert: BlogUpsertNestedInput
}

input BlogUpsertNestedInput {
  update: BlogUpdateDataInput!
  create: BlogCreateInput!
}

input BlogWhereInput {
  """Logical AND on all given filters."""
  AND: [BlogWhereInput!]

  """Logical OR on all given filters."""
  OR: [BlogWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [BlogWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  owner: AuthorWhereInput
  comments_every: CommentWhereInput
  comments_some: CommentWhereInput
  comments_none: CommentWhereInput
}

input BlogWhereUniqueInput {
  id: ID
}

type Comment implements Node {
  id: ID!
  description: String
  blog: Blog
  owner: Author
}

"""A connection to a list of items."""
type CommentConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [CommentEdge]!
  aggregate: AggregateComment!
}

input CommentCreateInput {
  description: String
  blog: BlogCreateOneInput
  owner: AuthorCreateOneInput
}

input CommentCreateManyInput {
  create: [CommentCreateInput!]
  connect: [CommentWhereUniqueInput!]
}

"""An edge in a connection."""
type CommentEdge {
  """The item at the end of the edge."""
  node: Comment!

  """A cursor for use in pagination."""
  cursor: String!
}

enum CommentOrderByInput {
  id_ASC
  id_DESC
  description_ASC
  description_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type CommentPreviousValues {
  id: ID!
  description: String
}

input CommentScalarWhereInput {
  """Logical AND on all given filters."""
  AND: [CommentScalarWhereInput!]

  """Logical OR on all given filters."""
  OR: [CommentScalarWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [CommentScalarWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  description: String

  """All values that are not equal to given value."""
  description_not: String

  """All values that are contained in given list."""
  description_in: [String!]

  """All values that are not contained in given list."""
  description_not_in: [String!]

  """All values less than the given value."""
  description_lt: String

  """All values less than or equal the given value."""
  description_lte: String

  """All values greater than the given value."""
  description_gt: String

  """All values greater than or equal the given value."""
  description_gte: String

  """All values containing the given string."""
  description_contains: String

  """All values not containing the given string."""
  description_not_contains: String

  """All values starting with the given string."""
  description_starts_with: String

  """All values not starting with the given string."""
  description_not_starts_with: String

  """All values ending with the given string."""
  description_ends_with: String

  """All values not ending with the given string."""
  description_not_ends_with: String
}

type CommentSubscriptionPayload {
  mutation: MutationType!
  node: Comment
  updatedFields: [String!]
  previousValues: CommentPreviousValues
}

input CommentSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [CommentSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [CommentSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [CommentSubscriptionWhereInput!]

  """The subscription event gets dispatched when it's listed in mutation_in"""
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: CommentWhereInput
}

input CommentUpdateDataInput {
  description: String
  blog: BlogUpdateOneInput
  owner: AuthorUpdateOneInput
}

input CommentUpdateInput {
  description: String
  blog: BlogUpdateOneInput
  owner: AuthorUpdateOneInput
}

input CommentUpdateManyDataInput {
  description: String
}

input CommentUpdateManyInput {
  create: [CommentCreateInput!]
  connect: [CommentWhereUniqueInput!]
  set: [CommentWhereUniqueInput!]
  disconnect: [CommentWhereUniqueInput!]
  delete: [CommentWhereUniqueInput!]
  update: [CommentUpdateWithWhereUniqueNestedInput!]
  updateMany: [CommentUpdateManyWithWhereNestedInput!]
  deleteMany: [CommentScalarWhereInput!]
  upsert: [CommentUpsertWithWhereUniqueNestedInput!]
}

input CommentUpdateManyMutationInput {
  description: String
}

input CommentUpdateManyWithWhereNestedInput {
  where: CommentScalarWhereInput!
  data: CommentUpdateManyDataInput!
}

input CommentUpdateWithWhereUniqueNestedInput {
  where: CommentWhereUniqueInput!
  data: CommentUpdateDataInput!
}

input CommentUpsertWithWhereUniqueNestedInput {
  where: CommentWhereUniqueInput!
  update: CommentUpdateDataInput!
  create: CommentCreateInput!
}

input CommentWhereInput {
  """Logical AND on all given filters."""
  AND: [CommentWhereInput!]

  """Logical OR on all given filters."""
  OR: [CommentWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [CommentWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  description: String

  """All values that are not equal to given value."""
  description_not: String

  """All values that are contained in given list."""
  description_in: [String!]

  """All values that are not contained in given list."""
  description_not_in: [String!]

  """All values less than the given value."""
  description_lt: String

  """All values less than or equal the given value."""
  description_lte: String

  """All values greater than the given value."""
  description_gt: String

  """All values greater than or equal the given value."""
  description_gte: String

  """All values containing the given string."""
  description_contains: String

  """All values not containing the given string."""
  description_not_contains: String

  """All values starting with the given string."""
  description_starts_with: String

  """All values not starting with the given string."""
  description_not_starts_with: String

  """All values ending with the given string."""
  description_ends_with: String

  """All values not ending with the given string."""
  description_not_ends_with: String
  blog: BlogWhereInput
  owner: AuthorWhereInput
}

input CommentWhereUniqueInput {
  id: ID
}

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Mutation {
  createBlog(data: BlogCreateInput!): Blog!
  createComment(data: CommentCreateInput!): Comment!
  createAuthor(data: AuthorCreateInput!): Author!
  updateBlog(data: BlogUpdateInput!, where: BlogWhereUniqueInput!): Blog
  updateComment(data: CommentUpdateInput!, where: CommentWhereUniqueInput!): Comment
  updateAuthor(data: AuthorUpdateInput!, where: AuthorWhereUniqueInput!): Author
  deleteBlog(where: BlogWhereUniqueInput!): Blog
  deleteComment(where: CommentWhereUniqueInput!): Comment
  deleteAuthor(where: AuthorWhereUniqueInput!): Author
  upsertBlog(where: BlogWhereUniqueInput!, create: BlogCreateInput!, update: BlogUpdateInput!): Blog!
  upsertComment(where: CommentWhereUniqueInput!, create: CommentCreateInput!, update: CommentUpdateInput!): Comment!
  upsertAuthor(where: AuthorWhereUniqueInput!, create: AuthorCreateInput!, update: AuthorUpdateInput!): Author!
  updateManyBlogs(data: BlogUpdateManyMutationInput!, where: BlogWhereInput): BatchPayload!
  updateManyComments(data: CommentUpdateManyMutationInput!, where: CommentWhereInput): BatchPayload!
  updateManyAuthors(data: AuthorUpdateManyMutationInput!, where: AuthorWhereInput): BatchPayload!
  deleteManyBlogs(where: BlogWhereInput): BatchPayload!
  deleteManyComments(where: CommentWhereInput): BatchPayload!
  deleteManyAuthors(where: AuthorWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""An object with an ID"""
interface Node {
  """The id of the object."""
  id: ID!
}

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: String

  """When paginating forwards, the cursor to continue."""
  endCursor: String
}

type Query {
  blogs(where: BlogWhereInput, orderBy: BlogOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Blog]!
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment]!
  authors(where: AuthorWhereInput, orderBy: AuthorOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Author]!
  blog(where: BlogWhereUniqueInput!): Blog
  comment(where: CommentWhereUniqueInput!): Comment
  author(where: AuthorWhereUniqueInput!): Author
  blogsConnection(where: BlogWhereInput, orderBy: BlogOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): BlogConnection!
  commentsConnection(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CommentConnection!
  authorsConnection(where: AuthorWhereInput, orderBy: AuthorOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AuthorConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

type Subscription {
  blog(where: BlogSubscriptionWhereInput): BlogSubscriptionPayload
  comment(where: CommentSubscriptionWhereInput): CommentSubscriptionPayload
  author(where: AuthorSubscriptionWhereInput): AuthorSubscriptionPayload
}
`

export const Prisma = makePrismaBindingClass<BindingConstructor<Prisma>>({typeDefs})

/**
 * Types
*/

export type AuthorOrderByInput =   'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type BlogOrderByInput =   'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type CommentOrderByInput =   'id_ASC' |
  'id_DESC' |
  'description_ASC' |
  'description_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type MutationType =   'CREATED' |
  'UPDATED' |
  'DELETED'

export interface AuthorCreateInput {
  name: String
  blog?: BlogCreateOneInput | null
  comments?: CommentCreateManyInput | null
}

export interface AuthorCreateOneInput {
  create?: AuthorCreateInput | null
  connect?: AuthorWhereUniqueInput | null
}

export interface AuthorSubscriptionWhereInput {
  AND?: AuthorSubscriptionWhereInput[] | AuthorSubscriptionWhereInput | null
  OR?: AuthorSubscriptionWhereInput[] | AuthorSubscriptionWhereInput | null
  NOT?: AuthorSubscriptionWhereInput[] | AuthorSubscriptionWhereInput | null
  mutation_in?: MutationType[] | MutationType | null
  updatedFields_contains?: String | null
  updatedFields_contains_every?: String[] | String | null
  updatedFields_contains_some?: String[] | String | null
  node?: AuthorWhereInput | null
}

export interface AuthorUpdateDataInput {
  name?: String | null
  blog?: BlogUpdateOneInput | null
  comments?: CommentUpdateManyInput | null
}

export interface AuthorUpdateInput {
  name?: String | null
  blog?: BlogUpdateOneInput | null
  comments?: CommentUpdateManyInput | null
}

export interface AuthorUpdateManyMutationInput {
  name?: String | null
}

export interface AuthorUpdateOneInput {
  create?: AuthorCreateInput | null
  connect?: AuthorWhereUniqueInput | null
  disconnect?: Boolean | null
  delete?: Boolean | null
  update?: AuthorUpdateDataInput | null
  upsert?: AuthorUpsertNestedInput | null
}

export interface AuthorUpsertNestedInput {
  update: AuthorUpdateDataInput
  create: AuthorCreateInput
}

export interface AuthorWhereInput {
  AND?: AuthorWhereInput[] | AuthorWhereInput | null
  OR?: AuthorWhereInput[] | AuthorWhereInput | null
  NOT?: AuthorWhereInput[] | AuthorWhereInput | null
  id?: ID_Input | null
  id_not?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  id_not_in?: ID_Output[] | ID_Output | null
  id_lt?: ID_Input | null
  id_lte?: ID_Input | null
  id_gt?: ID_Input | null
  id_gte?: ID_Input | null
  id_contains?: ID_Input | null
  id_not_contains?: ID_Input | null
  id_starts_with?: ID_Input | null
  id_not_starts_with?: ID_Input | null
  id_ends_with?: ID_Input | null
  id_not_ends_with?: ID_Input | null
  name?: String | null
  name_not?: String | null
  name_in?: String[] | String | null
  name_not_in?: String[] | String | null
  name_lt?: String | null
  name_lte?: String | null
  name_gt?: String | null
  name_gte?: String | null
  name_contains?: String | null
  name_not_contains?: String | null
  name_starts_with?: String | null
  name_not_starts_with?: String | null
  name_ends_with?: String | null
  name_not_ends_with?: String | null
  blog?: BlogWhereInput | null
  comments_every?: CommentWhereInput | null
  comments_some?: CommentWhereInput | null
  comments_none?: CommentWhereInput | null
}

export interface AuthorWhereUniqueInput {
  id?: ID_Input | null
}

export interface BlogCreateInput {
  name?: String | null
  owner?: AuthorCreateOneInput | null
  comments?: CommentCreateManyInput | null
}

export interface BlogCreateOneInput {
  create?: BlogCreateInput | null
  connect?: BlogWhereUniqueInput | null
}

export interface BlogSubscriptionWhereInput {
  AND?: BlogSubscriptionWhereInput[] | BlogSubscriptionWhereInput | null
  OR?: BlogSubscriptionWhereInput[] | BlogSubscriptionWhereInput | null
  NOT?: BlogSubscriptionWhereInput[] | BlogSubscriptionWhereInput | null
  mutation_in?: MutationType[] | MutationType | null
  updatedFields_contains?: String | null
  updatedFields_contains_every?: String[] | String | null
  updatedFields_contains_some?: String[] | String | null
  node?: BlogWhereInput | null
}

export interface BlogUpdateDataInput {
  name?: String | null
  owner?: AuthorUpdateOneInput | null
  comments?: CommentUpdateManyInput | null
}

export interface BlogUpdateInput {
  name?: String | null
  owner?: AuthorUpdateOneInput | null
  comments?: CommentUpdateManyInput | null
}

export interface BlogUpdateManyMutationInput {
  name?: String | null
}

export interface BlogUpdateOneInput {
  create?: BlogCreateInput | null
  connect?: BlogWhereUniqueInput | null
  disconnect?: Boolean | null
  delete?: Boolean | null
  update?: BlogUpdateDataInput | null
  upsert?: BlogUpsertNestedInput | null
}

export interface BlogUpsertNestedInput {
  update: BlogUpdateDataInput
  create: BlogCreateInput
}

export interface BlogWhereInput {
  AND?: BlogWhereInput[] | BlogWhereInput | null
  OR?: BlogWhereInput[] | BlogWhereInput | null
  NOT?: BlogWhereInput[] | BlogWhereInput | null
  id?: ID_Input | null
  id_not?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  id_not_in?: ID_Output[] | ID_Output | null
  id_lt?: ID_Input | null
  id_lte?: ID_Input | null
  id_gt?: ID_Input | null
  id_gte?: ID_Input | null
  id_contains?: ID_Input | null
  id_not_contains?: ID_Input | null
  id_starts_with?: ID_Input | null
  id_not_starts_with?: ID_Input | null
  id_ends_with?: ID_Input | null
  id_not_ends_with?: ID_Input | null
  name?: String | null
  name_not?: String | null
  name_in?: String[] | String | null
  name_not_in?: String[] | String | null
  name_lt?: String | null
  name_lte?: String | null
  name_gt?: String | null
  name_gte?: String | null
  name_contains?: String | null
  name_not_contains?: String | null
  name_starts_with?: String | null
  name_not_starts_with?: String | null
  name_ends_with?: String | null
  name_not_ends_with?: String | null
  owner?: AuthorWhereInput | null
  comments_every?: CommentWhereInput | null
  comments_some?: CommentWhereInput | null
  comments_none?: CommentWhereInput | null
}

export interface BlogWhereUniqueInput {
  id?: ID_Input | null
}

export interface CommentCreateInput {
  description?: String | null
  blog?: BlogCreateOneInput | null
  owner?: AuthorCreateOneInput | null
}

export interface CommentCreateManyInput {
  create?: CommentCreateInput[] | CommentCreateInput | null
  connect?: CommentWhereUniqueInput[] | CommentWhereUniqueInput | null
}

export interface CommentScalarWhereInput {
  AND?: CommentScalarWhereInput[] | CommentScalarWhereInput | null
  OR?: CommentScalarWhereInput[] | CommentScalarWhereInput | null
  NOT?: CommentScalarWhereInput[] | CommentScalarWhereInput | null
  id?: ID_Input | null
  id_not?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  id_not_in?: ID_Output[] | ID_Output | null
  id_lt?: ID_Input | null
  id_lte?: ID_Input | null
  id_gt?: ID_Input | null
  id_gte?: ID_Input | null
  id_contains?: ID_Input | null
  id_not_contains?: ID_Input | null
  id_starts_with?: ID_Input | null
  id_not_starts_with?: ID_Input | null
  id_ends_with?: ID_Input | null
  id_not_ends_with?: ID_Input | null
  description?: String | null
  description_not?: String | null
  description_in?: String[] | String | null
  description_not_in?: String[] | String | null
  description_lt?: String | null
  description_lte?: String | null
  description_gt?: String | null
  description_gte?: String | null
  description_contains?: String | null
  description_not_contains?: String | null
  description_starts_with?: String | null
  description_not_starts_with?: String | null
  description_ends_with?: String | null
  description_not_ends_with?: String | null
}

export interface CommentSubscriptionWhereInput {
  AND?: CommentSubscriptionWhereInput[] | CommentSubscriptionWhereInput | null
  OR?: CommentSubscriptionWhereInput[] | CommentSubscriptionWhereInput | null
  NOT?: CommentSubscriptionWhereInput[] | CommentSubscriptionWhereInput | null
  mutation_in?: MutationType[] | MutationType | null
  updatedFields_contains?: String | null
  updatedFields_contains_every?: String[] | String | null
  updatedFields_contains_some?: String[] | String | null
  node?: CommentWhereInput | null
}

export interface CommentUpdateDataInput {
  description?: String | null
  blog?: BlogUpdateOneInput | null
  owner?: AuthorUpdateOneInput | null
}

export interface CommentUpdateInput {
  description?: String | null
  blog?: BlogUpdateOneInput | null
  owner?: AuthorUpdateOneInput | null
}

export interface CommentUpdateManyDataInput {
  description?: String | null
}

export interface CommentUpdateManyInput {
  create?: CommentCreateInput[] | CommentCreateInput | null
  connect?: CommentWhereUniqueInput[] | CommentWhereUniqueInput | null
  set?: CommentWhereUniqueInput[] | CommentWhereUniqueInput | null
  disconnect?: CommentWhereUniqueInput[] | CommentWhereUniqueInput | null
  delete?: CommentWhereUniqueInput[] | CommentWhereUniqueInput | null
  update?: CommentUpdateWithWhereUniqueNestedInput[] | CommentUpdateWithWhereUniqueNestedInput | null
  updateMany?: CommentUpdateManyWithWhereNestedInput[] | CommentUpdateManyWithWhereNestedInput | null
  deleteMany?: CommentScalarWhereInput[] | CommentScalarWhereInput | null
  upsert?: CommentUpsertWithWhereUniqueNestedInput[] | CommentUpsertWithWhereUniqueNestedInput | null
}

export interface CommentUpdateManyMutationInput {
  description?: String | null
}

export interface CommentUpdateManyWithWhereNestedInput {
  where: CommentScalarWhereInput
  data: CommentUpdateManyDataInput
}

export interface CommentUpdateWithWhereUniqueNestedInput {
  where: CommentWhereUniqueInput
  data: CommentUpdateDataInput
}

export interface CommentUpsertWithWhereUniqueNestedInput {
  where: CommentWhereUniqueInput
  update: CommentUpdateDataInput
  create: CommentCreateInput
}

export interface CommentWhereInput {
  AND?: CommentWhereInput[] | CommentWhereInput | null
  OR?: CommentWhereInput[] | CommentWhereInput | null
  NOT?: CommentWhereInput[] | CommentWhereInput | null
  id?: ID_Input | null
  id_not?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  id_not_in?: ID_Output[] | ID_Output | null
  id_lt?: ID_Input | null
  id_lte?: ID_Input | null
  id_gt?: ID_Input | null
  id_gte?: ID_Input | null
  id_contains?: ID_Input | null
  id_not_contains?: ID_Input | null
  id_starts_with?: ID_Input | null
  id_not_starts_with?: ID_Input | null
  id_ends_with?: ID_Input | null
  id_not_ends_with?: ID_Input | null
  description?: String | null
  description_not?: String | null
  description_in?: String[] | String | null
  description_not_in?: String[] | String | null
  description_lt?: String | null
  description_lte?: String | null
  description_gt?: String | null
  description_gte?: String | null
  description_contains?: String | null
  description_not_contains?: String | null
  description_starts_with?: String | null
  description_not_starts_with?: String | null
  description_ends_with?: String | null
  description_not_ends_with?: String | null
  blog?: BlogWhereInput | null
  owner?: AuthorWhereInput | null
}

export interface CommentWhereUniqueInput {
  id?: ID_Input | null
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

export interface AggregateAuthor {
  count: Int
}

export interface AggregateBlog {
  count: Int
}

export interface AggregateComment {
  count: Int
}

export interface Author extends Node {
  id: ID_Output
  name: String
  blog?: Blog | null
  comments?: Array<Comment> | null
}

/*
 * A connection to a list of items.

 */
export interface AuthorConnection {
  pageInfo: PageInfo
  edges: Array<AuthorEdge | null>
  aggregate: AggregateAuthor
}

/*
 * An edge in a connection.

 */
export interface AuthorEdge {
  node: Author
  cursor: String
}

export interface AuthorPreviousValues {
  id: ID_Output
  name: String
}

export interface AuthorSubscriptionPayload {
  mutation: MutationType
  node?: Author | null
  updatedFields?: Array<String> | null
  previousValues?: AuthorPreviousValues | null
}

export interface BatchPayload {
  count: Long
}

export interface Blog extends Node {
  id: ID_Output
  name?: String | null
  owner?: Author | null
  comments?: Array<Comment> | null
}

/*
 * A connection to a list of items.

 */
export interface BlogConnection {
  pageInfo: PageInfo
  edges: Array<BlogEdge | null>
  aggregate: AggregateBlog
}

/*
 * An edge in a connection.

 */
export interface BlogEdge {
  node: Blog
  cursor: String
}

export interface BlogPreviousValues {
  id: ID_Output
  name?: String | null
}

export interface BlogSubscriptionPayload {
  mutation: MutationType
  node?: Blog | null
  updatedFields?: Array<String> | null
  previousValues?: BlogPreviousValues | null
}

export interface Comment extends Node {
  id: ID_Output
  description?: String | null
  blog?: Blog | null
  owner?: Author | null
}

/*
 * A connection to a list of items.

 */
export interface CommentConnection {
  pageInfo: PageInfo
  edges: Array<CommentEdge | null>
  aggregate: AggregateComment
}

/*
 * An edge in a connection.

 */
export interface CommentEdge {
  node: Comment
  cursor: String
}

export interface CommentPreviousValues {
  id: ID_Output
  description?: String | null
}

export interface CommentSubscriptionPayload {
  mutation: MutationType
  node?: Comment | null
  updatedFields?: Array<String> | null
  previousValues?: CommentPreviousValues | null
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String | null
  endCursor?: String | null
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.
*/
export type Int = number

/*
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string