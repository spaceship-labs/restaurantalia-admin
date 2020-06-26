import {
  all, takeEvery, select,
} from 'redux-saga/effects';
import {
  watchGetUserSaga,
  watchDoLoginSaga,
  watchLogoutSaga,
} from './auth';
import {
  watchgetMenusSaga,
  watchgetMenuSingleSaga,
} from './restaurants';
import {
  watchgetCategoriesSaga,
} from './categories';

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

// Root saga
export function* rootSaga() {
  yield all([
    watchGetUserSaga(),
    watchDoLoginSaga(),
    watchLogoutSaga(),
    watchgetMenusSaga(),
    watchgetMenuSingleSaga(),
    watchgetCategoriesSaga(),
  ]);
}
