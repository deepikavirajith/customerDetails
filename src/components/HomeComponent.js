import React, { Component } from 'react';
import { Form, Input } from 'reactstrap';
import axios from 'axios';
import { baseUrl } from './baseUrl';
import DetailsComponent from './DetailsComponent';
import Spinner from './Spinner';

class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: [],
            userFName: "",
            userLName: "",
            userEmail: "",
            loading: false,
            cost: "",
            quantity: "",
            itemName: ""

        }
        this.customerFName = this.customerFName.bind(this);
        this.customerLName = this.customerLName.bind(this);
        this.customerEmail = this.customerEmail.bind(this);
        this.getCustomerDetails = this.getCustomerDetails.bind(this);
        this.addCustomerDetails = this.addCustomerDetails.bind(this);
        this.deleteCustomerDetails = this.deleteCustomerDetails.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.customerQuantity = this.customerQuantity.bind(this);
        this.customerAmount = this.customerAmount.bind(this);
    }

    customerFName(event) {
        event.preventDefault();
        this.setState({
            userFName: event.target.value,
        });
    }
    customerLName(event) {
        event.preventDefault();
        this.setState({
            userLName: event.target.value,
        });
    }

    customerEmail(event) {
        event.preventDefault();
        this.setState({
            userEmail: event.target.value,
        });
    }
    handleChange(event) {
        console.log(event.target.value);
        console.log(this.state.itemName);
        event.preventDefault();
        const currentVal = event.target.value;
        switch (currentVal) {
            case "Staubsauger":
                this.setState({
                    cost: 14.9
                });
                break;
            case "Monitorstand":
                this.setState({
                    cost: 16.3
                });
                break;
            case "Textblock":
                this.setState({
                    cost: 1.8
                });
                break;
            case "MacBook Pro":
                this.setState({
                    cost: 749.5
                });
                break;
            case "Mate Tee":
                this.setState({
                    cost: 1.99
                });
                break;
            case "Dogecoin":
                this.setState({
                    cost: 2
                });
                break;
            case "Kaffeetasse":
                this.setState({
                    cost: 4.99
                });
                break;


            default:
                this.setState({
                    cost: "try again"
                });
                break;
        }

        this.setState({
            itemName: event.target.value
        });
    }


    customerAmount(event) {
        event.preventDefault();
        this.setState({
            cost: event.target.value
        })

    }

    customerQuantity(event) {
        event.preventDefault();
        this.setState({
            quantity: event.target.value
        });
    }

    //axios GET method to get data from json.db
    async getCustomerDetails() {
        this.setState({
            loading: !this.state.loading
        });
        try {
            await axios.get(baseUrl).then((res) => {
                console.log(res.data);
                this.setState({
                    loading: false,
                    customer: res.data
                });
            });
        } catch (err) {
            console.log(err);
        }
    }

    // this method is used to render the data in React
    componentDidMount() {
        this.getCustomerDetails();
    }


    // axios POST method to add data in json.db
    addCustomerDetails(event) {
        event.preventDefault();
        try {
            axios
                .post(baseUrl, {
                    firstName: this.state.userFName,
                    lastName: this.state.userLName,
                    email: this.state.userEmail,
                    orders: [
                        {
                            items: [
                                {
                                    itemName: this.state.itemName,
                                    quantity: this.state.quantity,
                                    price: this.state.cost
                                }
                            ]

                        }
                    ]
                })
                .then((res) => {
                    this.setState({
                        userFName: "",
                        userLName: "",
                        userEmail: "",
                        quantity: "",
                        cost: "",
                        itemName: ""

                    });
                    this.getCustomerDetails();
                });
        } catch (err) {
            console.log(err);
        }
    }
    //delete data
    deleteCustomerDetails(id) {
        try {
            axios.delete(`http://localhost:3001/data/${id}`).then((res) => {
                const totalCustomers = [...this.state.customer];
                const customerAdded = totalCustomers.filter(
                    (deleteCustomer) => deleteCustomer.id !== id
                );
                this.setState({
                    customer: customerAdded
                });
                this.getCustomerDetails();
            });
        } catch (err) {
            console.log(err);
        }
    }



    // Applcation UI 
    render() {

        return (
            <React.Fragment>
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <h4 className='text-primary m-3'>Customer Information</h4>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-sm-6'>
                            <Form onSubmit={this.addCustomerDetails}>
                                <div className='m-2'>
                                    <Input type="text" placeholder='First Name' value={this.state.userFName} onChange={this.customerFName}></Input>
                                </div>
                                <div className='m-2'>
                                    <Input type="text" placeholder='Last Name' value={this.state.userLName} onChange={this.customerLName}></Input>
                                </div>
                                <div className='m-2'>
                                    <Input type="email" placeholder='Email' value={this.state.userEmail} onChange={this.customerEmail}></Input>
                                </div>
                                <div className='m-2'>
                                    <select className='form-control' value={this.state.itemName} onChange={this.handleChange}>
                                        <option>Select..</option>
                                        <option value="Staubsauger">Staubsauger</option>
                                        <option value="Monitorstand">Monitorstand</option>
                                        <option value="Textblock">Textblock</option>
                                        <option value="MacBook Pro">MacBook Pro</option>
                                        <option value="Mate Tee">Mate Tee</option>
                                        <option value="Dogecoin">Dogecoin</option>
                                        <option value="Kaffeetasse">Kaffeetasse</option>
                                    </select>
                                </div>

                                <div className='m-2'>
                                    <Input type="number" placeholder='quantity' value={this.state.quantity} onChange={this.customerQuantity}></Input>
                                </div>
                                <div className='m-2'>
                                    <Input value={this.state.cost} readOnly="true" onChange={this.customerAmount}></Input>
                                </div>
                                <div className='m-2'>
                                    <button type="submit" className='btn btn-primary m-2' >submit</button>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className='row'>
                        {
                            this.state.loading ? <Spinner /> :
                                <DetailsComponent customer={this.state.customer} deleteCustomerDetails={this.deleteCustomerDetails}></DetailsComponent>
                        }

                    </div>

                </div>
            </React.Fragment>
        )
    }
}
export default HomeComponent;