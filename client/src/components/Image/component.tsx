import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container, Loader } from './styled';
import { ReactComponent as Icon } from '../../assets/loader.svg';

interface Props {
  src?: string;
  alt?: string;
}

const Component = ({ src, alt }: Props) => {
  const el = useRef<HTMLImageElement>(null);
  const [loading, setLoading] = useState(true);

  const onImageLoaded = useCallback(() => setLoading(false), []);

  useEffect(() => {
    const img = el.current;

    if (img) {
      img.addEventListener('load', onImageLoaded);
      return () => img.removeEventListener('load', onImageLoaded);
    }
  }, [el]);

  return (
    <Container>
      {loading ? (
        <Loader>
          <Icon />
        </Loader>
      ) : null}
      <img ref={el} src={src} alt={alt} />
    </Container>
  );
};

export default Component;
