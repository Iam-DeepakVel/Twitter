import { ArrowPathIcon } from "@heroicons/react/24/outline";
import TweetBox from "./TweetBox";
import { Tweet as TweetType } from "../typings";
import { FC, useState } from "react";
import Tweet from "./Tweet";
import { fetchComments } from "@/utils/fetchComments";
import toast from "react-hot-toast";
import { fetchTweets } from "@/utils/fetchTweets";

interface Props {
  tweets: TweetType[];
}

const Feed: FC<Props> = ({ tweets: tweetProps }) => {
  const [tweets, setTweets] = useState<TweetType[]>(tweetProps);

  const handleRefresh = async () => {
    const refreshTweet = toast.loading("Refreshing...");
    const tweets = await fetchTweets();
    setTweets(tweets);
    toast.success("Feed Updated", {
      id: refreshTweet,
    });
  };

  return (
    <div className="col-span-7 lg:col-span-5 border-x max-h-screen overflow-scroll">
      <div className=" flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <ArrowPathIcon
          onClick={handleRefresh}
          className=" h-8 2-8 cursor-pointer text-twitterBlue transition-all duration-500 ease-out hover:rotate-180 active:scale-125 mr-5 mt-5"
        />
      </div>
      <div>
        <TweetBox setTweets={setTweets} />
      </div>
      <div>
        {tweets.map((tweet: TweetType) => {
          return <Tweet key={tweet._id} tweet={tweet} />;
        })}
      </div>
    </div>
  );
};

export default Feed;
