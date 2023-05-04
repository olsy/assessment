import styled from 'styled-components';

export const Row = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid lightgrey;
  border-radius: 5px;

  &:nth-of-type(n + 2) {
    margin-top: 20px;
  }
`;
export const RowTitle = styled.div`
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
`;
export const List = styled.div`
  display: flex;
  align-items: stretch;
  margin: 0 -10px;
`;
