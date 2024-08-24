import Image from "next/image";
import { Video } from "./types";

const VideoCard = ({ video }: { video: Video }) => {
  return (
    <div className="flex flex-col rounded-lg border border-gray-200 shadow-md">
      <div className="aspect-w-16 aspect-h-9">
        <Image
          width={1080}
          height={720}
          src={video.thumbnailUrl}
          alt={video.title}
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold">{video.title}</h2>
        <p className="text-gray-700">{video.description}</p>
      </div>
    </div>
  );
};

export default VideoCard;
