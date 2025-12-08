import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';

const API_URL="http://localhost:5000/employees"
function App() {
 const [employees,setEmployees] = useState([])
 const [currentEmployee,setCurrentEmployee] = useState(null)

 useEffect(()=>{
  fetchEmployees();
 },[])

 const fetchEmployees= async()=>{
  const response = await axios.get(API_URL)
  console.log(response)
  setEmployees(response.data)
 }

 const handleSave = async(employee)=>{
  if(employee.id){
    await axios.put(`${API_URL}/${employee.id}`,employee)

  }else{
    await axios.post(API_URL,employee)
  }
  fetchEmployees();
  setCurrentEmployee(null);
 }
 const handleDelete= async(id)=>{
await axios.delete(`${API_URL}/${id}`)
  fetchEmployees();
 }

 const handleAdd= ()=>{
  setCurrentEmployee({firstName:'',lastName:'',email:''})

 }
 const handleEdit=(employee)=>{
  setCurrentEmployee(employee)
 }
 if(currentEmployee){
  return <EmployeeForm employee={currentEmployee}
      onSave={handleSave}
      onCancel={()=>setCurrentEmployee(null)} />
 }

 return(
  <div className='container'>
    <h2>Employee List</h2>
    <button onClick={handleAdd}>Add Employee</button>
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(emp=>(
          <tr key={emp.id}>
            <td>{emp.firstName}</td>
            <td>{emp.lastName}</td>
            <td>{emp.email}</td>
            <button onClick={()=>handleEdit(emp)}>Edit</button>
            <button onClick={()=>handleDelete(emp.id)}>Delete</button>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
 )

}

const EmployeeForm = ({employee,onSave,onCancel})=>{
  const [formData,setFormData] = useState({...employee})
  const handleSubmit=(e)=>{
    e.preventDefault();
    onSave(formData)
  }
  const handleChange=(e)=>{
    const{name,value}=e.target;
    setFormData(prev=>({...prev,[name]:value}))
  }
  return(
    <form onSubmit={handleSubmit}>
      <h2>{formData.id?'Edit Employee':'Add Employee'}</h2>
      <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder='First Name' required/>
      <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder='Last Name' required/>
      <input name="email" value={formData.email} onChange={handleChange} placeholder='Email ' required/>
      <button type='submit'>Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  )
}

export default App;
