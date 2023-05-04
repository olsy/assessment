import { ICard } from '../../types/cards';
import { Row, RowTitle, List } from './styled';
import { Droppable } from 'react-beautiful-dnd';
import Card from '../Card';
import React from 'react';

interface Props {
  row: any;
  cards: ICard[];
}

const Component = ({ row, cards }: Props) => {
  return (
    <Row key={row.id}>
      <RowTitle>{row.title}</RowTitle>
      <Droppable droppableId={row.id} direction="horizontal">
        {provided => (
          <List ref={provided.innerRef} {...provided.droppableProps}>
            {cards.map((card: ICard, index: number) => (
              <Card key={card.type} data={card} index={index} />
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </Row>
  );
};

export default Component;
