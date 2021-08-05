import React, {Component,Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import imagePlaceHolder from "../assets/images/imagePlaceholder.svg";
import * as faceapi from "face-api.js";
import axios from "axios";
import CogoToast from "cogo-toast";
import Loader from "./Loader";
class AttendenceInfo extends Component {

    constructor() {
        super();
        this.state = {
            placeholder:imagePlaceHolder,
            Ename:'',
            Eid:'',
            Enumber:'',
            result:'',
            similarity:'',
            distance:'',
            myList:[],
            photodes:[],
            loader:'d-none'
        }
    }

    componentDidMount() {
        this.setState({loader:''})
        let myphoto = sessionStorage.getItem('photo');
        this.setState({placeholder:myphoto})

        let myList = JSON.parse(localStorage.getItem('listValue'));
        this.setState({myList:myList})

        this.AttendencePhotoDescal();
    }

    AttendencePhotoDescal=()=>{
        (async ()=>{
            this.setState({loader:''})
            await faceapi.loadSsdMobilenetv1Model('model1/');
            await faceapi.loadFaceLandmarkModel('model1/');
            await faceapi.loadFaceRecognitionModel('model1/');
            let image = document.getElementById('previewImagetwo');
            let result = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();
            let descrip = Array.from(result[0]['descriptor']);
            this.setState({photodes:descrip})
            this.setState({loader:'d-none'})
            console.log(descrip);
            this.MatchingPhoto();
        })()
    }

    MatchingPhoto=()=>{
        let attendencephoto_des = this.state.photodes;

        const myList =this.state.myList;

        this.setState({loader:""})

        for(let i=0;i<myList.length;i++)
        {
            let comparephoto = new Float32Array(JSON.parse(myList[i]['photo_des']));
            let distance = faceapi.euclideanDistance(attendencephoto_des,comparephoto);
            let similarity = 1-distance;

            this.setState({distance:distance})
            this.setState({similarity:similarity})

            if(similarity>0.55)
            {
                this.setState({result:'Pass'})
                this.setState({
                    Ename:myList[i]['name'],
                    Eid:myList[i]['employee_id'],
                    Enumber:myList[i]['employee_mobile']
                })

                this.setState({loader:'d-none'})
                this.postattendence(myList[i]['name'],myList[i]['employee_id'],myList[i]['employee_mobile']);
            }
            else {
                this.setState({result:'Fail'})
                this.setState({loader:'d-none'})
            }
        }

    }

    postattendence=(name,id,phone)=>{

        let body = {
            name:name,
            employee_id:id,
            employee_mobile:phone
        }
        this.setState({loader:""})
        axios.post('http://127.0.0.1:8000/api/employeeattendence',body).then(response=>{
            this.setState({loader:"d-none"})
            if(response.status === 200 && response.data === 1)
            {
                CogoToast.success('Attendence Success',{position:"bottom-center"});
            }
            else {
                CogoToast.success('Attendence Fail',{position:"bottom-center"});
            }
        }).catch(error=>{
            this.setState({loader:"d-none"})
            CogoToast.success('Attendence Fail',{position:"bottom-center"});
        });
    }

    render() {
        return (
            <Fragment>
               <Container>
                   <Row className='mt-5 d-flex justify-content-center'>
                       <Col sm={12} md={4} lg={4}>
                           <div className='bg-dark'>
                               <img id='previewImagetwo' className='img-fluid' src={this.state.placeholder}/>
                           </div>
                       </Col>
                       <Col sm={12} md={4} lg={4}>
                           <h3>Name: {this.state.Ename}</h3>
                           <h3>Employee ID: {this.state.Eid}</h3>
                           <h3>Phone number: {this.state.Enumber}</h3>
                           <h3>Similarity: {this.state.similarity}</h3>
                           <h3>Distance: {this.state.distance}</h3>
                           <h3>Result: {this.state.result}</h3>
                       </Col>
                   </Row>
               </Container>
                <div className={this.state.loader}>
                    <Loader/>
                </div>
            </Fragment>
        );
    }
}

export default AttendenceInfo;