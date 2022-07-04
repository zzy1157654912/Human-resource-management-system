import React,{ useState } from 'react'
import CustomersService from '../../services/CustomersService'

const AddCustomerComponent = ({setShowAddCustomer,getAllCustomers}) => {

    const [customerName, setCustomerName] = useState("")
    const [customerPhone, setCustomerPhone] = useState("")
    const [customerAddress, setCustomerAddress] = useState("")
    
 


    const saveCustomer = (e)=>{
        e.preventDefault();

        const customer = {customerName,customerPhone,customerAddress};

        // console.log(customer)

        
        CustomersService.createCustomer(customer).then(response=>{

            // console.log(response.data)
            setShowAddCustomer(false);
            getAllCustomers();
                
    
        }).catch(error=>{
            console.log(error)
        })
        

        
    }

  
    return (
        <div style={{position:"absolute",width:"100%",top:"250px",left:"50%",transform:"translateX(-50%) translateY(-50%)"}}>
            
           <div className="container">
               <div className="row">
                   <div className="card col-md-6 offset-md-3 offset-md-3" style={{boxShadow:"1px 2px 2px grey,-1px -2px 2px grey"}}>
                      <div style={{textAlign:"center",fontSize:"20px",fontWeight:"bold"}}> Add Customer</div>
                       <div className="card-body">
                           <form>
                               <div className="form-group mb-2">
                                   <label className="form-label">Customer Name :</label>
                                   <input 
                                    type="text" 
                                    placeholder="Enter customer name"
                                    name="customerName"
                                    className="form-control"
                                    value = {customerName}
                                    onChange={e=>setCustomerName(e.target.value)} />
                               </div>
                               <div className="form-group mb-2">
                                   <label className="form-label">Customer Phone :</label>
                                   <input 
                                    type="text" 
                                    placeholder="Enter customer phone "
                                    name="customerPhone"
                                    className="form-control"
                                    value = {customerPhone}
                                    onChange={e=>setCustomerPhone(e.target.value)} />
                               </div>
                               <div className="form-group mb-2">
                                   <label className="form-label">Customer Address :</label>
                                   <input 
                                    type="text" 
                                    placeholder="Enter customer address "
                                    name="customerAddress"
                                    className="form-control"
                                    value = {customerAddress}
                                    onChange={e=>setCustomerAddress(e.target.value)} />
                               </div>
                              

                                <button className="btn btn-success" onClick={(e)=>saveCustomer(e)}>Submit</button>
                                <button style={{marginLeft:"20px"}} className="btn btn-danger" onClick={()=>setShowAddCustomer(false)}>Cancel</button>
                           </form>
                       </div>
                   </div>
               </div>
           </div>
        </div>
    )
}

export default AddCustomerComponent
