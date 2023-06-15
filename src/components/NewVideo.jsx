import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import "../styles/components/NewVideo.css";

const NewVideo = () => {
  const [videoUrls, setVideoUrl] = useState([]);

  

  const extractVideoId = (url) => {
    const videoIdRegex = /[?&]v=([^&]+)/;
    const match = url.match(videoIdRegex);
    return match ? match[1] : null;
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  useEffect(() => {
    async function fetchVideoUrl() {
      try {
        const response = await fetch(
          "https://apispringboot-production.up.railway.app/youtubeVideo"
        );
        const data = await response.json();
  
        // Tri des articles par ordre décroissant de date
        const sortedArticle = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        const latestArticle = sortedArticle.slice(0, 10);
        const videoIds = latestArticle.map((video) => extractVideoId(video.url));
  
        setVideoUrl(videoIds);
      } catch (error) {
        console.error("Error fetching video games:", error);
      }
    }
    fetchVideoUrl();
  }, []);
  return (
    <div className="video-container">
      <div className="title-dance">
        <h5>Vidéos présentées</h5>
      </div>
      <div className="newVideo">
        <div className="newVideo">
          {videoUrls.map((videoId) => (
            <div className="video" key={videoId}>
              <YouTube videoId={videoId} opts={opts} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewVideo;
