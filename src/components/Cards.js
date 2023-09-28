import { getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import ReactStars from "react-stars";
import { moviesRef } from "../firebase/firebase";
import { Link } from "react-router-dom";
const Cards = () => {
  const [data, setData] = useState([]);
  const[loading, setLoading] = useState(true)

  useEffect(()=>{
    async function getData(){
      setLoading(true);
      const _data = await getDocs(moviesRef);
      _data.forEach((doc)=>{
        setData((prv)=>[...prv,{...(doc.data()), id : doc.id}])
      })
      setLoading(false);
    }
    getData();
  },[])
  return (
      <div className="flex flex-wrap justify-around px-3 mt-2">
    {loading?<div className="w-full flex  justify-center items-center h-96"><ThreeDots height={60} color="white" /></div>:
      data.reverse().map((e, i) => {
        return (
    <Link to={`/details/${e.id}`} className="mt-3">
          <div
            key={i}
            className="card-class card font-medium shadow-lg p-2 hover:-translate-y-3 cursor-pointer transition-all duration-600"
          >
            <img className="h-60 md:h-72" src={e.img} alt="movie" srcset="" />
            <h1 className="title-class flex items-center">
              <div className="movie-title">{e.title}</div>
            </h1>
            <h1 className="flex items-center">
              <span className="text-gray-600 mr-1">Rating:</span>
              <ReactStars size={20} half={true} value={e.rating/e.rated} edit={false}/>
            </h1>
            <h1>
              <span className="text-gray-600">Year: </span>
              {e.year}
            </h1>
          </div>
    </Link>

        );
      })
    }
      </div>
  );
};

export default Cards;
