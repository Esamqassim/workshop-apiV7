import React from 'react';
import { useState, useEffect } from "react";
import HookService from './HookService'
import { useParams, useNavigate } from 'react-router-dom';
function PersonDetails(props) {
    
    const [persons,setPersons] = useState([]);//get & set data from Db
     const { id } = useParams();
     const navigate = useNavigate();
    // useEffect 
    useEffect(()=>{
        // Send get request to API
       // const { id } = useParams();
        const hookService = new HookService();
        hookService.getPersonById(id).then((res)=>{
            console.log("hello happy hackers",res);//Where it displayes!
            if(res.status === 200){
              alert('I am successful put person details!');
                setPersons(res.data);//Move data to function
              
            } else {
                // display error message
                
            }
        });
    
        // update the state
    },[]);

      return (
       <div>
           <h2>Person Details...</h2>
           <p>Id:{persons.id}</p>
          
          <p>Full Name:{persons.firstName} {persons.lastName}</p>
          
            <p>Email:{persons.email}</p>
            <p></p>
            <p>Title:{persons.title}</p>
            <p></p>
         
           <button onClick={() => navigate(-1)}>Back</button>
       </div>
        );
}

export default PersonDetails