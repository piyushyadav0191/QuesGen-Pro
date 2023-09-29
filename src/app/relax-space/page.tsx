import RelaxSpace from "./components/RelaxSpace";
import jokes from "./includes/jokes";
import { motivationalQuotes } from "./includes/motivation";

export default async function page() {
  return <RelaxSpace jokes={jokes} motivation={motivationalQuotes} />;
}
