import { useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";


const GameDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    description: "",
    released: "",
    background_image: "",
    genres: [],
    metacritic: "",
    platforms: []
  });
  
  useEffect(() => {const fetchGameDetails = async () => {
      setIsLoading(true);
      const API_KEY = import.meta.env.VITE_API_KEY_RAWG;
      const BASE_URL = "https://api.rawg.io/api/games/";
      let text = "";
      let genresList = [];
      let platList = [];
      const removeHtml = (text) => {
        return text.replace(/<\/?[^>]+(>|$)/g, "");
      };
      try {
          const response = await axios.get(`${BASE_URL}${id}?key=${API_KEY}`);
        setDetails((prev) => ({...prev, name: response.data.name}))
        text = removeHtml(response.data.description)
        setDetails((prev) => ({...prev, description: text}))
        setDetails((prev) => ({...prev, released: response.data.released}))
        setDetails((prev) => ({...prev, background_image: response.data.background_image+'?fm=webp'}))
        response.data.genres.map((genre)=>{
            genresList.push(genre.name);
        })
        response.data.parent_platforms.map((index)=>{
            platList.push(index.platform.name);
        })
        setDetails((prev) => ({...prev, genres: genresList}))
        setDetails((prev) => ({...prev, platforms: platList}))
        setDetails((prev) => ({...prev, metacritic: response.data.metacritic}))
    } catch (error) {
        console.error("Error al obtener detalles:", error);
    }finally{
          setIsLoading(false);
      }

    }
    fetchGameDetails();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      {isLoading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando información...</p>
        </div>
      ) : (
        <div className="game-page">
            <div className="game-header">
                <h1>{details.name}</h1>
            </div>
            <div className="game-content-page">
                <div className="game-info-page">
                {details.background_image ? <img className="game-image-page" loading="lazy" src={details.background_image} alt={details.name} />: null}
                <div className="game-info-page-mini">
                    <p><strong>Fecha de salida:</strong> {details.released}</p>
                    <p><strong>Puntuación:</strong> {details.metacritic}</p>
                    <p><strong>Género(s):</strong> {details.genres.length > 0 ? (
                            details.genres.map((genre, index) => <li key={index}>{genre}</li>)
                        ) : (
                            <li>
                            No se encontraron géneros.
                            </li>
                        )}</p>
                        <p><strong>Plataforma(s)</strong> {details.platforms.length > 0 ? (
                            details.platforms.map((platform, index) => <li key= {index}>{platform}</li>)
                        ) : (
                            <li>
                                No se encontraron plataformas. 
                            </li>
                        ) 
                        }

                        </p>
                    </div>
                
                </div>
                <div className="game-desc-page">
                    <hr />
                    <p><strong>Descripción(sin traducción):</strong></p>
                    <p className="game-description">{details.description}</p>
                    <button onClick={handleBack} className="button-back">Volver a la Lista</button>
                </div>
            </div>
        </div>
      )}
    </div>
  )
}

export default GameDetails;



