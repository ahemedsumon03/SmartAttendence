import React, {Component,Fragment} from 'react';
import Menubar from "../components/Menubar";
import {Container,Row,Col} from "react-bootstrap";
import { Player,BigPlayButton } from 'video-react';
import 'video-react/dist/video-react.css'
import axios from "axios";
class Homepage extends Component {

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/onlist').then(response=>{
            if(response.status == 200)
            {
                localStorage.setItem('listValue',JSON.stringify(response.data));
            }
            else {
                console.log('Something wrong');
            }
        }).catch(error=>{
            console.log(error);
        });
    }

    render() {
        return (
            <Fragment>
                <Menubar/>
                <Container>
                    <Row className='mt-4'>
                        <Col className='shadow-sm p-3' md={6} lg={6}>
                            <p className='text-justify'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p>

                            <p className='text-justify'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p>

                            <p className='text-justify'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p>
                        </Col>

                        <Col className='p-3' md={6} lg={6}>
                            <Player className='img-fluid h-100' src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4">
                                <BigPlayButton position="center" />
                            </Player>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default Homepage;