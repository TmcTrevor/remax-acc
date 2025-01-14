// pages/api/videos.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const CHANNEL_ID = "UCCtSOJ3FDX-C3D5BJ9fJmgw"; // Replace with your channel ID
const RSS_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get(RSS_FEED_URL);
    const parser = new DOMParser();
    const xml = parser.parseFromString(response.data, "application/xml");

    const entries = Array.from(xml.querySelectorAll("entry"));
    const videos = entries.map((entry) => ({
      id: entry.querySelector("yt\\:videoId")?.textContent || "",
      title: entry.querySelector("title")?.textContent || "",
      published: entry.querySelector("published")?.textContent || "",
      thumbnail: `https://i.ytimg.com/vi/${
        entry.querySelector("yt\\:videoId")?.textContent || ""
      }/hqdefault.jpg`,
    }));

    res.status(200).json(videos);
  } catch (error) {
    console.error("Failed to fetch videos:", error);
    res.status(500).json({ error: "Failed to load videos" });
  }
}
