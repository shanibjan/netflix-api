import React, { useEffect, useRef, useState } from "react";
import "./NavBar.css";
import axios from "../../axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { database } from "../../firebase";
import { onValue, ref, remove, set, update } from "firebase/database";

function NavBar(props) {
  console.log(props.userName.state);
  const [userLogin, setUserLogin] = useState([]);
  const navigate = useNavigate();
  const [trend, setTrend] = useState([]);
  const [action, setAction] = useState([]);
  const [doc, setDoc] = useState([]);
  const [horror, setHorror] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [tv, setTv] = useState([]);
  console.log(tv);
  
  const searchitems = useRef();
  let merge = trend.concat(action, doc, horror,comedy,tv);
  useEffect(()=>{
    set(ref(database, 'all'), merge)
  },[merge])
  
  // setTimeout(() => {
  //   localStorage.setItem("all", JSON.stringify(merge));
  // }, 100);
  let relatedKeywordsData = [];
  merge.map((m) => {
    
    relatedKeywordsData.push(m.name || m.title);
  });
  const nav = useNavigate();
  useEffect(() => {
    axios.get(props.trending).then((response) => {
      setTrend(response.data.results);
    });
  }, []);
  useEffect(() => {
    axios.get(props.action).then((response) => {
      setAction(response.data.results);
    });
  }, []);
  useEffect(() => {
    axios.get(props.documents).then((response) => {
      setDoc(response.data.results);
    });
  }, []);
  useEffect(() => {
    axios.get(props.comedy).then((response) => {
      console.log();
      setComedy(response.data.results);
    });
  }, []);
  useEffect(() => {
    axios.get(props.horror).then((response) => {
      setHorror(response.data.results);
    });
  }, []);
  useEffect(() => {
    axios.get(props.tv).then((response) => {
      
      setTv(response.data.results);
    });
  }, []);

  function displayRelatedKeywords(keywords) {
    
    const relatedKeywordsContainer = document.getElementById("relatedKeywords");

    relatedKeywordsContainer.innerHTML = "";
    keywords.forEach((keyword) => {
      // const searchLens=document.querySelector('.search-lens')
      // console.log(searchLens);
      const keywordElement = document.createElement("div");
      keywordElement.style.margin = "30px";
      keywordElement.addEventListener("click", () => {
        const searchInput = document.getElementById("searchInput");
        searchInput.value = keyword;
        relatedKeywordsContainer.style.display = "none";
      });
      keywordElement.textContent = keyword;
      relatedKeywordsContainer.appendChild(keywordElement);
    });
  }
  function handleSearchInput(event) {
    const searchQuery = event.target.value.toLowerCase();
    const matchedKeywords = relatedKeywordsData.filter((keyword) =>
      keyword.toLowerCase().includes(searchQuery)
    );
    displayRelatedKeywords(matchedKeywords);
  }

  const searchInput = document.getElementById("searchInput");
  const relatedKeywordsContainer = document.getElementById("relatedKeywords");
  if (searchInput != null) {
    searchInput.addEventListener("input", handleSearchInput, () => {
      relatedKeywordsContainer.style.display = "block";
    });
  }

  const shadowClick = () => {
    const relatedKeywordsContainer = document.getElementById("relatedKeywords");
    relatedKeywordsContainer.style.display="none"
    let searchPro = searchitems.current.value;
    let split = searchPro.split(" ");
    for (let i = 0; i < split.length; i++) {
      split[i] = split[i].charAt(0).toUpperCase() + split[i].slice(1);
    }
    let a = split.join(" ");

    const res = merge.filter((val) => {
      return val.title == a || val.name == a;
      // console.log(val.title);
    });
    set(ref(database, 'movie-overview'), res)
    nav("/over_view", { state: { name: props.userName.state.name,email:props.userName.state.email} });
    searchitems.current.value=""
  };

  return (
    <div className="navbar">
      <img
        className="logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
        onClick={() => {
          nav("/home", { state: { name: props.userName.state.name,email:props.userName.state.email } });
        }}
      />
      <div className="placeSearch">
        <input
          ref={searchitems}
          type="text"
          id="searchInput"
          placeholder="Search..."
        />
        <div id="relatedKeywords"></div>
        <div onClick={shadowClick} className="search-lense">
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>
      <h3
        onClick={() => {
          nav("/fav_shows", { state: { name: props.userName.state.name,email:props.userName.state.email  } });
        }}
        className="fav-shows"
      >
        Favorite Shows
      </h3>
      <h3 className="user-head">
        {props.userName.state.name != null ? props.userName.state.name : null}
      </h3>
      <button
        onClick={() => {
          setUserLogin(false);
          navigate("/");
          localStorage.removeItem("favorite");
        }}
        className="logout-btn"
      >
        Logout
      </button>
    </div>
  );
}

export default NavBar;
