import React, { Component } from "react";

function DetailsComponent(props) {
    const customer = props.customer;
    const customerDetails = customer.map(data => {
        return <div className="container" key={data.id}>
            <div className="row">
                <div className="card my-2">
                    <div className="card-body">
                        <div className="row d-flex justify-content-around align-items-center">
                            <div className="col">
                                <ul className="list-group">
                                    <li className="list-group-item">{data.name}</li>
                                    <li className="list-group-item">{data.amount}</li>
                                    <li className="list-group-item">{data.email}</li>
                                    <li className="list-group-item">{data.paymentMethodId}</li>
                                </ul>
                            </div>
                            <div className="col">
                                <button className="btn btn-danger m-3" onClick={() => props.deleteCustomerDetails(data.id)}>
                                    <i className="fa fa fa-trash fa-lg  "></i></button>
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
