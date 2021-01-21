import { SELECT_S3_ITEM } from "../constants/constants.js";
import { ImagesList } from '../components/ImagesList.js';

const selectS3Item = (name) => {
    return {
        type: SELECT_S3_ITEM,
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
                    "checked": true,
                    "viewed": stateCopy["viewed"]
                };
            }
            return stateDict;
        }
    };
};
  
export default selectS3Item;