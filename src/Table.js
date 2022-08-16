import ReactDOM from "react-dom";
import React, { Component, useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import HookService from './HookService'
import PersonDetails from './PersonDetails'
import PersonUpdate from './PersonUpdate'
import { useForm } from 'react-hook-form';

function Crud(){
  //const [employees,setEmployees]=useState([]);
  //
  const [persons,setPersons] = useState([]);//get & set data from Db
  const [message, setMessage] = useState({value: '', type: ''});
  const [reload, setReload] = useState(false);
  //Test useeffect
  useEffect(()=>{
    alert('We are in useEffect function');
    fetch("https://localhost::44342/People/")
      .then(res => res.json())
      .then(
        (result) => {
         // setEmployees(result);
        }
      );
  },[]);

  //Assignment useeffect
   // useEffect 
   useEffect(()=>{
    // Send get request to API
    const hookService = new HookService();
    hookService.findAll().then((res)=>{
        console.log("hello happy hackers",res);//Where it displayes!
        if(res.status === 200){
          alert('We are in HookService class');
            setPersons(res.data);//Move data to function
            setMessage({value: 'Operation find all.. Done!', type: 'success'});
        } else {
            // display error message
            setMessage({value: 'Operation is Failed!', type: 'danger'});
        }
    });

    // update the state
},[reload]);

const Table = () => {

  const TableHeader = ()=> {
    return (
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Title</th>
                <th>Action</th>
            </tr>
        </thead>
        )
  }//End TableHeader

  const TableAction = (props)=> {

    const history = useNavigate()

    const showData = () => {
      history(`/PersonDetails/${props.id}`);
      }

      const deleteById = () => {
        // step 1 = define service class
        const hookService = new HookService();
        hookService.deletePersonById(props.id).then(res => {
            if(res.status === 202 ){
                setMessage({value: 'Delete is Done! (id:' + props.id + ')', type: 'success'});
                // reload fetch all person
                setReload(!reload);
            }else {
                setMessage({value: 'API Error: '+ res.status, type: 'danger'})
            }
        });

    }//End deleteById

    const update = () => {
        history(`/PersonUpdate/${props.id}`);
       
    }


      return (
        <div>
            <button type="button" className="btn btn-dark" onClick={showData} >Details</button>
            <button type="button" className="btn btn-dark m-2" onClick={deleteById}>Delete</button>
            <button type="button" className="btn btn-dark" onClick={update}>Edit</button>
            
        </div>)

  }//End table action

  const TableRow = ()=> {
    return (
        <tbody>
        {
            persons.map( (person)=> (
                <tr key={person.id}>
                    <td>{person.id}</td>
                    <td>{person.firstName} {person.lastName}</td>
                    <td>{person.email}</td>
                    <td>{person.title}</td>
                    <td><TableAction id={person.id} /></td>
                </tr>
            ))   
        }                     
        </tbody>
    )
}//End TableRow

return(  //Table return***************************
<div className="container">
    <table className="table table-striped table-dark">
        <TableHeader/>
        <TableRow />
    </table>
</div>
)

}//End Table

const Form = () => {

  const {register, handleSubmit, reset, formState: {errors} } = useForm();

  const savePerson = (data) => {
      console.log(data);
      // call  API
      const hookService = new HookService();
      hookService.savePerson(data).then(res => {
          if(res.status === 201){
              // Display message
              setMessage({value: 'Done for person Id:' + res.data.id , type: 'success'});
               // update the state = reload the useEffect
              setReload(!reload);
          }else {
              // displays an error message
              setMessage({value: 'Error:'+ res.status, type: 'danger'});
          }
      });
  }
    /*************''*/
    return(  //Form return
    <>
        <form className="form-control m-2 p-3 bg-dark" onSubmit={handleSubmit(savePerson)}>
            <div className="row mb-3">
                <div className="col-6">
                    <input type="text" className="form-control" {...register("firstName", {required: true})} placeholder="Enter FirstName" />
                    {errors.firstName && <span className="text-danger">FirstName is Required!</span>}
                </div>
                <div className="col-6">
                    <input type="text" className="form-control" {...register("lastName", {required: true})} placeholder="Enter LastName" />
                    {errors.lastName && <span className="text-danger">LastName is Required!</span>}
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <input type="text" className="form-control" {...register("email", {required: true})} placeholder="Enter Email" />
                    {errors.email && <span className="text-danger">Email is Required!</span>}
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <input type="text" className="form-control" {...register("title")} placeholder="Enter Title" />
                </div>
            </div>  
            <button type="submit" className="btn btn-dark">Add</button>
            
            <button type="button" className="btn btn-dark m-2" onClick={()=> reset() }>Reset</button>
        </form>
    </>
);


}
  
  return(//Crud return
    <div>
       <Form />
      <h2>People Data...</h2>
      <Table />
    </div>
  )
}//End Crud

//const element=<EmployeeComponent></EmployeeComponent>

//ReactDOM.render(element,document.getElementById("root"));

export default Crud