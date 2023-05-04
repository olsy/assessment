import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { closeDialog } from '../../../state/stores/dialogs';
import Dialog, { DialogProps } from './Dialog';

const mapDispatchToProps = (dispatch: Dispatch, props: DialogProps) => ({
  onClose: () => {
    dispatch(closeDialog(props.dialogId));
  },
});

export default connect(null, mapDispatchToProps)(Dialog);
