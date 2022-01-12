import algoliasearch from "algoliasearch";
import { RequestOptions } from "@algolia/transporter";
import { SearchOptions } from "@algolia/client-search";

export const clientHN = algoliasearch("UJ5WYC0L7X", "8ece23f8eb07cd25d40262a1764599b1");

export async function searchHN(query = '' , requestOptions?: RequestOptions & SearchOptions): Promise<any> {
  return clientHN.initIndex(`Item_production_ordered`).search(query, requestOptions);
}
