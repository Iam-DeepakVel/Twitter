import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../sanity";
import { groq } from "next-sanity";
import { Tweet } from "@/typings";

type Data = {
  tweets: Tweet[];
};

const feedQuery = groq`
*[_type=="tweet" && !blockTweet]{
  _id,
  ...
} | order(_createdAt desc)
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const tweets: Tweet[] = await sanityClient.fetch(feedQuery);
  res.status(200).json({ tweets });
}
