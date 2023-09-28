import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactStars from "react-stars";
import { db } from "../firebase/firebase";
import { ThreeCircles } from "react-loader-spinner";
import Reviews from "./Reviews";
const Details = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    title: "",
    year: "",
    img: "",
    description: "",
    rating: 0,
    rated:0,
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _doc = doc(db, "movie", id);
      const _data = await getDoc(_doc);
      setData(_data.data());
      setLoading(false);
    }
    getData();
    
  }, [id]);
  return (
    <div className="p-4 mt-3 flex flex-col md:flex-row items-center md:items-start w-full justify-center">
      {loading ? (
        <div className="h-96 flex w-full justify-center items-center">
          <ThreeCircles height={30} color="white" />
        </div>
      ) : (
        <>
          <img
            className="h-96 block md:sticky top-24"
            src={data.img}
            alt="movie"
            srcset=""
          />
          <div className="ml-0 md:ml-4 w-full md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-400">
              {data.title}
              <span className="text-xl">({data.year})</span>
            </h1>
            <ReactStars size={20} half={true} value={data.rating/data.rated} edit={false} />
            <p className="mt-2">{data.description}</p>
            <Reviews id={id} prevRating={data.rating} userRated={data.rated}/>
          </div>
        </>
      )}
    </div>
  );
};

export default Details;
