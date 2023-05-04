import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import DialogIds from '../../../types/dialogIds';

export interface Dialog {
  dialogId: DialogIds;
  data?: Record<string, any>;
}

export const initialState: Dialog[] = [];

const slice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {
    openDialog: {
      reducer: (state: Dialog[], action: PayloadAction<Dialog>) => [
        ...state,
        action.payload,
      ],
      prepare: (dialogId: DialogIds, data: Record<string, any> = {}) => ({
        payload: {
          dialogId,
          data,
        },
      }),
    },
    closeDialog: (state: Dialog[], action: PayloadAction<DialogIds>) =>
      state.filter((d: Dialog) => d.dialogId !== action.payload),
  },
});

export const { openDialog, closeDialog } = slice.actions;

export default slice.reducer;
