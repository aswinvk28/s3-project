import React from "react";
import { HOST, PORT, PROTO, IMAGES_PATH } from "../constants/constants.js";
import axios from 'axios';

// define the data in the Presentation Component so that we update state once

class ImagesList extends React.Component {
    static stateData = [];
    
    state = {
        imageState: null,
        update: false,
        url: ""
    }
    
    constructor(props) {
        super(props);
    }

    fetchData() {
        var data = axios.get(PROTO + "://" + HOST + ":" + PORT + "/s3/index.php?q=list-s3")
            .then(response => {
                for(var i = 0; i < response.data.length; i++) {
                    ImagesList.stateData[ImagesList.stateData.length] = {
                        "image": IMAGES_PATH + response.data[i].image_url,
                        "checked": false,
                        "viewed": false
                    };
                }
                this.setState({
                    update: true
                });
                return response;
            }).catch(err => {
                console.log(err);
            });

    }

    componentWillMount() {
        this.fetchData();
    }

    componentDidMount() {
        this.setState({
            imageState: ImagesList.stateData
        });
    }

    selectCheckbox(key) {
        this.props.onSelect([key]);
    }

    downloadAsCsv() {
        var imagesText = "", csvText = "";
        var headers = "image_url";
        for(var i = 0; i < ImagesList.stateData.length; i++) {
            if(ImagesList.stateData[i].checked) {
                imagesText += ImagesList.stateData[i].image + "\n";
            }
        }
        csvText = headers + "\n" + imagesText;
        const blob = new Blob([csvText], {type: 'text/csv'});
        const url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.setAttribute("hidden", "");
        a.setAttribute("href", url);
        a.setAttribute("download", "download.csv");
        a.click();
    }

    render() {
        var imageState = this.props.imageState; // stateDict
        var images = null, keys = [];
        for(var key in imageState) {
            ImagesList.stateData[key] = imageState[key];
        }
        if(this.state.imageState) {
            images = this.state.imageState.map((value, key) => {
                var inputKey = "checkbox" + "[" + key.toString() + "]";
                keys.push(key);
                return (
                    <div className="image-box" key={key}>
                        <div className="image-tile">
                            <img src={value['image']} />
                        </div>
                        <div className="image-checkbox">
                            <input type="checkbox" name={inputKey} onChange={() => this.selectCheckbox(key)} />
                        </div>
                    </div>
                );
            });
        }
        return (
            <div className="clearfix">
                <div className="row">
                    <button onClick={() => this.downloadAsCsv()}>Download Image URL(s)</button>
                </div>
                <div className="row">
                    { images }
                </div>
                <div className="row">
                    <button onClick={() => this.downloadAsCsv()}>Download Image URL(s)</button>
                </div>
                <div className="row">
                    <p>{this.state['url']}</p>
                </div>
            </div>
        );
    }
}

export {
    ImagesList
};