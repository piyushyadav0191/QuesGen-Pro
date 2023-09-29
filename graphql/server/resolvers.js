import jokes from "./jokes.js";
import { motivationalQuotes } from "./motivation.js";

const resolvers = {
  Query: {
    getJokes: () => jokes,
    getMotivation: () => motivationalQuotes,
  },
};

export default resolvers;
