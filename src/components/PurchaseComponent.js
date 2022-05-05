import React from "react";
import { useLocation, useParams } from 'react-router-dom';
import {Input, Label, Form, Row, Col} from 'reactstrap';

function PurchaseComponent(props) {
    const location = useLocation();
    console.log(props, " props");
    console.log(location, " useLocation Hook");
    const data = location.state?.data;

    return (
        <div className="container" key={data.id}>
            <div className="row">
                <div className="card my-2">
                    <div className="card-body">
                        <div className="row d-flex align-items-center">
                            <div className="col-sm-10">
                                <Form>
                                    <Row>
                                        <Col className="col-sm-2">
                                            <Label>FirstName:</Label>
                                        </Col>
                                        <Col className="col-sm-10" >
                                            <Input className="displaydata" type="text" readOnly="true" value={data.firstName}></Input>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="col-sm-2">
                                            <Label>LastName:</Label>
                                        </Col>
                                        <Col className="col-sm-10">
                                            <Input className="displaydata" type="text" readOnly="true" value={data.lastName}></Input>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="col-sm-2">
                                            <Label>Email:</Label>
                                        </Col>
                                        <Col className="col-sm-10">
                                            <Input className="displaydata" type="email" readOnly="true" value={data.email}></Input>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="col-sm-2">
                                            <Label>TotalPrice:</Label>
                                            </Col>
                                            <Col className="col-sm-10">
                                            <Input className="displaydata" type="text" readOnly="true" value={data.orders.map(item => {
                                        const value = item.items.reduce((acc, total) => acc + (total.quantity * total.price), 0);
                                        return Math.floor(value) + "€";
                                    })}></Input>
                                        </Col>
                                        </Row>
                                        <Row>
                                        <Col className="col-sm-2">
                                            <Label>TotalItems:</Label>
                                            </Col>
                                            <Col className="col-sm-10">
                                            <Input className="displaydata" type="text" readOnly="true" value={data.orders.map(item => {
                                        const value = item.items.reduce((acc, total) => acc + total.quantity, 0);
                                        return Math.floor(value);
                                    })}></Input>
                                        </Col>
                                        </Row>

                                </Form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    
    )

}
export default PurchaseComponent;