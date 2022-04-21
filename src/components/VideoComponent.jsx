import React, { useRef, useState, useEffect } from "react";
import { Component } from "react";
import tfc from "../video/tfc.mp4";

export class VideoComponent extends Component {
  videoContainer: HTMLDivElement;
  componentDidMount() {
    const video = document.createElement("video");
    video.autoplay = true;
    video.loop = true;
    video.muted = true; // fixes autoplay in chrome
    video.setAttribute("playsinline", "true"); // fixes autoplay in webkit (ie. mobile safari)

    const source = document.createElement("source");
    // source.src = "/path/to/your/video.mp4";
    source.src = `${tfc}`;
    source.type = "video/mp4";
    video.appendChild(source);

    this.videoContainer.appendChild(video);
  }
  render() {
    return (
      <div
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
    // check if user agent is safari and we have the ref to the container <div />
    if (isSafari() && videoParentRef.current) {
      // obtain reference to the video element
      const player = videoParentRef.current.children[0];

      // if the reference to video player has been obtained
      if (player) {
        // set the video attributes using javascript as per the
        // webkit Policy
        player.controls = false;
        player.playsinline = true;
        player.muted = true;
        player.setAttribute("muted", ""); // leave no stones unturned :)
        player.autoplay = true;

        // Let's wait for an event loop tick and be async.
        setTimeout(() => {
          // player.play() might return a promise but it's not guaranteed crossbrowser.
          const promise = player.play();
          // let's play safe to ensure that if we do have a promise
          if (promise.then) {
            promise
              .then(() => {})
              .catch(() => {
                // if promise fails, hide the video and fallback to <img> tag
                videoParentRef.current.style.display = "none";
                setShouldUseImage(true);
              });
          }
        }, 0);
      }
    }
  }, []);

  return shouldUseImage ? (
    <img src={tfc} alt="Muted Video" />
  ) : (
    <div
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
        <source src="${tfc}" type="video/mp4" />
        </video>`
      }}
    />
  );
}
