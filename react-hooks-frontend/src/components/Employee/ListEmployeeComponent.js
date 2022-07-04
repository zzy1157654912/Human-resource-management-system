import React,{useState,useEffect} from 'react'
import EmployeesService from '../../services/EmployeesService'
import AddEmployeeComponent from './AddEmployeeComponent'
import UpdateEmployeeComponent from './UpdateEmployeeComponent'

const ListEmployeeComponent = () => {

    // define employees state and get a methed to update employees
    const [employees, setEmployees] = useState([])

    const [showAddEmployee,setShowAddEmployee] = useState(false);
    const [showUpdateEmployee,setShowUpdateEmployee] = useState(false);
    let [activeId,setActiveId] = useState(null);


    // get employees data from backend
    const getAllEmployees = () =>{
        EmployeesService.getAllEmployees().then((response) => {
            // console.log(response.data)
            setEmployees(response.data);
        }).catch(error=>{
            console.log(error)
        })
    }

    useEffect(() => {
       
        getAllEmployees();
        

    }, [])

    const updateEmployee = (employeeId) => {
        setActiveId(employeeId);
        setShowUpdateEmployee(true);
    }

    const deleteEmployee = (employeeId) => {
        // console.log(employeeId);
        EmployeesService.deleteEmployee(employeeId).then(response=>{

            getAllEmployees();

        }).catch(error=>{
            console.log(error)
        })
    }


    return (
        <div className="container" style={{position:"relative"}}>
            <h2 className="text-center">List Employees</h2>
            <button className="btn btn-primary mb-2" onClick={()=>setShowAddEmployee(true)}>Add Employee</button>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Employees Id</th>
                        <th>Employees First Name</th>
                        <th>Employees Last Name</th>
                        <th>Employees Email Id</th>
                        <th>ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee=>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.emailId}</td>
                                <td>{employee.personID}</td>
                                <td>
                                    <button className="btn btn-info" onClick={() => updateEmployee(employee.id)}>Update</button>
                                    <button className="btn btn-danger" onClick={()=>deleteEmployee(employee.id)} 
                                        style={{marginLeft:"10px"}}
                                    >Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            {
                showAddEmployee? <AddEmployeeComponent setShowAddEmployee={setShowAddEmployee} getAllEmployees={getAllEmployees} /> : null
            }
            {
                showUpdateEmployee? <UpdateEmployeeComponent id={activeId} setShowUpdateEmployee={setShowUpdateEmployee} getAllEmployees={getAllEmployees} /> : null
            }
        </div>
    )
}

export default ListEmployeeComponent;
