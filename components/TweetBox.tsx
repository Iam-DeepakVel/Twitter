/* eslint-disable @next/next/no-img-element */
import {
  CalendarIcon,
  FaceSmileIcon,
  MapPinIcon,
  PhotoIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/outline";
import { useState, useRef, MouseEvent } from "react";
import { useSession } from "next-auth/react";
import { Tweet as TweetType, TweetBody } from "@/typings";
import { Dispatch, SetStateAction } from "react";
import { fetchTweets } from "@/utils/fetchTweets";
import toast from "react-hot-toast";

interface Props {
  setTweets: Dispatch<SetStateAction<TweetType[]>>;
}

const TweetBox = ({ setTweets }: Props) => {
  const [input, setInput] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [imageUrlBoxOpen, setImageUrlBoxOpen] = useState(false);
  const { data: session } = useSession();
  const imageInputRef = useRef<HTMLInputElement>(null);

  const addImageToTweet = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (!imageInputRef.current?.value) return;
    setImage(imageInputRef.current.value);
    imageInputRef.current.value = "";
    setImageUrlBoxOpen(false);
  };

  const postTweet = async () => {
    const tweetToast = toast.loading("Launching tweet...");
    const tweetInfo: TweetBody = {
      text: input,
      username: session?.user?.name || "Unknown User",
      profileImg:
        session?.user?.image ||
        "https://img.freepik.com/premium-vector/man-with-glasses-blue-shirt-with-red-circle-him_816425-2973.jpg?size=626&ext=jpg&ga=GA1.1.2028080490.1681454580&semt=ais",
      image: image,
    };
    const result = await fetch("/api/addTweet", {
      body: JSON.stringify(tweetInfo),
      method: "POST",
    });
    await result.json();
    const newTweets = await fetchTweets();
    setTweets(newTweets);
    toast("Tweet posted", {
      id: tweetToast,
      icon: "🚀",
    });
  };

  const handleSubmit = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    postTweet();
    setInput("");
    setImage("");
    setImageUrlBoxOpen(false);
  };

  return (
    <div className=" flex space-x-2 p-5">
      <img
        className="h-14 w-14 rounded-full object-cover mt-4"
        src={
          session?.user?.image ||
          "https://img.freepik.com/premium-vector/man-with-glasses-blue-shirt-with-red-circle-him_816425-2973.jpg?size=626&ext=jpg&ga=GA1.1.2028080490.1681454580&semt=ais"
        }
        alt="profile"
      />
      <div className=" flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="What's Happening?"
            className="h-24 outline-none w-full text-xl placeholder:text-xl"
          />
          <div className=" flex items-center">
            <div className=" flex space-x-2 text-twitterBlue flex-1">
              <PhotoIcon
                onClick={() => setImageUrlBoxOpen(!imageUrlBoxOpen)}
                className=" h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              />
              <MagnifyingGlassCircleIcon className=" h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              <FaceSmileIcon className=" h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              <CalendarIcon className=" h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              <MapPinIcon className=" h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={!input || !session}
              className=" bg-twitterBlue px-5 py-2 font-bold text-white rounded-full disabled:opacity-40"
            >
              Tweet
            </button>
          </div>
          {imageUrlBoxOpen && (
            <div className=" mt-5 flex  rounded-lg bg-twitterBlue/80 py-2 px-4">
              <input
                type="text"
                ref={imageInputRef}
                placeholder="Enter Image URL"
                className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
              />
              <button
                onClick={addImageToTweet}
                type="submit"
                className=" font-bold text-white"
              >
                Add Image
              </button>
            </div>
          )}
          {image && (
            <img
              src={image}
              className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
            ></img>
          )}
        </form>
      </div>
    </div>
  );
};

export default TweetBox;
