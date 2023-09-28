import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { addDoc } from "firebase/firestore";
import { moviesRef } from "../firebase/firebase";
import swal from "sweetalert";
import { Appstate } from "../App";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const useAppstate = useContext(Appstate)
  const navigate = useNavigate()
    const [form, setForm] = useState({
        title:"",
        year:"",
        description:"",
        img:"",
        rated:0,
        rating:0
    })
    const [loading, setLoading] = useState(false)

    const addMovie = async ()=> {
      setLoading(true);
      try {
        if(useAppstate.login){
        await addDoc(moviesRef,form)
        swal({
          title:"Successfully Added",
          icon:"success",
          buttons:true,
          timer:3000
        })
        navigate('/')
      }else{
        navigate('/login')
      }
      } catch (error) {
        swal({
          title:error,
          icon:"error",
          buttons:true,
          timer:3000
        })
      }
      setForm({
        title:"",
        year:"",
        description:"",
        img:""
    })
      setLoading(false);
    }
  return (
    <div>
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-6">
            <h1 class="sm:text-3xl text-xl font-medium title-font mb-4 text-white">
              Add New Movie
            </h1>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="title" class="leading-7 text-sm text-gray-600">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={(e)=>setForm({...form,title: e.target.value})}
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    data-ddg-inputtype="identities.fullName"
                  />
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="year" class="leading-7 text-sm text-gray-600">
                    Year
                  </label>
                  <input
                    type="text"
                    id="year"
                    name="year"
                    value={form.year}
                    onChange={(e)=>setForm({...form,year: e.target.value})}
                    class="stylemovie w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    data-ddg-inputtype="identities.emailAddress"
                    data-ddg-autofill="true"
                  />
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="img" class="leading-7 text-sm text-gray-600">
                    Image Link
                  </label>
                  <input
                    type="text"
                    id="img"
                    name="img"
                    value={form.img}
                    onChange={(e)=>setForm({...form,img: e.target.value})}
                    class="stylemovie w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    data-ddg-inputtype="identities.emailAddress"
                    data-ddg-autofill="true"
                  />
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-gray-600">
                    Description
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.description}
                    onChange={(e)=>setForm({...form,description: e.target.value})}
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div class="p-2 w-full">
                <button onClick={addMovie} class="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
                  {loading?<TailSpin height={25} color="white" />:"Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddMovie;
