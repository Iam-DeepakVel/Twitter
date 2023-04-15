import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { TwitterTimelineEmbed } from "react-twitter-embed";

const Widget = () => {
  return (
    <div className=" px-2 mt-2 col-span-2 lg:inline hidden">
      <div className=" flex items-center space-x-2 bg-gray-100 p-3 rounded-full mt-2 mb-4">
        <MagnifyingGlassIcon className=" w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search Twitter"
          className=" bg-transparent outline-none flex-1"
        />
      </div>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="iam_deepakvel"
        options={{ height: 1000 }}
      />
    </div>
  );
};

export default Widget;
