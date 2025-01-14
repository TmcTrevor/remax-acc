import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";

const CHANNEL_ID = "UCCtSOJ3FDX-C3D5BJ9fJmgw"; // Replace with actual channel ID
const RSS_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

type Entry = {
  "yt:videoId": string;
  title: string;
  published: string;
  thumbnail: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get(RSS_FEED_URL);
    const parser = new XMLParser();
    const parsedData = parser.parse(response.data);

    const entries = parsedData.feed.entry || [];
    const videoList = entries.map((entry: Entry) => ({
      id: entry["yt:videoId"],
      title: entry.title,
      published: entry.published,
      thumbnail: `https://i.ytimg.com/vi/${entry["yt:videoId"]}/hqdefault.jpg`,
    }));

    res.status(200).json(videoList);
  } catch (error) {
    console.error("Failed to fetch videos:", error);
    res.status(500).json({ error: "Failed to load videos" });
  }
}
