import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Component from './component';
import { RootState } from '../../state';
import {
  stateSelector,
  cardsLoadingSelector,
  saveLoadingSelector,
  lastTimeSavedSelector,
} from '../../state/selectors/cards';
import { getCardsPending, saveData } from '../../state/stores/cards/actions';
import { IDataWithCards } from '../../types/cards';

const mapStateToProps = (state: RootState) => ({
  config: stateSelector(state),
  saveLoading: saveLoadingSelector(state),
  cardsLoading: cardsLoadingSelector(state),
  lastTimeSaved: lastTimeSavedSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchCards: () => dispatch(getCardsPending()),
  saveData: (data: IDataWithCards) => dispatch(saveData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
