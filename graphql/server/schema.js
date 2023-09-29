const typeDefs = `
type Joke {
    id: Int
    content: String
}
type Motivation {
    id: Int
    content: String
}

type Query {
    getJokes: [Joke]
    getMotivation: [Motivation]
}
`;

export default typeDefs;
