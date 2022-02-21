import React, { useState } from "react";
import {BiSearchAlt2} from "react-icons/bi"
const Search = ({navigate}) => {
  const [keyword, setKeyword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if(keyword.trim()){
        navigate(`/search/${keyword}`, {require: true});
    }else{
        console.log("else", keyword);
        navigate("/", {require: true});
    }
  };
  return (
    <>
      <form onSubmit={submitHandler} className="w-100">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Type here and search products..."
          />
          <button
            type="submit"
            className="input-group-text btn btn-warning"
            id="basic-addon1"
          >
            <BiSearchAlt2 size={20} />
          </button>
        </div>
      </form>
    </>
  );
};

export default Search;
