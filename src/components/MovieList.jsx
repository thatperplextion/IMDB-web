import React from 'react';
import { FaFilm, FaCalendar, FaStar, FaTimes, FaUser, FaHeart, FaPlay } from 'react-icons/fa';

const MovieList = ({
  filteredMovies,
  viewMode,
  selectedMovie,
  setSelectedMovie,
  searchQuery,
  setSearchQuery,
  selectedGenres,
  toggleGenre,
  hasActiveFilters,
  clearAllFilters,
  favorites,
  toggleFavorite
}) => {
  return (
    <main className="flex-1">
      {/* Results Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {filteredMovies.length} Movies Found
              </span>
              {filteredMovies.length > 0 && (
                <span className="text-sm px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
                  Sorted by {viewMode === 'grid' ? 'Grid' : 'List'}
                </span>
              )}
            </h2>
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mt-2">
                {searchQuery && (
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm flex items-center gap-1 border border-purple-500/30 hover:border-purple-400/50 transition-colors">
                    🔍 {searchQuery}
                    <button onClick={() => setSearchQuery('')} className="hover:text-white ml-1">
                      <FaTimes className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedGenres.map(genre => (
                  <span key={genre} className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full text-sm flex items-center gap-1 border border-purple-500/30 hover:border-purple-400/50 transition-colors">
                    🎬 {genre}
                    <button onClick={() => toggleGenre(genre)} className="hover:text-white ml-1">
                      <FaTimes className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 border border-purple-400/50"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Movies Grid/List */}
      {filteredMovies.length === 0 ? (
        <div className="text-center py-20">
          <div className="relative inline-block">
            <FaFilm className="w-20 h-20 text-purple-400/30 mx-auto mb-4" />
            <div className="absolute inset-0 bg-purple-400/20 blur-xl rounded-full"></div>
          </div>
          <p className="text-xl text-purple-300/70 mb-2">No films found</p>
          <p className="text-purple-400/50 mb-6">Adjust your search to explore CineVerse</p>
          <button
            onClick={clearAllFilters}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 border border-purple-400/50"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
        }>
          {filteredMovies.map(movie => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              viewMode={viewMode}
              onSelect={setSelectedMovie}
              isFavorite={favorites.has(movie.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}

      {/* Movie Detail Modal */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </main>
  );
};

const MovieCard = ({ movie, viewMode, onSelect, isFavorite, onToggleFavorite }) => {
  const getRatingColor = (rating) => {
    if (rating >= 9) return 'text-green-400 border-green-400';
    if (rating >= 8) return 'text-yellow-400 border-yellow-400';
    if (rating >= 7) return 'text-orange-400 border-orange-400';
    return 'text-red-400 border-red-400';
  };

  return (
    <div
      onClick={() => onSelect(movie)}
      className={`bg-black/30 backdrop-blur-xl rounded-2xl border border-purple-500/20 overflow-hidden hover:border-purple-400/50 transition-all duration-500 cursor-pointer group relative ${
        viewMode === 'list' ? 'flex' : ''
      } hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20`}
    >
      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(movie.id);
        }}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
          isFavorite 
            ? 'bg-pink-500/80 text-white border border-pink-400' 
            : 'bg-black/40 text-purple-300 border border-purple-500/30 hover:bg-pink-500/40'
        }`}
      >
        <FaHeart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
      </button>

      {/* Rating Badge */}
      <div className={`absolute top-3 left-3 z-10 px-2 py-1 rounded-full backdrop-blur-sm border ${getRatingColor(movie.rating)} bg-black/40 text-sm font-bold`}>
        {movie.rating}
      </div>

      <div className="relative overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className={`object-cover group-hover:scale-110 transition-transform duration-700 ${
            viewMode === 'grid' ? 'w-full h-80' : 'w-32 h-48'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-purple-500/80 rounded-full text-white text-sm">
            <FaPlay className="w-3 h-3" />
            View Details
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-1">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors line-clamp-1">
          {movie.title}
        </h3>
        <div className="flex items-center gap-4 text-sm text-purple-300 mb-3">
          <span className="flex items-center gap-1">
            <FaCalendar className="w-3 h-3" />
            {movie.year}
          </span>
          <span className="flex items-center gap-1">
            <FaStar className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            {movie.rating}/10
          </span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genres.map(genre => (
            <span key={genre} className="px-2 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded text-xs border border-purple-500/30">
              {genre}
            </span>
          ))}
        </div>
        {viewMode === 'list' && (
          <p className="text-sm text-purple-200/70 line-clamp-2 leading-relaxed">{movie.description}</p>
        )}
      </div>
    </div>
  );
};

const MovieModal = ({ movie, onClose }) => {
  const getRatingColor = (rating) => {
    if (rating >= 9) return 'text-green-400';
    if (rating >= 8) return 'text-yellow-400';
    if (rating >= 7) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-slate-900/95 via-purple-900/95 to-slate-900/95 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/30 backdrop-blur-xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-3 bg-black/50 rounded-full hover:bg-black/70 transition-all duration-300 transform hover:scale-110 border border-purple-500/30"
          >
            <FaTimes className="w-6 h-6 text-white" />
          </button>
          <div className="absolute bottom-4 left-6">
            <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-2xl">{movie.title}</h2>
            <div className="flex items-center gap-6 text-white">
              <span className="flex items-center gap-2 text-lg">
                <FaCalendar className="w-5 h-5 text-purple-300" />
                {movie.year}
              </span>
              <span className={`flex items-center gap-2 text-lg font-bold ${getRatingColor(movie.rating)}`}>
                <FaStar className="w-5 h-5 fill-current" />
                {movie.rating}/10
              </span>
            </div>
          </div>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-purple-400 mb-3">Storyline</h3>
                <p className="text-purple-100 leading-relaxed text-lg">{movie.description}</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-purple-400 mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map(genre => (
                    <span key={genre} className="px-3 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full border border-purple-500/30">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-purple-400 mb-2 flex items-center gap-2">
                  <FaUser className="w-4 h-4" />
                  Director
                </h3>
                <p className="text-white text-lg font-medium">{movie.director}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-purple-400 mb-2 flex items-center gap-2">
                  <FaUser className="w-4 h-4" />
                  Starring
                </h3>
                <p className="text-white leading-relaxed">{movie.actors.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieList;