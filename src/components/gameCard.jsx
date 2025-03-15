import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GameCard = ({ game }) => {
    const navigate = useNavigate();

    const handleNavigate = (id) => {
        localStorage.setItem("scrollPosition", window.scrollY);
        navigate(`/game/${id}`);
    };

    useEffect(() => {
        const savedPosition = localStorage.getItem("scrollPosition");
        if (savedPosition) {
          window.scrollTo(0, parseInt(savedPosition, 10)); 
          localStorage.removeItem("scrollPosition");
        }
      }, []);

  return (
    <div className="game-card">
      <div>
        {game.background_image ? (
            <picture className="game-image">
                <source srcSet={game.background_image} type="image/webp" />
                <img loading="lazy" src={game.background_image} alt={game.name}/>
            </picture>
        ) : (
          <div className="no-image">No Image</div>
        )}
      </div>

      <div className="game-info">
        <h3 className="game-info-name">{game.name}</h3>
        {game.metacritic && <p className="metacritic-score">Metacritic: {game.metacritic}</p>}
      </div>

      <div className="game-actions">
        <button onClick={() => handleNavigate(game.id)} className="details-button">Ver Detalles</button>
      </div>
    </div>
  );
};

export default GameCard;
