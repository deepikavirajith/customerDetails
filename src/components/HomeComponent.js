import React, { Component } from 'react';
import { Form, Input, Button } from 'reactstrap';
import axios from 'axios';
import { baseUrl } from './baseUrl';
import DetailsComponent from './DetailsComponent';
import Spinner from './Spinner';

class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: [],
            userName: "",
            userAmount: "",
            userEmail: "",
            paymentMethodId: "",
            loading: false,

        }
        this.customerName = this.customerName.bind(this);
        this.customerAmount = this.customerAmount.bind(this);
        this.customerEmail = this.customerEmail.bind(this);
        this.getCustomerDetails = this.getCustomerDetails.bind(this);
        this.addCustomerDetails = this.addCustomerDetails.bind(this);
        this.deleteCustomerDetails = this.deleteCustomerDetails.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    customerName(event) {
        event.preventDefault();
        this.setState({
            userName: event.target.value,
        });
    }

    customerAmount(event) {
        event.preventDefault();
        this.setState({
            userAmount: event.target.value,
        });
    }
    customerEmail(event) {
        event.preventDefault();
        this.setState({
            userEmail: event.target.value,
        });
    }
    handleChange(event) {
        this.setState({
            paymentMethodId: event.target.value
        });
    }

    //axios GET method to get data from json.db
    getCustomerDetails() {
        this.setState({
            loading: !this.state.loading
        });
        try {
            axios.get(baseUrl).then((res) => {
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
                    name: this.state.userName,
                    amount: this.state.userAmount,
                    email: this.state.userEmail,
                    paymentMethodId: this.state.paymentMethodId
                })
                .then((res) => {
                    this.setState({
                        userName: '',
                        userAmount: '',
                        userEmail: '',
                        paymentMethodId: ''
                    });
                    console.log(this.state.userName);
                    console.log(this.state.userNumber);
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
                                    <Input type="text" placeholder='name' value={this.state.userName} onChange={this.customerName}></Input>
                                </div>
                                <div className='m-2'>
                                    <Input type="email" placeholder='Please enter your email'
                                        value={this.state.userEmail} onChange={this.customerEmail}></Input>
                                </div>
                                <div className='m-2'>                                    
                                <select className='form-control' value={this.state.userAmount} onChange={this.customerAmount}>
                                    <option>25€</option>
                                    <option>100€</option>
                                    <option>250€</option>
                                    <option>500€</option>
                                </select>

                                </div>
                                <div className='m-2'>
                                    <select className='form-control' value={this.state.paymentMethodId} onChange={this.handleChange}>
                                        <option>Weekly paymentMethod</option>
                                        <option>Montly paymentMethod</option>
                                        <option>3 Months paymentMethod</option>
                                        <option>Year paymentMethod</option>
                                    </select>
                                </div>
                                <div className='m-2'>
                                    <button type='submit' className='btn btn-primary'>submit</button>
                                </div>
                            </Form>
                        </div>
                    </div>

                    <div className='row'>
                        {
                            this.state.loading ? <Spinner /> :
                            <DetailsComponent customer ={this.state.customer} deleteCustomerDetails={this.deleteCustomerDetails}></DetailsComponent>
                        }
                        
                    </div>

                </div>
            </React.Fragment>
        )
    }
}
export default HomeComponent;