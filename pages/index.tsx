import { Inter } from "next/font/google";
import Head from "next/head";
import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";
import Widget from "@/components/Widget";
import { GetServerSideProps } from "next";
import { fetchTweets } from "@/utils/fetchTweets";
import { Tweet } from "@/typings";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  tweets: Tweet[];
}

export default function Home({ tweets }: Props) {
  return (
    <div className=" lg:max-w-6xl mx-auto max-h-screen overflow-hidden">
      <Head>
        <title>Twitter</title>
        <meta name="description" content="Twitter Clone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/twitter.png" />
      </Head>
      <Toaster />
      <main className="grid grid-cols-9">
        <Sidebar />
        <Feed tweets={tweets} />
        <Widget />
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const tweets = await fetchTweets();
  return {
    props: {
      tweets,
    },
  };
};
