# cyrex
A light Express/GraphQL Boilerplate. Made with ES6+.


## Getting started
First, simply clone the project wherever you want to create your app:
```
git clone git@github.com:codeinbrain/cyrex.git your-app
cd your-app
```
Cyrex uses mongodb as database provider so make sure you have an instance of mongodb running before starting the server.
You'll also need nodemon to run the development server.
```
npm install -g nodemon
```
Once everything is installed, run the following commands:
```
yarn install
yarn run dev
```
If no error occurred, you can go to [http://localhost:8000/graphql](http://localhost:8000/graphql).

## What is included?
With a fresh install of Cyrex, you have:
- Basic user signup (email/password)
- Authentication (OAuth)
- Role Based Access Control

## Configuration
// TODO

## GraphQL
### Types
#### In file tree
GraphQL types are located in `app/graphql/types`. To create a new type, just create a file in this directory. If you want it to
take advantage of the ES6 import notation, you can export it in the `index.js` file. Another tip is to keep a clean notation.
In Cyrex, I decided to name my file like this `<TypeName>TypeQL.js`. You are free to use any other naming "convention" but it is
a good way to keep a clean file tree.
### File structure
A type is a [GraphQLObjectType](https://graphql.org/graphql-js/type/#graphqlobjecttype) object. In the following example, we use
custom type `GraphQLModelObjectType` which is just the `GraphQLObjectType` with three more fields: `id`, `createdAt` and `updatedAt`.
If you don't need/want these fields, simply switch `GraphQLModelObjectType` to `GraphQLObjectType`.
```javascript
import { GraphQLString } from 'graphql';
import { GraphQLModelObjectType } from 'app/graphql/tools';

export default new GraphQLModelObjectType({
  name: 'Article',
  fields: {
    title: {
      type: GraphQLString
    },
    slug: {
      type: GraphQLString
    },
    ...
  }
});
```


### Resolvers
#### In file tree
All the resolvers are located in `app/graphql/resolvers`. When creating a resolver file either in `mutations` or `queries`,
the resolver will be reachable using the file's name. For example, let's say you want to create a `createArticle` mutation.
Create a `createArticle.js` file into the `mutation` directory. That way, you will be able to call the following query:
```
mutation {
  createArticle(...) {
    ...
  }
}
```
### File structure
A resolver is a basic javascript object that must contain some fields.
```javascript
// createArticle.js
import { ArticleType } from 'app/graphql/types';
import { CreateArticleInput } from 'app/graphql/inputs';

export default {
  type: ArticleType,                      // required
  args: {                                 // optional
    input: {
      type: CreateArticleInput
    }
  },
  resolve: async (root, args, ctx) => {   // required
    const article = await Article.create({ ...args.input });
    return article;
  }
}
```

## Models
// TODO
