import React,{ useState,useEffect } from 'react'

import EmployeesService from '../../services/EmployeesService'

const UpdateEmployeeComponent = ({id,setShowUpdateEmployee,getAllEmployees}) => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [emailId, setEmailId] = useState("")
    const [personID,setPersonID] = useState("")



    const UpdateEmployee = (e)=>{
        e.preventDefault();

        const employee = {firstName,lastName,emailId,personID};

        // console.log(employee)

      
            EmployeesService.updateEmployee(id,employee).then(response => {

                setShowUpdateEmployee(false);

                getAllEmployees();

            }).catch(error=>{

                console.log(error);

            })

        

        
    }

    useEffect(() => {
        
        EmployeesService.getEmployeeById(id).then(response=>{
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setEmailId(response.data.emailId);
            setPersonID(response.data.personID);
        }).catch(error=>{
            console.log(error);
        })

    }, [])

 

    return (
        <div style={{position:"absolute",width:"100%",top:"250px",left:"50%",transform:"translateX(-50%) translateY(-50%)"}}>
            <br/>
           <div className="container">
               <div className="row">
                   <div className="card col-md-6 offset-md-3 offset-md-3" style={{boxShadow:"1px 2px 2px grey,-1px -2px 2px grey"}}>
                        <h2 className="text-center">Update Employee</h2>
                       <div className="card-body">
                           <form>
                               <div className="form-group mb-2">
                                   <label className="form-label">First Name :</label>
                                   <input 
                                    type="text" 
                                    placeholder="Enter first name"
                                    name="firstName"
                                    className="form-control"
                                    value = {firstName}
                                    onChange={e=>setFirstName(e.target.value)} />
                               </div>
                               <div className="form-group mb-2">
                                   <label className="form-label">Last Name :</label>
                                   <input 
                                    type="text" 
                                    placeholder="Enter last name"
                                    name="lastName"
                                    className="form-control"
                                    value = {lastName}
                                    onChange={e=>setLastName(e.target.value)} />
                               </div>
                               <div className="form-group mb-2">
                                   <label className="form-label">Email Id :</label>
                                   <input 
                                    type="email" 
                                    placeholder="Enter email Id"
                                    name="emailId"
                                    className="form-control"
                                    value = {emailId}
                                    onChange={e=>setEmailId(e.target.value)} />
                               </div>
                               <div className="form-group mb-2">
                                   <label className="form-label">Email Id :</label>
                                   <input
                                       type="text"
                                       placeholder="Enter personID"
                                       name="personID"
                                       className="form-control"
                                       value = {personID}
                                       onChange={e=>setPersonID(e.target.value)} />
                               </div>

                                <button className="btn btn-success" onClick={(e)=>UpdateEmployee(e)}>Submit</button>
                                <button style={{marginLeft:'20px'}} className="btn btn-danger" onClick={()=>setShowUpdateEmployee(false)}>Cancel</button>
                           </form>
                       </div>
                   </div>
               </div>
           </div>
        </div>
    )
}

export default UpdateEmployeeComponent
