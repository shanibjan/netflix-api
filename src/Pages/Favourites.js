import React, { useEffect, useState } from "react";
import "./Favourites.css";
import './LoginO.css'
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import NavBar from "../Components/NavBar/NavBar";
import { database } from "../firebase";
import { onValue, ref, remove, set, update } from "firebase/database";
import { motion } from "framer-motion";
let trending =
  "trending/all/week?api_key=cf6943474b7b12c83b4f25bf4a0c76f8&language=en-US";
let action =
  "discover/movie?api_key=cf6943474b7b12c83b4f25bf4a0c76f8&with_genres=28";
let documents =
  "discover/movie?api_key=cf6943474b7b12c83b4f25bf4a0c76f8&with_genres=99";
let horror =
  "discover/movie?api_key=cf6943474b7b12c83b4f25bf4a0c76f8&with_genres=27";
let tv = "discover/tv?api_key=cf6943474b7b12c83b4f25bf4a0c76f8";
let comedy =
  "discover/movie?api_key=cf6943474b7b12c83b4f25bf4a0c76f8&with_genres=35";

function Favourites() {
  const loc=useLocation()
  const location = useLocation();
  const [fav, setFav] = useState([]);
  console.log(fav);
  const imageUrl = "https://image.tmdb.org/t/p/original";
  let favouriteShows = JSON.parse(localStorage.getItem("favorite"));
  const nav = useNavigate();

  useEffect(() => {
    onValue(ref(database, "favourites"), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const datas = Object.values(data);
        setFav(datas);
      }else{
        setFav([])
      }
    });
  }, []);
  useEffect(() => {
    setTimeout(() => {
      var a = document.querySelectorAll(".fav-show-sub");
      for (let i = 0; i < a.length; i++) {
        let img = a[i].childNodes[0];
        let cross = img.childNodes[1];
        img.addEventListener("mouseenter", () => {
          cross.style.display = "block";
        });

        img.addEventListener("mouseleave", () => {
          cross.style.display = "none";
        });
      }
    }, 100);
  });

  const cancel = (favShows) => {
    

    remove(ref(database, "favourites" + `/${favShows.uuid}`));
  };

  const newFav=[]
  fav.map((f)=>{
    if(f.userEmail==loc.state.email){
      newFav.push(f)
    }
  })
  console.log(newFav);

  return (
    <>
      <NavBar
        action={action}
        trending={trending}
        documents={documents}
        horror={horror}
        comedy={comedy}
        tv={tv}
        userName={location}
      />

      <div className="favourite-show-main">
        {newFav ? (
          newFav.map((favShows, index) => {
            return (
              <div className="fav-show-sub">
                <motion.div
                  
                  className="image-fav-sub transition ease-in-out hover:scale-110"
                >
                  <img
                    onClick={() => {
                      let movieDetail = [];
                      movieDetail.push(favShows);
                      set(ref(database, "movie-overview"), movieDetail);
                      nav("/over_view", {
                        state: { name: location.state.name,email:location.state.email },
                      });
                    }}
                    src={favShows ? imageUrl + favShows.poster : null}
                    alt=""
                    className="fav-show-poster"
                  />
                  <div
                    onClick={() => {
                      cancel(favShows);
                    }}
                    className="remove-cross"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </div>
                </motion.div>

                <h1 className="fav-show-heading">
                  {favShows ? favShows.name : null}
                </h1>
              </div>
            );
          })
        ) : (
          <h1 className="no-res">No Favourites Added Yet</h1>
        )}
      </div>
      <div></div>
    </>
  );
}

export default Favourites;
