import { connect } from 'react-redux';
import Dialogs from './Dialogs';
import createDialog from './createDialog';
import { RootState } from '../../state';

export default connect((state: RootState) => ({
  dialogs: state.dialogs,
  createDialog,
}))(Dialogs);
