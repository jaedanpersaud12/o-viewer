import { getClient } from "@/apollo/apollo";
import { Video } from "@/components/video-card/types";
import VideoCard from "@/components/video-card/video-card";
import SingleVideoPlayer from "@/components/video-player/video-player";
import { gql } from "@apollo/client";

const exampleVideos: Video[] = [
  {
    id: "1",
    title: "Example Video 1",
    description: "This is an example video",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
  },
  {
    id: "2",
    title: "Example Video 2",
    description: "This is another example video",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
  },
];

export default async function Home() {
  const client = getClient();
  const { data } = await client.query({
    query: gql`
      query GetTest {
        test {
          id
          test
        }
      }
    `,
  });

  console.log(data);
  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold">Example Videos</h1>
      {/* spacer */}
      <div className="h-6"></div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {exampleVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
      <SingleVideoPlayer />
    </main>
  );
}
