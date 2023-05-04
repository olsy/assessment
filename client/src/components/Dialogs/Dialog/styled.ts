import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  :last-of-type {
    background: rgba(0, 0, 0, 0.6);
  }
`;

export const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Content = styled.div`
  position: relative;
  width: 700px;
  background: white;
  border-radius: 5px;
  max-height: 80vh;
  padding: 20px;
`;

export const Title = styled.div`
  margin-bottom: 20px;
  font-size: 1.6em;
  font-weight: 600;
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  z-index: 1;

  svg {
    width: 20px;
    height: 20px;
  }
`;
