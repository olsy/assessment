import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 200px;
  //height: 60px;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  background: white;
  margin: 0 10px;

  img {
    width: 100%;
    border-radius: 5px;
  }
`;

export const CardType = styled.div`
  font-size: 0.8em;
  color: lightgrey;
`;

export const Text = styled.div`
  margin-top: 10px;
`;
