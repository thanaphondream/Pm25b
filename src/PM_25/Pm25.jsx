import axios from "axios";
import React, { use, useEffect, useState } from "react";

function Pm25() {
  const [ nesc, setNesc ] = useState([])
  
  useEffect(() => {
    const nesc_fn = async () => {
      try{
        const rs = await axios.get('https://nesc.nier.go.kr:38032/api/GK2/L4/PM25-SURFACE/data/getFileDateList.do?sDate=202503091642&eDate=202503101642&format=json&key=api-447967f4bab74a8ea26c92a53a7cf4aa')
        console.log(rs)
      }catch(err){
        console.log(err)
      }
    }
    nesc_fn()
  })

  return(
    <div>
      <p>Hello</p>
    </div>
  )
};
export default Pm25;
