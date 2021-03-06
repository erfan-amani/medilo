import { useState } from 'react';

const PostImage = ({ src, fallbackSrc, className }) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const errorHandler = () => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(fallbackSrc);
    }
  };

  const classes = `image object-cover object-center ${className}`;

  return (
    <img
      src={imageSrc}
      alt=""
      loading="lazy"
      onError={errorHandler}
      className={classes}
    />
  );
};

export default PostImage;
