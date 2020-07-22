import {
  all, takeEvery, select,
} from 'redux-saga/effects';
import auth from './auth';
// import restaurants from './restaurants';
import categories from './categories';
import dishes from './dishes';
import menus from './menus';

const getstatus = (state) => ({
  status: state.status,
});

function* getSaga() {
  const { status } = yield select(getstatus);
  console.log('empty', status);
}

export function* watchEmptySaga() {
  yield takeEvery('FETCH', getSaga);
}

export function* rootSaga() {
  yield all([
    auth(),
    // restaurants(),
    categories(),
    dishes(),
    menus(),
  ]);
}

// Leaving restaurants saga register for future improvements
