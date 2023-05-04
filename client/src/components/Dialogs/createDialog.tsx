import React from 'react';
import dialogIds from '../../types/dialogIds';
import { Dialog as DialogType } from '../../state/stores/dialogs';
import Dialog from './Dialog';

export default function createDialog(
  dialog: DialogType,
): React.ReactNode | null {
  switch (dialog.dialogId) {
    case dialogIds.IMAGE_DIALOG_ID:
      return (
        <Dialog key={dialog.dialogId} dialogId={dialog.dialogId}>
          <img
            src={dialog?.data?.image}
            alt={dialog?.data?.title}
            style={{ width: 'calc(100% - 5px)', height: 'calc(100% - 5px)' }}
          />
        </Dialog>
      );
    default:
      return null;
  }
}
