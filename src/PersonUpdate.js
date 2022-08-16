import React from 'react';
import { useState, useEffect } from "react";
import HookService from './HookService'
import { useParams, useNavigate } from 'react-router-dom';

function PersonUpdate(props) {
    
    const [persons,setPersons] = useState([]);//get & set data from Db
    const { id } = useParams();

    // useEffect 
    useEffect(()=>{
        // Send get request to API
       // const { id } = useParams();
        const hookService = new HookService();
        hookService.getPersonById(id).then((res)=>{
            console.log("Happy day",res);//Where it displayes!
            if(res.status === 200){
              alert('I am successful put person update!');
                setPersons(res.data);//Move data to function
              
            } else {
                // display error message
                
            }
        });
    
        // update the state
    },[]);

    function changeEmployeeData(e){

    }
   

      return (
       <div>
           <h2>Person Update...</h2>
           <p>
           <label>Person ID : <input type="text" name="id" 
              onChange={changeEmployeeData} ></input></label>
           </p>
         
           <button>Update</button>
       </div>
        );
}

export default PersonUpdate