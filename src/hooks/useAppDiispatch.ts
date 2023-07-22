import { useDispatch } from 'react-redux';

import { store } from '../redux';

type DispatchTyped = typeof store.dispatch;

const useAppDispatch = () => useDispatch<DispatchTyped>();

export default useAppDispatch;