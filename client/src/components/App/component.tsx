import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { ICard, IDataWithCards, RowID } from '../../types/cards';
import { Container } from './styled';
import Row from '../Row';
import Dialogs from '../Dialogs';
import useDragDrop from '../../hooks/useDragDrop';
import Loader from '../Loader';
import moment from 'moment';

const INTERVAL = 5000;

interface Props {
  config?: IDataWithCards;
  saveLoading?: boolean;
  cardsLoading?: boolean;
  fetchCards?: () => void;
  saveData?: (data: IDataWithCards) => void;
  lastTimeSaved?: string;
}

const Component = ({
  config,
  saveLoading,
  cardsLoading,
  fetchCards,
  saveData,
  lastTimeSaved,
}: Props) => {
  const [state, setState] = useState<IDataWithCards>();

  useEffect(() => {
    fetchCards?.();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => state && saveData?.(state), INTERVAL);

    return () => clearInterval(interval);
  }, [state, saveData]);

  useEffect(() => {
    setState(config);
  }, [config]);

  const { handleDragEnd } = useDragDrop({ state, setState });

  if (!state) {
    return <div>Loading</div>;
  }

  if (cardsLoading) {
    return <div>Loading cards...</div>;
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Container>
          {state.rowOrder.map((rowId: RowID) => {
            const row = state.rows[rowId];
            const cards = row.cards
              .map((c: string) => state.cards[c])
              .filter((c: ICard) => !!c);
            return <Row key={row.id} row={row} cards={cards} />;
          })}
          {lastTimeSaved ? (
            <p>
              Last time saved:{' '}
              {moment(lastTimeSaved).format('YYYY-MM-DD HH:mm:ss')}
            </p>
          ) : null}
        </Container>
      </DragDropContext>
      {saveLoading ? <Loader /> : null}
      <Dialogs />
    </>
  );
};

export default Component;
