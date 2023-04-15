import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  EnvelopeIcon,
  BookmarkIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/outline";
import twiiterLogo from "@/assets/twitter.png";
import Image from "next/image";
import SidebarRow from "./SidebarRow";
import { signIn, signOut, useSession } from "next-auth/react";

const Sidebar = () => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col col-span-2 items-center px-4 md:items-start">
      <Image className="w-10 m-3" src={twiiterLogo} alt="twitter" />
      <SidebarRow Icon={HomeIcon} title="Home" />
      <SidebarRow Icon={HashtagIcon} title="Explore" />
      <SidebarRow Icon={BellIcon} title="Notifications" />
      <SidebarRow Icon={EnvelopeIcon} title="Messages" />
      <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
      <SidebarRow Icon={RectangleStackIcon} title="Lists" />
      <SidebarRow
        Icon={UserIcon}
        title={session ? "Sign Out" : "Sign In"}
        onClick={session ? signOut : signIn}
      />
      <SidebarRow Icon={EllipsisHorizontalCircleIcon} title="More" />
    </div>
  );
};

export default Sidebar;
