import { connect } from "react-redux";
import { ImagesList } from './../components/ImagesList.js';
import viewListS3Item from '../actions/viewListS3Item.js';
import selectS3Item from '../actions/selectS3Item.js';

const mapStateToProps = state => {
    return {
        imageState: state.imageState
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoad: (name) => {
            dispatch(viewListS3Item(name))
        },
        onSelect: (name) => {
            dispatch(selectS3Item(name));
        }
    };
};

const ListContainer = connect(mapStateToProps, mapDispatchToProps)(
    ImagesList
);

export default ListContainer;