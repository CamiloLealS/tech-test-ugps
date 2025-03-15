import GameCard from "./gameCard";

const GameList = ({ games }) => {
  return (
    <div className="game-list">
      {games.length > 0 ? (
        games.map((game) => <GameCard key={game.id} game={game} />)
      ) : (
        <p className="game-list-error">
          No se encontraron juegos.
        </p>
      )}
    </div>
  );
};

export default GameList;
