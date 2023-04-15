import { Comment, CommentBody, Tweet as TweetType } from "@/typings";
import { useState, useEffect } from "react";
import TimeAgo from "react-timeago";
import {
  ArrowUpTrayIcon,
  ArrowsRightLeftIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { fetchComments } from "@/utils/fetchComments";
import { MouseEvent } from "react";
import toast from "react-hot-toast";

interface Props {
  tweet: TweetType;
}

const Tweet = ({ tweet }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);
  const [input, setInput] = useState<string>("");
  const { data: session } = useSession();

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id);
    setComments(comments);
  };

  useEffect(() => {
    refreshComments();
  }, []);

  const handleSubmit = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    const commentToast = toast.loading("Posting comment...");
    const comment: CommentBody = {
      comment: input,
      tweetId: tweet._id,
      username: session?.user?.name || "Unknown User",
      profileImg:
        session?.user?.image ||
        "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg",
    };
    const result = await fetch("/api/addComment", {
      body: JSON.stringify(comment),
      method: "POST",
    });
    toast.success("Comment Posted!", {
      id: commentToast,
    });
    // Making comment box empty
    setInput("");
    // Closing comment box
    setIsCommentBoxOpen(false);
    // Fetching updated comments
    refreshComments();
  };

  return (
    <div className="flex flex-col space-x-3 border-y p-5 border-gray-100">
      <div className="flex space-x-3">
        <img
          className=" h-10 w-10 rounded-full object-cover"
          src={tweet.profileImg}
          alt=""
        />
        <div>
          <div className=" flex items-center space-x-1">
            <p className=" mr-1 font-bold">{tweet.username}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{tweet.username.replace(/\s+/g, "".toLowerCase())} ·
            </p>
            <TimeAgo
              className=" text-sm text-gray-500"
              date={tweet._createdAt}
            />
          </div>
          <p>{tweet.text}</p>
          {tweet.image && (
            <img
              src={tweet.image}
              alt=""
              className=" m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm"
            />
          )}
        </div>
      </div>

      <div className=" flex justify-between mt-5">
        <div className=" flex cursor-pointer items-center space-x-3 text-gray-400">
          <ChatBubbleLeftRightIcon
            onClick={() =>
              session && setIsCommentBoxOpen((current) => !current)
            }
            className=" h-5 w-5"
          />
          <p>{comments.length}</p>
        </div>
        <div className=" flex cursor-pointer items-center space-x-3 text-gray-400">
          <ArrowsRightLeftIcon className=" h-5 w-5" />
        </div>
        <div className=" flex cursor-pointer items-center space-x-3 text-gray-400">
          <HeartIcon className=" h-5 w-5" />
        </div>
        <div className=" flex cursor-pointer items-center space-x-3 text-gray-400">
          <ArrowUpTrayIcon className=" h-5 w-5" />
        </div>
      </div>

      {isCommentBoxOpen && (
        <form className="mt-3 flex space-x-3">
          <input
            type="text"
            value={input}
            className="flex-1 rounded-lg bg-gray-100 p-2 outline-none"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a comment..."
          />
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!input}
            className=" text-twitterBlue disabled:text-gray-200"
          >
            Post
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className=" my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5">
          {comments?.map((comment: Comment) => (
            <div key={comment._id} className=" relative flex space-x-2">
              <hr className="absolute left-5 top-10 h-8 border-x border-twitterBlue opacity-30" />
              <img
                src={comment.profileImg}
                alt=""
                className="mt-2 h-7 w-7 object-cover rounded-full"
              />
              <div>
                <div className=" flex items-center space-x-1">
                  <p className="mr-1 font-bold">{comment.username}</p>
                  <p className="hidden text-sm text-gray-500 lg:inline">
                    @{comment.username} ·
                  </p>
                  <TimeAgo
                    className="text-sm text-gray-500"
                    date={comment._createdAt}
                  />
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tweet;
