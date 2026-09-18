"use client";

import {
  VideoHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { getCachedVideoSrc } from "@/lib/videoCache";

type CachedVideoProps = Omit<VideoHTMLAttributes<HTMLVideoElement>, "src"> & {
  src: string;
};

/**
 * Video that prefers a Cache Storage hit on repeat visits,
 * while still streaming from the network on first load.
 */
export const CachedVideo = forwardRef<HTMLVideoElement, CachedVideoProps>(
  function CachedVideo({ src, ...props }, ref) {
    const innerRef = useRef<HTMLVideoElement>(null);
    const [resolvedSrc, setResolvedSrc] = useState(src);

    useImperativeHandle(ref, () => innerRef.current as HTMLVideoElement);

    useEffect(() => {
      let active = true;
      let revoke: (() => void) | undefined;

      setResolvedSrc(src);

      void getCachedVideoSrc(src).then((result) => {
        if (!active) {
          result.revoke?.();
          return;
        }
        revoke = result.revoke;
        if (result.fromCache) {
          setResolvedSrc(result.src);
        }
      });

      return () => {
        active = false;
        revoke?.();
      };
    }, [src]);

    useEffect(() => {
      const video = innerRef.current;
      if (!video || !props.autoPlay) return;
      video.load();
      void video.play().catch(() => {
        // Parent heroes also handle play / fallback.
      });
    }, [resolvedSrc, props.autoPlay]);

    return <video ref={innerRef} src={resolvedSrc} {...props} />;
  },
);
