import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ICard } from '../../types/cards';
import { Container, CardType, Text } from './styled';
import Image from '../Image';

interface Props {
  data: ICard;
  index: number;
  openModal: (data: ICard) => void;
}
const Component: React.FC<Props> = ({ data, index, openModal }) => {
  return (
    <Draggable draggableId={data.type} index={index}>
      {provided => {
        return (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            // @ts-ignore
            ref={provided.innerRef}
            onClick={() => openModal(data)}
          >
            <Image src={data.image} alt={data.title} />
            <Text>
              <div>{data.title}</div>
              <CardType>{data.type}</CardType>
            </Text>
          </Container>
        );
      }}
    </Draggable>
  );
};

export default Component;
