import { getJokesQuery } from "../../../graphql/Query";
import { getClient } from "../../../graphql/client";
import RelaxSpace from "./components/RelaxSpace";

export const dynamic = "force-dynamic";

interface Response {
  jokes: {
    id: number;
    content: string;
  };
}

export default async function page() {
  const data = await getClient().query<Response>({
    query: getJokesQuery,
  });

  return <RelaxSpace data={data} />;
}
