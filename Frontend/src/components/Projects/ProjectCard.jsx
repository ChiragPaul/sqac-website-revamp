import React, { forwardRef, useEffect, useRef, useState } from 'react';

const ProjectCard = forwardRef(({ caption, site, src, type, index, total, progress, yOffset, size }, ref) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // A random string syntax similar to the Astro logic '[a-z][0-9]{3}-index-total'
  const key = `${Math.random().toString(36).slice(2, 6)}-${String(index).padStart(4, '0')}/${String(total).padStart(2, '0')}`;

  // Handle playing/pausing video when in view
  useEffect(() => {
    if (type === 'video' && videoRef.current) {
      if (Math.abs(progress) < 1) {
        if (!isPlaying) {
          videoRef.current.play().catch(e => console.log("Video auto-play blocked:", e));
          setIsPlaying(true);
        }
      } else {
        if (isPlaying) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      }
    }
  }, [progress, isPlaying, type]);

  const handleClick = (e) => {
    if (site.includes('#')) {
      e.preventDefault();
    }
  };

  return (
    <div 
      ref={ref}
      className="a-work"
      progress={progress}
      style={{
        '--progress': progress,
        '--y': yOffset,
        '--size': size,
      }}
    >
      <div className="a__inner">
        <a href={site} target="_blank" rel="noreferrer" onClick={handleClick}>
          {type === 'video' ? (
            <video
              ref={videoRef}
              src={src}
              className="a__video"
              loop
              muted
              playsInline
              width="1082"
              height="636"
            />
          ) : (
            <img
              src={src}
              className="a__image"
              alt={caption}
              loading="lazy"
              width="1082"
              height="636"
            />
          )}

          <div className="a__caption">
            <div className="a__caption__text">{caption}</div>
            <div className="a__caption__key">#{key}</div>
          </div>
        </a>
      </div>
    </div>
  );
});

export default ProjectCard;
