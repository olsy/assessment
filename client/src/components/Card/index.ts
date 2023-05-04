import { connect } from 'react-redux';
import { openDialog } from '../../state/stores/dialogs';
import Component from './component';
import DialogIds from '../../types/dialogIds';
import { ICard } from '../../types/cards';

const mapDispatchToProps = {
  openModal: (data: ICard) => openDialog(DialogIds.IMAGE_DIALOG_ID, data),
};

export default connect(null, mapDispatchToProps)(Component);
