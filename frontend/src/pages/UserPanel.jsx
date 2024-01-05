// import React from 'react'
import axios from "axios";

export default function UserPanel(userID) {

  if (userID) {
    console.log(userID);
    axios
      .post("/user/search", userID.userID)
      .then((result) => {
        console.log(result);
      
        // window.location.href = "/";
      })
      .catch((error) => {
        // setErr(error.response.data);
        console.error(error);
        
      });
  } else {
    // setErr("Email and Password are required");
    console.error("Email and Password are required");
  }



  return (
    <div>
      UserPanel
    </div>
  )
}
