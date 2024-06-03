import React, { useEffect,useState } from 'react'
export default function Home() {
  const [posts,setPosts]=useState([]);
  async function getPost(){
    try{
      const token = localStorage.getItem('token');
      const response=await fetch('http://localhost:5000/api/post',{
        method:"GET",
        headers: {
          'Authorization':token
        }
      });
      if(response.status===200){
        let data=await response.json();
        setPosts(data.result);
      }
      if(response.status!==200){
        throw new Error("error");
      }
    }
    catch(e){
      throw new Error({e:"error in middleware"});
    }
  }
  useEffect(()=>{
    getPost();
  },[])
  return (
    <div>

        {
          posts && posts.length && posts.map((item,index)=>{
            return <div
            key={index}
            className="blog m-2 w-full sm:w-1/2 h-dvh sm:mx-auto sm:my-5 md:w-1/3 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg shadow-pink-500/50 p-6 rounded-lg transform transition duration-500 hover:scale-105"
          >
            <div className="text-center text-2xl font-extrabold my-3 text-white">
              {item.title}
            </div>
            <div className="text-white leading-relaxed">
              {item.content}
            </div>
          </div>
          })
      
        }
    </div>
  )
}
