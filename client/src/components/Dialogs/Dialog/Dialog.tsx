import React, { useCallback } from 'react';
import DialogIds from '../../../types/dialogIds';
import { ReactComponent as XMarkIcon } from '../../../assets/x.svg';
import { CloseButton, Container, Content, Mask, Title } from './styled';
import useWindowSize from '../../../hooks/useWindowResize';
import useEscEvent from '../../../hooks/useEscEvent';

export interface DialogProps {
  dialogId: DialogIds;
  title?: string;
  onClose?: () => void;
  children: React.ReactNode;
}

const DialogComponent: React.FC<DialogProps> = ({
  title,
  children,
  onClose,
}) => {
  const { height } = useWindowSize();

  const escFunction = useCallback((event: any) => {
    if (event.key === 'Escape') {
      onClose?.();
    }
  }, []);

  useEscEvent(escFunction);

  return (
    <Container>
      <Mask onClick={() => onClose?.()} />
      <Content style={{ height }}>
        {title ? <Title>{title}</Title> : null}
        <CloseButton onClick={onClose}>
          <XMarkIcon />
        </CloseButton>
        {children}
      </Content>
    </Container>
  );
};

export default DialogComponent;
