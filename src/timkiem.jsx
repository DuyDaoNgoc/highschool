import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchCourses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      try {
        const response = await fetch(
          `https://676a0b77863eaa5ac0dd3616.mockapi.io/api/v1/courses?name=${searchTerm}`
        );
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
        } else {
          console.error("Failed to fetch search results");
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  const handleCourseClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleSearch}
        placeholder="Search for courses"
      />
      <div>
        {searchResults.map((course) => (
          <div key={course.id} onClick={() => handleCourseClick(course.id)}>
            <h3>{course.name}</h3>
            <p>{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchCourses;
