import React, {Component,Fragment} from 'react';
import Menubar from "./Menubar";
import {Col, Container, Row} from "react-bootstrap";
import Webcam from "react-webcam";
import PreLoader from "../assets/images/Spinner-1s-200px.svg";
import imagePlaceHolder from "../assets/images/imagePlaceholder.svg";
import JEEFACETRANSFERAPI from "../webgl/jeelizFaceTransfer.module";
import CogoToast from "cogo-toast";
import SweetAlert from "react-bootstrap-sweetalert/dist";
import * as faceapi from 'face-api.js';
import Loader from "./Loader";
import {Redirect} from "react-router";

class RegistrationCapturePhoto extends Component {

    constructor() {
        super();
        this.state = {
            SpinnerLoader:PreLoader,
            placeholder:imagePlaceHolder,
            Ephoto:false,
            CameraError:false,
            loader:'d-none',
            Redirect:false
        }
        this.CameraRef = React.createRef();
    }

    OpenWebglCamera=()=>{
        JEEFACETRANSFERAPI.init({
            canvasId:'canvasId',
            NNCPath:'model2/',
            hysteresis:0.1,
            isMirror:true,
            callbackReady:(err)=>{
                if(err)
                {
                    console.log('Error');
                    this.OnCameraError();
                }
                else {
                    this.faceMovement();
                    this.setState({SpinnerLoader:''})
                }
            }
        })
    }

    // FaceDetection=()=>{
    //     (async ()=>{
    //         this.setState({loader:''})
    //         await faceapi.nets.ssdMobilenetv1.loadFromUri('model1/');
    //         await faceapi.nets.faceLandmark68Net.loadFromUri('model1/');
    //         await faceapi.nets.faceRecognitionNet.loadFromUri('model1/');
    //         let image = document.getElementById('previewImageone');
    //         let result = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();
    //         this.setState({loader:'d-none'})
    //         console.log(result);
    //     })()
    // }

    faceMovement=()=>{
        setInterval(()=>{
            let movement = JEEFACETRANSFERAPI.get_morphTargetInfluences();
            if(JEEFACETRANSFERAPI.is_detected())
            {
                let rightEye = movement[8];
                let leftEye = movement[9];
                this.EyeBlink(rightEye,leftEye);
            }
        },2000)
    }

    EyeBlink=(rightEye,leftEye)=>{
        if(rightEye>=0.65 || leftEye>=0.65)
        {
            this.onCapture();
        }
    }

    onCapture=()=>{
        setTimeout(()=>{
            if(this.CameraRef.current!==null)
            {
                let base64Photo = this.CameraRef.current.getScreenshot();
                sessionStorage.setItem('photo',base64Photo);
                this.setState({placeholder:base64Photo,Ephoto:true});
                // this.FaceDetection();
            }
        },500)
    }

    componentDidMount() {
        this.OpenWebglCamera();
    }

    OnCameraError=()=>{
        this.setState({CameraError:true})
    }

    OnCameraTryAgain=()=>{
        window.location.reload();
    }

    OnCameraErrorAlert=()=>{
        if(this.state.CameraError == true)
        {
            return (
                <SweetAlert danger
                  title="Camera Not working"
                  onConfirm={this.OnCameraTryAgain}
                >

                </SweetAlert>
            )
        }
    }

    nextpage=()=>{
        if(this.state.Ephoto == true)
        {
            this.setState({Redirect:true})
        }
        else {
            CogoToast.error('Photo is Missing',{position:"bottom-center"})
        }
    }

    pageRedirect=()=>{
        if(this.state.Redirect == true)
        {
            return (
                <Redirect to='/registrationinfo'/>
            )
        }
    }

    render() {
        return (
                <Fragment>
                    <Container>
                        <Row className='mt-5 d-flex justify-content-center'>
                            <Col sm={12} md={4} lg={4}>
                                <img className='spin-load' src={this.state.SpinnerLoader}/>
                                <canvas id='canvasId' className='canvasclass'></canvas>
                            </Col>
                            <Col sm={12} md={4} lg={4}>
                                <div className='bg-dark'>
                                    <img className='img-fluid' src={this.state.placeholder}/>
                                </div>
                            </Col>
                        </Row>
                        <button onClick={this.nextpage} className='btn btn-danger btn-lg mt-3 nextClass'>Next</button>
                        <Row className='mt-3'>

                            <Col sm={12} md={4} lg={4}>
                                <Webcam
                                    onUserMediaError={this.OnCameraError}
                                    audio={false}
                                    ref={this.CameraRef}
                                    screenshotFormat="image/jpeg"
                                    className='cameraClass'
                                />
                            </Col>

                        </Row>
                    </Container>
                    {this.OnCameraErrorAlert()}
                    {this.pageRedirect()}
                </Fragment>
        );
    }
}

export default RegistrationCapturePhoto;