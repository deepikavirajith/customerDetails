import React from "react";
import {Input, Label, Form, Row, Col} from 'reactstrap';
import {Link} from 'react-router-dom';


function DetailsComponent(props) {
    const customer = props.customer;
    const customerDetails = customer.map(data => {
        return <div className="container" key={data.id}>
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
                                            <Col  className="col-sm-10">
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
                                        return Math.floor(value) + "???";
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
                            <div className="col-sm-2">
                                <button className="btn btn-danger m-3" onClick={() => props.deleteCustomerDetails(data.id)}>
                                    <i className="fa fa fa-trash fa-lg  "></i></button>
                                    <Link to={`/purchase/${data.id}`} state={{ data: data }} className='btn btn-danger m-2'><i className="fa fa fa-eye fa-lg  "> </i></Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    })
    return <div >
        <p>{customerDetails}</p>
    </div>;
}
export default DetailsComponent;
