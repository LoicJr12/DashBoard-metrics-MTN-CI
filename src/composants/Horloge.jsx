import React, { useEffect, useState } from 'react'


  
function Horloge (){
  const [date, setDate] = useState(new Date())
  
  useEffect(()=> {
    const timer = setInterval(
      () => setDate(new Date()),
      1000
    );

    return ()=> {
      clearInterval(timer)
    }
  }, [date, setDate])

  return (
    <div>
        <h2>{date.toLocaleTimeString()}</h2>
    </div>
  );
  }
  
export default Horloge; 