import React, { useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import HookService from  './HookService';

const CrudFinal = () => {
    const [persons,setPersons] = useState([]);
    const [message, setMessage] = useState({value: '', type: ''});
    const [reload, setReload] = useState(false);

     // useEffect 
     useEffect(()=>{
        // Send get request to API
        const hookService = new HookService();
        hookService.findAll().then((res)=>{
            console.log("hello happy hackers",res);
            if(res.status === 200){
                setPersons(res.data);
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
        };

        const TableAction = (props)=> {
            
            const history = useNavigate()

            const showData = () => {
            history(`/details/${props.id}`);
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

            }

            const update = () => {
                history(`/updates/${props.id}`);
            }

            return (
            <div>
                <button type="button" className="btn btn-dark" onClick={showData} >Details</button>
                <button type="button" className="btn btn-dark m-2" onClick={deleteById}>Delete</button>
                <button type="button" className="btn btn-dark" onClick={update}>Edit</button>
            </div>)
        };

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
        };

        return(  //Table return***************************
            <div className="container">
                <table className="table table-striped table-dark">
                    <TableHeader/>
                    <TableRow />
                </table>
            </div>
            );
    };

    return ( //Crud return
    <div className="container">
        {message && <h6 className={'alert alert-secondary' + message.type}>{message.value}</h6> }
        <h4>Join us and add yourself</h4>
       
        <h4>Person list</h4>
        <Table />
    </div>
);
}//End  CrudFinal

export default CrudFinal