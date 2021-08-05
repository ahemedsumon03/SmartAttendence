import React, {Component,Fragment} from 'react';
import {Route, Router, Switch} from "react-router";
import AttendencePhotoCapturePage from "../pages/AttendencePhotoCapturePage";
import Homepage from "../pages/Homepage";
import RegistrationCapturePhotoPage from "../pages/RegistrationCapturePhotoPage";
import RegitratiomInfioPage from "../pages/RegitratiomInfioPage";
import AttendenceInfoPage from "../pages/AttendenceInfoPage";

class AppRouting extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route exact path='/' component={Homepage}></Route>
                    <Route exact path='/registrationcapturephoto' component={RegistrationCapturePhotoPage}></Route>
                    <Route exact path='/registrationinfo' component={RegitratiomInfioPage}></Route>
                    <Route exact path='/attendencecapturephoto' component={AttendencePhotoCapturePage}></Route>
                    <Route exact path='/attendenceInfo' component={AttendenceInfoPage}></Route>
                </Switch>
            </Fragment>
        );
    }
}

export default AppRouting;