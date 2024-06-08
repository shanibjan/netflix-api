import React, { useEffect } from "react";
import './Home.css'
import NavBar from "../NavBar/NavBar";
import Banner from "../Banner/Banner";
import RowPost from "../RowPost/RowPost";
import { useLocation } from "react-router-dom";
let trending='trending/all/week?api_key=cf6943474b7b12c83b4f25bf4a0c76f8&language=en-US'
let action='discover/movie?api_key=cf6943474b7b12c83b4f25bf4a0c76f8&with_genres=28'
let documents='discover/movie?api_key=cf6943474b7b12c83b4f25bf4a0c76f8&with_genres=99'
let horror='discover/movie?api_key=cf6943474b7b12c83b4f25bf4a0c76f8&with_genres=27'
let tv='discover/tv?api_key=cf6943474b7b12c83b4f25bf4a0c76f8'
let comedy='discover/movie?api_key=cf6943474b7b12c83b4f25bf4a0c76f8&with_genres=35'

function Home() {
  const location = useLocation();
  console.log(location.state);
  
    
  return (
    
      <div>
        {location.state !=null ?(
        <span>
      <NavBar
        action={action}
        trending={trending}
        documents={documents}
        horror={horror}
        comedy={comedy}
        tv={tv}
        userName={location}
      />
      
          <Banner userName={location} />
      <RowPost title={"Trending"} url={trending} userName={location} />
      <RowPost title={"Action"} url={action} isSmall userName={location} />
      <RowPost title={"Documentry"} url={documents} userName={location} />
      <RowPost title={"Horror"} url={horror} isSmall userName={location} />
      <RowPost title={"Comedy"} url={comedy} isSmall userName={location} />
      <RowPost title={"Television Shows"} url={tv} isSmall userName={location} />
        </span>
      ):<h1 className="not-found" >404 not found</h1>}
      
    </div>
    
  );
}

export default Home;
