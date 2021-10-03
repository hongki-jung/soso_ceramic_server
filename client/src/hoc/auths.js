import Axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';

import {auth} from '../_actions/user_actions'
export default function(SpecificComponent, option, adminRoute= null){


  function AuthenticatinoCheck(props){

    const dispatch = useDispatch()

    useEffect(()=>{
      disptach(auth()).then(response =>{
        

        // 로그인하지 않은 상태
        if (!response.payload.isAuth){
          if(option){
            props.history.push("/login")
          }else{
            // 로그인한 상태 , 어드민인 경우 
       
          }
        }


      })
      Axios.get("/api/users/auth")
    })
  }
}