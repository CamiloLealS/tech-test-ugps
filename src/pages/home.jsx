import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SearchBar from "../components/searchBar";
import Filter from "../components/filter";
import { useDebounce } from "@uidotdev/usehooks";
import GameList from "../components/gameList";
import Pagination from "../components/pagination";
import YearFilter from "../components/yearFilter";

const API_KEY = import.meta.env.VITE_API_KEY_RAWG;
const BASE_URL = "https://api.rawg.io/api/games";

const Home = () => {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(Number(localStorage.getItem('lastVisitedPage')) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState(() => {
    return JSON.parse(localStorage.getItem("gameFilters")) || { search: "", genre: "", platform: "", developer: "", tag: "", year: "" };
  });

  const resetFilters = () => {
    setFilters({
      search: "",
      genre: "",
      platform: "",
      developer: "",
      tag: "",
      year: ""
    });
    localStorage.setItem("gameFilters", JSON.stringify({search: "", genre: "", platform: "", developer: "", tag: "", year: ""}));
    setCurrentPage(1);
  };
  
  const debouncedSearch = useDebounce(filters.search, 500);

  useEffect(() => {
    localStorage.setItem("lastVisitedPage", currentPage);
  }, [currentPage]);
  
  const fetchGames = useCallback(async () => {
    let date;
    if (filters.year !== "") {
        date = `${filters.year}-01-01,${filters.year}-12-31`;	
    }
    try {
      const params = {
        key: API_KEY,
        ordering: "-metacritic",
        page: currentPage,
        page_size: 25,
        genres: filters.genre || undefined,
        platforms: filters.platform || undefined,
        developers: filters.developer || undefined,
        tags: filters.tag || undefined,
        dates: date || undefined
      };

      if (debouncedSearch.trim()) {
        params.search = debouncedSearch;
      }
      const response = await axios.get(BASE_URL, { params });
      setGames(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 25));
    } catch (error) {
      console.error("Error al obtener juegos:", error);
    }
  }, [filters, debouncedSearch, currentPage]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);
  
  return (
    <div>
      <h1 className="title-home">VideoJuegos</h1>
      <div className="filters-container">
        <SearchBar filters = {filters} setFilters = {setFilters}/>
        <hr />
        <div className="filters">
          <Filter filters = {filters} setFilters = {setFilters}/>
          <YearFilter filters = {filters} setFilters = {setFilters}/>
          <button onClick={resetFilters}> Limpiar Filtros </button>
        </div>
      </div>
      <GameList games={games} currentPage= {currentPage} />
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages = {totalPages}/>
  </div>
  );
};

export default Home;
