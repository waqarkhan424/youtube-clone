import VideoPage from "./components/video/VideoPage";
import { fetch_getInitialVideos } from "./actions/fetch_getInitialVideos";

export const metadata = {
  title: "YouTube Clone",
  description: "Discover videos",
};

export default async function Page() {
  const initialVideos = await fetch_getInitialVideos();

  return (

    <div>
      <VideoPage initialVideos={initialVideos} />
    </div>
  );
}




