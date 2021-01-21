import { VIEW_LIST_S3_ITEM } from "../constants/constants.js";
import { ImagesList } from '../components/ImagesList.js';

const viewListS3Item = (name) => {
    return {
        type: VIEW_LIST_S3_ITEM,
        item: {
            "viewed": true,
            name: name
        },
        evaluate: function(items) {
            var key = 0, stateCopy = null, stateDict = {};
            for (var i = 0; i < items.length; i++) {
                key = items[i];
                stateCopy = ImagesList.stateData[key];
                stateDict[key] = {
                    "image": stateCopy["image"],
                    "checked": stateCopy["checked"],
                    "viewed": true
                };
            }
            return stateDict;
        }
    };
};
  
export default viewListS3Item;