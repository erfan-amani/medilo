import { useState } from 'react';
import './PostImage.css';

const PostImage = (props) => {
  const [src, setSrc] = useState(props.src);
  const [hasError, setHasError] = useState(false);

  const errorHandler = () => {
    if (!hasError) {
      setHasError(true);
      setSrc(props.fallbackSrc);
    }
  };

  return (
    <img
      src={src}
      alt="post"
      loading="lazy"
      onError={errorHandler}
      className="image h-96 w-96 object-cover object-center"
    />
  );
};

export default PostImage;
