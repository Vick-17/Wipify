import React from "react";
import YouTube from "react-youtube";
import "../styles/components/NewVideo.css";

const NewVideo = () => {
  const videoUrl = "https://www.youtube.com/watch?v=mxpYHW-M_Ac";
  const videoId = extractVideoId(videoUrl);

  function extractVideoId(url) {
    const videoIdRegex = /[?&]v=([^&]+)/;
    const match = url.match(videoIdRegex);
    return match ? match[1] : null;
  }

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };
  return (
    <div className="video-container">
      <div className="title-dance">
        <h5>Vidéos présentées</h5>
      </div>
      <div className="newVideo">
        <div className="video">
          <YouTube videoId={videoId} opts={opts} />
        </div>
        <div className="video">
          <YouTube videoId={videoId} opts={opts} />
        </div>
        <div className="video">
          <YouTube videoId={videoId} opts={opts} />
        </div>
        <div className="video">
          <YouTube videoId={videoId} opts={opts} />
        </div>
        <div className="video">
          <YouTube videoId={videoId} opts={opts} />
        </div>
        <div className="video">
          <YouTube videoId={videoId} opts={opts} />
        </div>
      </div>
    </div>
  );
};

export default NewVideo;
