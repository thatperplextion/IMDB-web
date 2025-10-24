import React, { useState, useMemo, useCallback } from 'react';
import { FaFilm, FaTh, FaList, FaSlidersH, FaHeart, FaStar } from 'react-icons/fa';
import moviesData from './data/movies';
import Filters from './components/Filters';
import MovieList from './components/MovieList';

function EnhancedMovieApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedDirectors, setSelectedDirectors] = useState([]);
  const [selectedActors, setSelectedActors] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [yearRange, setYearRange] = useState([1970, 2025]);
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showFilters, setShowFilters] = useState(true);
  const [favorites, setFavorites] = useState(new Set());

  // Extract unique values
  const allGenres = useMemo(() => 
    [...new Set(moviesData.flatMap(m => m.genres))].sort(),
    []
  );
  
  const allDirectors = useMemo(() => 
    [...new Set(moviesData.map(m => m.director))].sort(),
    []
  );
  
  const allActors = useMemo(() => 
    [...new Set(moviesData.flatMap(m => m.actors))].sort(),
    []
  );

  // Filter and sort movies
  const filteredMovies = useMemo(() => {
    let result = moviesData.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           movie.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenres = selectedGenres.length === 0 || 
                           selectedGenres.every(g => movie.genres.includes(g));
      const matchesDirector = selectedDirectors.length === 0 || 
                             selectedDirectors.includes(movie.director);
      const matchesActors = selectedActors.length === 0 || 
                           selectedActors.some(a => movie.actors.includes(a));
      const matchesRating = movie.rating >= minRating;
      const matchesYear = movie.year >= yearRange[0] && movie.year <= yearRange[1];
      
      return matchesSearch && matchesGenres && matchesDirector && 
             matchesActors && matchesRating && matchesYear;
    });

    result.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'year') return b.year - a.year;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

    return result;
  }, [searchQuery, selectedGenres, selectedDirectors, selectedActors, minRating, yearRange, sortBy]);

  const toggleGenre = useCallback((genre) => {
    setSelectedGenres(prev => 
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  }, []);

  const toggleDirector = useCallback((director) => {
    setSelectedDirectors(prev => 
      prev.includes(director) ? prev.filter(d => d !== director) : [...prev, director]
    );
  }, []);

  const toggleActor = useCallback((actor) => {
    setSelectedActors(prev => 
      prev.includes(actor) ? prev.filter(a => a !== actor) : [...prev, actor]
    );
  }, []);

  const toggleFavorite = useCallback((movieId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(movieId)) {
        newFavorites.delete(movieId);
      } else {
        newFavorites.add(movieId);
      }
      return newFavorites;
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedGenres([]);
    setSelectedDirectors([]);
    setSelectedActors([]);
    setMinRating(0);
    setYearRange([1970, 2025]);
  }, []);

  const hasActiveFilters = searchQuery || selectedGenres.length > 0 || 
                          selectedDirectors.length > 0 || selectedActors.length > 0 || 
                          minRating > 0 || yearRange[0] !== 1970 || yearRange[1] !== 2025;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="bg-black/20 backdrop-blur-xl border-b border-purple-500/30 sticky top-0 z-40 relative">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <FaFilm className="w-8 h-8 text-purple-400 animate-pulse" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-ping"></div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
                MovieHub
              </h1>
              <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
                {moviesData.length} Movies
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-purple-300 text-sm">
                <FaHeart className="w-4 h-4 text-pink-400" />
                <span>{favorites.size} Favorites</span>
              </div>
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 group"
              >
                {viewMode === 'grid' ? 
                  <FaList className="w-5 h-5 text-purple-300 group-hover:text-purple-200 transition-colors" /> : 
                  <FaTh className="w-5 h-5 text-purple-300 group-hover:text-purple-200 transition-colors" />
                }
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden p-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300"
              >
                <FaSlidersH className="w-5 h-5 text-purple-300" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6 relative">
        {/* Sidebar Filters */}
        <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-80 space-y-4 transition-all duration-300`}>
          <Filters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedGenres={selectedGenres}
            toggleGenre={toggleGenre}
            selectedDirectors={selectedDirectors}
            toggleDirector={toggleDirector}
            selectedActors={selectedActors}
            toggleActor={toggleActor}
            minRating={minRating}
            setMinRating={setMinRating}
            yearRange={yearRange}
            setYearRange={setYearRange}
            sortBy={sortBy}
            setSortBy={setSortBy}
            allGenres={allGenres}
            allDirectors={allDirectors}
            allActors={allActors}
            hasActiveFilters={hasActiveFilters}
            clearAllFilters={clearAllFilters}
          />
        </aside>

        {/* Main Content */}
        <MovieList
          filteredMovies={filteredMovies}
          viewMode={viewMode}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedGenres={selectedGenres}
          toggleGenre={toggleGenre}
          hasActiveFilters={hasActiveFilters}
          clearAllFilters={clearAllFilters}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      </div>
    </div>
  );
}

export default EnhancedMovieApp;