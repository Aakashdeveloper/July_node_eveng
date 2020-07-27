const graphql = require('graphql');
const _ = require('lodash');
const axios = require('axios');

const{
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema
}= graphql;



const MovieType = new GraphQLObjectType({
    name:'Movie',
    fields:{
        id:{type: GraphQLInt},
        name:{type: GraphQLString},
        language:{type: GraphQLString},
        type:{type: GraphQLString},
        rate:{type: GraphQLInt},
        imageUrl:{type: GraphQLString},
    }
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        movie:{
            type:MovieType,
            args:{id:{type:GraphQLInt}},
            resolve(parentValue,args){
                return axios.get(`http://localhost:8900/products/${args.id}`)
                .then((res) =>  res.data)
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addMovies:{
            type:MovieType,
            args:{
                id:{type: GraphQLInt},
                name:{type: GraphQLString},
                language:{type: GraphQLString},
                type:{type: GraphQLString},
                rate:{type: GraphQLInt},
                imageUrl:{type: GraphQLString}
            },
            resolve(parentValue,{id,name,language,type,rate,imageUrl}){
                return axios.post(`http://localhost:8900/products`,{id,name,language,type,rate,imageUrl})
                .then((res) => res.data)
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
})