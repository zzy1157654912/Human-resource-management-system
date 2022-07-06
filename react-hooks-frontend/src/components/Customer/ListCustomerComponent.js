import React,{useState,useEffect} from 'react'
import CustomersService from '../../services/CustomersService'
import AddCustomerComponent from './AddCustomerComponent'
import UpdateCustomerComponent from './UpdateCustomerComponent'
import LeftSide from "../leftSide/LeftSide";
import ExcelPort from "../ExcelPort/ExcelPort";

const ListCustomerComponent = () => {

    // define customers state and get a methed to update customers
    const [customers, setCustomers] = useState([])

    const [showAddCustomer,setShowAddCustomer] = useState(false);
    const [showUpdateCustomer,setShowUpdateCustomer] = useState(false);
    let [activeId,setActiveId] = useState(null);


    // get customer data from backend
    const getAllCustomers = () =>{
        CustomersService.getAllCustomers().then((response) => {
            console.log(response.data)
            setCustomers(response.data);
        }).catch(error=>{
            console.log(error)
        })
    }

    useEffect(() => {
       
        getAllCustomers();
        

    }, [])

    const updateCustomer = (customerId) => {
        setActiveId(customerId);
        setShowUpdateCustomer(true);
    }

    const deleteCustomer = (customerId) => {
        // console.log(customerId);
        CustomersService.deleteCustomer(customerId).then(response=>{

            getAllCustomers();

        }).catch(error=>{
            console.log(error)
        })
    }


    return (
        <div style={{display:"flex"}}>
            <LeftSide />
            <div className="container" style={{position:"relative"}}>
            <h2 className="text-center">List Customers</h2>
            <div style={{display:"flex"}}>
                <button className="btn btn-primary mb-2" onClick={()=>setShowAddCustomer(true)}>Add Customer</button>
                <ExcelPort />
            </div>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Customer Id</th>
                        <th>Customer Name</th>
                        <th>Customer Phone</th>
                        <th>Customer Address</th>
                        <th>Customer IdCard</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        customers.map(customer=>
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>{customer.customerName}</td>
                                <td>{customer.customerPhone}</td>
                                <td>{customer.customerAddress}</td>
                                <td>{customer.customerIdCard}</td>
                                <td>
                                    <button className="btn btn-info" onClick={() => updateCustomer(customer.id)}>Update</button>
                                    <button className="btn btn-danger" onClick={() => deleteCustomer(customer.id)} 
                                        style={{marginLeft:"10px"}}
                                    >Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            {
                showAddCustomer? <AddCustomerComponent setShowAddCustomer={setShowAddCustomer} getAllCustomers={getAllCustomers} /> : null
            }
            {
                showUpdateCustomer? <UpdateCustomerComponent id={activeId} setShowUpdateCustomer={setShowUpdateCustomer} getAllCustomers={getAllCustomers} /> : null
            }
            </div>
        </div>
    )
}

export default ListCustomerComponent;
