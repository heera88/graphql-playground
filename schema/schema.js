
const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } = graphql;

const SongType = new GraphQLObjectType({
  name: 'Song',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
    artist: {
      type: ArtistType,
      resolve(parent, args) { }
    }
  })
});

const ArtistType = new GraphQLObjectType({
  name: 'Artist',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    songs: {
      type: new GraphQLList(SongType),
      resolve(parent, args) {

      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    song: {
      type: SongType,
      args: { title: { type: GraphQLString } },
      resolve(parent, args) {
        //get data from db or other sources
      }
    },
    artist: {
      type: ArtistType,
      args: { name: { type: GraphQLString } },
      resolve(parent, args) {

      }
    },
    songs: {
      type: new GraphQLList(SongType),
      resolve(parent, args) { }
    },
    artists: {
      type: new GraphQLList(ArtistType),
      resolve(parent, args) { }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});