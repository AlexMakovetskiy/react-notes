import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ITagListState } from '../../types/storeTypes';

const tagListInitialstate: ITagListState = {
    tagList: [],
};

const TagListSlice = createSlice({
    name: 'tags',
    initialState: tagListInitialstate,
    reducers: {
        setTag (state: ITagListState, action: PayloadAction<string[]>) {
            action.payload.map((incomingTag) => {
                const isPresentTag = state.tagList.find(currentTag => currentTag === incomingTag);
                if(!isPresentTag)
                    state.tagList = [incomingTag, ...state.tagList];
                return incomingTag;
            });
        },
    },
});

export const { setTag } = TagListSlice.actions;
export default TagListSlice.reducer;