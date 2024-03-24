"use client";
import React, { FC, useEffect, useState } from "react";
import axios from "axios";

type Props = {
  videoUrl: string;
  title: string;
};

const VideoPlayer: FC<Props> = ({ videoUrl, title }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });
  useEffect(() => {
    axios
      .post(`http://localhost:5000/app/v1/getCourseUrlOtp`, {
        videoId: videoUrl,
      })
      .then((res) => setVideoData(res.data));
  }, [videoUrl]);
  return (
    <div className="" style={{ paddingTop: "41%", position: "relative" }}>
      {videoData.otp && videoData.playbackInfo !== "" && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData?.playbackInfo}&player=wOLX4w1031n3epdJ`}
          allowFullScreen
          allow="encrypted-media"
          style={{
            top: 0,
            left: 0,
            position: "absolute",
            width: "90%",
            height: "100%",
            border: 0,
          }}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
