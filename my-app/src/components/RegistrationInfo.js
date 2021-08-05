import React, {Component,Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
// import PreLoader from "../assets/images/Spinner-1s-200px.svg";
import imagePlaceHolder from "../assets/images/imagePlaceholder.svg";
import CogoToast, {error} from 'cogo-toast';
import * as faceapi from 'face-api.js';
import axios from "axios";
import Loader from "./Loader";
import {Redirect} from "react-router";

class RegistrationInfo extends Component {
    constructor() {
        super();
        this.state = {
            // SpinnerLoader:PreLoader,
            placeholder:imagePlaceHolder,
            Ename:'',
            Eid:'',
            Enumber:'',
            photodes:[],
            // Ephoto:false,
            loader:'d-none',
            Redirect:false
        }
    }

    componentDidMount() {
        let imagephoto = sessionStorage.getItem('photo');
        this.setState({placeholder:imagephoto})
    }

    onSubmitHandler=()=>{
        let ename = this.state.Ename;
        let eid = this.state.Eid;
        let ephone = this.state.Enumber;

        if(ename.length==0)
        {
            CogoToast.error('Name is Required',{position:"bottom-center"})
        }
        else if(eid.length>4)
        {
            CogoToast.error('Id is Invalid',{position:"bottom-center"})
        }
        else if(eid.length==0){
            CogoToast.error('ID is Required',{position:"bottom-center"})
        }
        else if(ephone.length == 0)
        {
            CogoToast.error('Phone Number is Required',{position:"bottom-center"})
        }
        else if(ephone.length >11)
        {
            CogoToast.error('Phone Number is Invalid',{position:"bottom-center"})
        }
        else {
            this.PhotoDesCal(ename,eid,ephone);
        }
    }


    PhotoDesCal=(ename,eid,ephone)=>{
        (async ()=>{
                this.setState({loader:''})
                await faceapi.loadSsdMobilenetv1Model('model1/');
                await faceapi.loadFaceLandmarkModel('model1/');
                await faceapi.loadFaceRecognitionModel('model1/');
                let image = document.getElementById('previewImageone');
                let result = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();
                let descriptor = JSON.stringify(Array.from(result[0]['descriptor']));
                this.setState({photodes:descriptor})
                this.setState({loader:'d-none'})
                console.log(descriptor);

                this.RegistrationProcess(ename,eid,ephone,descriptor);
        })()
    }

    RegistrationProcess=(ename,eid,ephone,descriptor)=>{

        let myData = {
            name:ename,
            employee_id:eid,
            employee_mobile:ephone,
            photo_des:descriptor
        }

        this.setState({loader:""})

        axios.post('http://127.0.0.1:8000/api/employeereg',myData).then(response=>{
            this.setState({loader:'d-none'})
            if(response.status === 200 && response.data === 1){
                CogoToast.success('Registration Success',{position:"bottom-center"});
                this.setState({Redirect:true})
            }else {
                CogoToast.error('Registration Fail',{position:"bottom-center"});
            }
        }).catch(error=>{
            this.setState({loader:'d-none'})
            CogoToast.error('Registration Fail',{position:"bottom-center"});
        });
    }

    pageRedirect=()=>{
        if(this.state.Redirect == true)
        {
            return (
                <Redirect to='/'/>
            )
        }
    }

    render() {
        return (
            <Fragment>
                <Container>
                    <Row className='mt-5 d-flex justify-content-center'>
                        <Col sm={12} md={4} lg={4}>
                            <div className='bg-dark'>
                                <img id='previewImageone' className='img-fluid' src={this.state.placeholder}/>
                            </div>
                        </Col>

                        <Col sm={12} md={4} lg={4}>
                            <div className='input-group'>
                                <label className='input-group-text'>Name</label>
                                <input onChange={(e)=>this.setState({Ename:e.target.value})} type='text' className='form-control'/>
                            </div>
                            <br/>
                            <div className='input-group'>
                                <label className='input-group-text'>Employee ID</label>
                                <input onChange={(e)=>this.setState({Eid:e.target.value})} type='text' className='form-control'/>
                            </div>
                            <br/>
                            <div className='input-group'>
                                <label className='input-group-text'>Phone number</label>
                                <input onChange={(e)=>this.setState({Enumber:e.target.value})} type='text' className='form-control'/>
                            </div>
                            <br/>
                            <button onClick={this.onSubmitHandler} className='btn  btn-outline-primary btn-block'>Sumbit</button>
                        </Col>
                    </Row>
                </Container>
                <div className={this.state.loader}>
                    <Loader/>
                </div>
                {this.pageRedirect()}
            </Fragment>
        );
    }
}

export default RegistrationInfo;