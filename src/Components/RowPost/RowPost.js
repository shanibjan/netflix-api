import React, { useEffect, useState } from "react";
import axios from "../../axios";
import "./RowPost.css";
import "../../Pages/LoginO.css";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { database } from "../../firebase";
import { onValue, ref, remove, set, update } from "firebase/database";
import { uid } from "uid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function RowPost(props) {
  // let favouriteShows = JSON.parse(localStorage.getItem("favorite"));
  const [movies, setMovies] = useState([]);
  const imageUrl = "https://image.tmdb.org/t/p/original";
  const nav = useNavigate();
  const [movie, setMovie] = useState([]);
  const [fav, setFav] = useState([]);
  const [love, setlove] = useState(false);
  console.log(love);

  useEffect(() => {
    axios.get(props.url ? props.url : null).then((response) => {
      setMovies(response.data.results);
    });
  }, []);
  console.log(movies);
  // console.log(fav);
  useEffect(() => {
    //  setlove(commonElements)
  }, []);

  // console.log(commonElements);

  useEffect(() => {
    onValue(ref(database, "favourites"), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const datas = Object.values(data);
        setFav(datas);
      } else {
        setFav([]);
      }
    });
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     let rowPost = document.querySelectorAll(".jaa");
  //     for (let i = 0; i < rowPost.length; i++) {
  //       let img = rowPost[i].childNodes[0];
  //       img.addEventListener("mouseenter", () => {
  //         img.style.transform = "scale(1.1)";
  //         img.style.transition = ".3s cubic-bezier(0.075, 0.82, 0.165, 1)";
  //       });

  //       img.addEventListener("mouseleave", () => {
  //         img.style.transform = "scale(1)";
  //         img.style.transition = ".3s cubic-bezier(0.075, 0.82, 0.165, 1)";
  //       });
  //     }
  //   }, 100);
  // }, []);
  let newFav=[]
  fav.map((f)=>{
    if(f.userEmail==props.userName.state.email){
      newFav.push(f)
    }
  })
  console.log(newFav);
  return (
    <div className="row">
      <h2 className="title-card">{props.title}</h2>
      <div className="posters">
        {movies.map((movie) => {
          return (
              
            
              
              <div className="poster-main">
                

                
                <div className="jaa">
                {newFav.map((i)=>{
                  if(i.id==movie.id){ 
                     return(
                      <div className="heart">

                        <FontAwesomeIcon icon={faHeart} />
                      </div>
                     )
                    
                  }
                })}
                  
                  <img 
                    onClick={() => {
                      let movieDetail = [];
                      movieDetail.push(movie);
                      set(ref(database, 'movie-overview'), movieDetail)
                      // localStorage.setItem("search", JSON.stringify(movieDetail));
                      nav("/over_view", {
                        state: { name: props.userName.state.name,email:props.userName.state.email },
                      });
                      // setTimeout(() => {
                      //   window.location.reload();
                      // }, 300);
                    }}
                    className={props.isSmall ? "smallPoster transition ease-in-out hover:scale-110" : "poster transition ease-in-out hover:scale-110"}
                    alt="poster"
                    src={
                      props.isSmall
                        ? imageUrl + movie.poster_path
                        : imageUrl + movie.backdrop_path
                    }
                  />
                </div>
                <h2 className={props.isSmall ? "" : "heading"}>
                  {props.isSmall ? "" : movie.name || movie.title}
                </h2>
                <h5 className={props.isSmall ? "small-heading" : ""}>
                  {props.isSmall ? movie.name || movie.title : ""}
                </h5>
              </div>
          
          );
        })}
      </div>
    </div>
  );
}

export default RowPost;
