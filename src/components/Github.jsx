import React, {useState,useEffect}from "react";
import axios from "axios"
const Github =()=>{
  const[loading,setLoading]=useState(true);
const[data,setData]=useState([]);
const[error,setError]=useState(false);
const[parameters,setParameters]=useState({
 query:"masai",
 page:1,
 perPage:5
});
const[text,setText]=useState("");
useEffect(()=>{
 getUsers(parameters);
},[parameters]);

const getUsers=({query="masai",page,perPage})=>{
 console.log(1);
 setLoading(true);
 return axios({
      url:"https://api.github.com/search/users",
      params:{
      q:query,
      page:page,
      per_page:perPage,
      }
 })

  .then((res)=>{
    setData(res.data.items);
    setLoading(false);
  })
  .catch((err)=>{ 
    setError(true);
    setLoading(false);
  });
  }
  const handleClick=()=>{
    setParameters({
      ... parameters,
     query:text
    });
  };
  if(loading){
    return <div>Loading</div>   
  }
  if(error){
    // return <div>Something went wronge</div>   
  }

  return (
    <>
        <div>
            <input
            value={text}
            onChange={(e)=>setText(e.target.value)}
            placeholder="username"
            />
    
            <button onClick={handleClick} > Search </button>
        </div>


        
        
        <div>
          <button
          disabled={parameters.page===1}
        
            onClick={()=>
              setParameters({parameters,page:parameters.page=parameters.page-1})
            }
            >
            prev
            </button>
    
            <button
              onClick={()=>
                setParameters({... parameters,page:parameters.page=parameters.page+1})
              }
              
              >
              next
            </button>
        </div>
        {data.map((item)=>(
          <div key={item.id} >
              <h3>{item.login}</h3>
              <img width="50px" alt={item.Login} src={item.avatar}/>
          </div>
          ))
        }
      
    </>
      

      
        

    

   )

}

export default Github;