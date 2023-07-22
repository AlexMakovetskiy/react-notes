import { RootState } from '../..';

const tagListSelector = (state: RootState) => {
    return state.TagListSlice.tagList;
};

export default tagListSelector;