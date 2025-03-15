import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY_RAWG;
const GENRES_URL = "https://api.rawg.io/api/genres";
const PLATFORMS_URL = "https://api.rawg.io/api/platforms";	
const DEVELOPERS_URL = "https://api.rawg.io/api/developers";
const TAGS_URL = "https://api.rawg.io/api/tags";


const Filter = ({ filters, setFilters }) => {
  const [genres, setGenres] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    localStorage.setItem("gameFilters", JSON.stringify(filters));
  }, [filters])

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(GENRES_URL, { params: { key: API_KEY } });
        setGenres(response.data.results || []);
      } catch (error) {
        console.error("Error al obtener géneros:", error);
      }
    };
    const fetchPlatforms = async () => {
      try {
        const response = await axios.get(PLATFORMS_URL, { params: { key: API_KEY } });
        setPlatforms(response.data.results || []);
      } catch (error) {
        console.error("Error al obtener plataformas:", error);
      }
    };
    const fetchTags = async () => {
      try {
        const response = await axios.get(TAGS_URL, { params: { key: API_KEY } });
        setTags(response.data.results || []);
      } catch (error) {
        console.error("Error al obtener tags:", error);
      }
    };
    const fetchDevelopers = async () => {
      try {
        const response = await axios.get(DEVELOPERS_URL, { params: { key: API_KEY } });
        setDevelopers(response.data.results || []);
      } catch (error) {
        console.error("Error al obtener empresas:", error);
      }
    };
    

    fetchPlatforms();
    fetchTags();
    fetchDevelopers();
    fetchGenres();
  }, []);

  

  return (
      <>
      <select value={filters.genre} onChange={(e) => setFilters((prev) => ({ ...prev, genre: e.target.value }))}>
          <option value="">Género</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
        <select value={filters.platform} onChange={(e) => setFilters((prev) => ({ ...prev, platform: e.target.value }))}>
          <option value="">Plataforma</option>
          {platforms.map((platform) => (
            <option key={platform.id} value={platform.id}>{platform.name}</option>
          ))}
        </select>
        <select value={filters.developer} onChange={(e) => setFilters((prev) => ({ ...prev, developer: e.target.value }))}>
          <option value="">Desarrollador</option>
          {developers.map((developer) => (
            <option key={developer.id} value={developer.id}>{developer.name}</option>
          ))}
        </select>
        <select value={filters.tag} onChange={(e) => setFilters((prev) => ({ ...prev, tag: e.target.value }))}>
          <option value="">Tags</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>{tag.name}</option>
          ))}
        </select>
        </>
  );
};

export default Filter;
