import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { Dialog } from '../../state/stores/dialogs';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 11;
  overflow: hidden;
`;

interface Props {
  className?: string;
  createDialog: (dialog: Dialog) => ReactNode | null;
  dialogs?: Dialog[];
}

const Dialogs: React.FC<Props> = ({
  className = '',
  createDialog,
  dialogs = [],
}) =>
  dialogs.length ? (
    <Container className={classNames(className)}>
      {dialogs.map(createDialog)}
    </Container>
  ) : null;

export default Dialogs;
