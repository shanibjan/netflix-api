import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { database } from "../../firebase";
import { onValue, ref, remove, set, update } from "firebase/database";
function Banner({ userName }) {
  console.log(userName);
  const[all,setAll]=useState([])
  const imageUrl = "https://image.tmdb.org/t/p/original";
  const nav = useNavigate();
  useEffect(() => {
    onValue(ref(database, "all"), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const datas = Object.values(data);
        setAll(datas);
      }
    });
  }, []);

 
  let movie = all[Math.floor(Math.random() * all.length)];
  const bannerMovie = () => {
    let movieArray=[]
    movieArray.push(movie)
    set(ref(database, 'movie-overview'), movieArray)
    nav("/over_view", {
      state: { name: userName.state.name ,email:userName.state.email},
    });
    
  };

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : ""})`,
      }}
    >
      <div className="fade_bottom-login"></div>
      <div className="content">
        <h1 className="title">{movie ? movie.title || movie.name : null}</h1>
        <div className="banner_buttons">
          <button onClick={bannerMovie} className="button">
            View Details
          </button>
          <button className="button">My list</button>
        </div>
        <h1 className="description">{movie ? movie.overview : null}</h1>
      </div>
      <div className="fade_bottom"></div>
    </div>
  );
}

export default Banner;
