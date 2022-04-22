import React, { useRef, useState, useEffect } from "react";
import { Component } from "react";
import tfc from "../video/tfc.mp4";

const mainVideo = tfc;
export class VideoComponent extends Component {
  videoContainer: HTMLDivElement;
  componentDidMount() {
    const video = document.createElement("video");
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.setAttribute("playsinline", "true");

    const source = document.createElement("source");
    source.src = `${mainVideo}`;
    source.type = "video/mp4";
    video.appendChild(source);

    this.videoContainer.appendChild(video);
  }
  render() {
    return (
      <div
        className="main"
        ref={(ref) => {
          this.videoContainer = ref;
        }}
      />
    );
  }
}

const isSafari = () => {
  const ua = navigator.userAgent.toLowerCase();
  return ua.indexOf("safari") > -1 && ua.indexOf("chrome") < 0;
};

export function VideoComponentTwo() {
  const videoParentRef = useRef();
  const [shouldUseImage, setShouldUseImage] = useState(false);
  useEffect(() => {
    if (isSafari() && videoParentRef.current) {
      const player = videoParentRef.current.children[0];
      if (player) {
        player.controls = false;
        player.playsinline = true;
        player.muted = true;
        player.setAttribute("muted", "");
        player.autoplay = true;
        setTimeout(() => {
          const promise = player.play();
          if (promise.then) {
            promise
              .then(() => {})
              .catch(() => {
                videoParentRef.current.style.display = "none";
                setShouldUseImage(true);
              });
          }
        }, 0);
      }
    }
  }, []);

  return shouldUseImage ? (
    <img src={mainVideo} alt="Muted Video" />
  ) : (
    <div
      className="main"
      ref={videoParentRef}
      dangerouslySetInnerHTML={{
        __html: `
        <video
          loop
          muted
          autoplay
          playsinline
          preload="metadata"
        >
        <source src="${mainVideo}" type="video/mp4" />
        </video>`,
      }}
    />
  );
}
