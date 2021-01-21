import { combineReducers } from "redux";
import { VIEW_LIST_S3_ITEM, SELECT_S3_ITEM } from "../constants/constants.js";
import { ImagesList } from '../components/ImagesList.js';

// define the state in reducer

const imageState = (state = ImagesList.stateData, action) => {
    switch(action.type) {
        case VIEW_LIST_S3_ITEM:
        case SELECT_S3_ITEM:
            var stateDict = action.evaluate(action.item.name); // stateDict
            return stateDict;
            break;

        default:
            return {};
            break;
    }
};

const reducer = combineReducers({
    imageState
});

export default reducer;