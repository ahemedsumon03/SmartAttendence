import React, {Component,Fragment} from 'react';
import Menubar from "../components/Menubar";
import AttendencePhotoCapture from "../components/AttendencePhotoCapture";
class AttendencePhotoCapturePage extends Component {

    render() {
        return (
            <Fragment>
                <Menubar/>
                <AttendencePhotoCapture/>
            </Fragment>
        );
    }
}

export default AttendencePhotoCapturePage;