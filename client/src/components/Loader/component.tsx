import React from 'react';
import { Container, Loader } from './styled';
import { ReactComponent as Icon } from '../../assets/loader.svg';

const Component = () => {
  return (
    <Container>
      <Loader>
        <Icon />
      </Loader>
    </Container>
  );
};

export default Component;
