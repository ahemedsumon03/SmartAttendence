import React, {Component,Fragment} from 'react';
import Menubar from "../components/Menubar";
import AttendenceInfo from "../components/AttendenceInfo";

class AttendenceInfoPage extends Component {
    render() {
        return (
            <Fragment>
                <Menubar/>
                <AttendenceInfo/>
            </Fragment>
        );
    }
}

export default AttendenceInfoPage;