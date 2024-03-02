import "./youtubeVideo.scss";
import { useEffect, useRef } from "react";

const YoutubeVideo = ({ YTVideoID }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    // Check if the YouTube API script is already loaded
    if (window.YT && typeof window.YT.Player === "function") {
      initializeYouTubePlayer();
    } else {
      // Load the YouTube API script
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);

      // Define the callback before loading the script
      window.onYouTubeIframeAPIReady = initializeYouTubePlayer;

      // Cleanup on component unmount
      return () => {
        document.head.removeChild(tag);
        delete window.onYouTubeIframeAPIReady;
      };
    }
  }, [YTVideoID]);

  const initializeYouTubePlayer = () => {
    // Create a new YouTube player
    const player = new window.YT.Player(playerRef.current, {
      videoId: YTVideoID,
      events: {
        onReady: onPlayerReady,
      },
    });
  };

  const onPlayerReady = (event) => {
    // Default volume when playing the video -> from 0 to 100
    event.target.setVolume(5);
  };
  return (
    <>
      <div ref={playerRef}></div>
    </>
  );
}

export default YoutubeVideo;