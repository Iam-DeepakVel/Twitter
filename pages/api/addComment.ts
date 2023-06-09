import type { NextApiRequest, NextApiResponse } from "next";
import { CommentBody } from "@/typings";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const comment: CommentBody = JSON.parse(req.body);
  const mutations = {
    mutations: [
      {
        create: {
          _type: "comment",
          comment: comment.comment,
          username: comment.username,
          profileImg: comment.profileImg,
          tweet: {
            _type: "reference",
            _ref: comment.tweetId,
          },
        },
      },
    ],
  };

  const apiEndPoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2022-03-10/data/mutate/production`;

  const result = await fetch(apiEndPoint, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.SANITY_TOKEN}`,
    },
    body: JSON.stringify(mutations),
    method: "POST",
  });
  await result.json();
  res.status(200).json({ message: "Data added successfully" });
}
