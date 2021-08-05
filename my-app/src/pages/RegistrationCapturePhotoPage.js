import React, {Component,Fragment} from 'react';
import Menubar from "../components/Menubar";
import RegistrationCapturePhoto from "../components/RegistrationCapturePhoto";
class RegistrationCapturePhotoPage extends Component {

    render() {
        return (
            <Fragment>
                <Menubar/>
                <RegistrationCapturePhoto/>
            </Fragment>
        );
    }
}

export default RegistrationCapturePhotoPage;