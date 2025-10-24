import React from 'react';
import { FaSearch, FaSlidersH, FaChevronDown } from 'react-icons/fa';
// Remove FaUser from the import

const Filters = ({
  searchQuery,
  setSearchQuery,
  selectedGenres,
  toggleGenre,
  selectedDirectors,
  toggleDirector,
  selectedActors,
  toggleActor,
  minRating,
  setMinRating,
  yearRange,
  setYearRange,
  sortBy,
  setSortBy,
  allGenres,
  allDirectors,
  allActors,
  hasActiveFilters,
  clearAllFilters
}) => {
  return (
    <div className="bg-black/40 backdrop-blur-md rounded-xl border border-purple-500/20 p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <FaSlidersH className="w-5 h-5 text-purple-400" />
          Filters
        </h2>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-purple-300 mb-2">Search</label>
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movies..."
            className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition-colors"
          />
        </div>
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-purple-300 mb-2">Sort By</label>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white appearance-none focus:outline-none focus:border-purple-400 transition-colors cursor-pointer"
          >
            <option value="rating">Rating (High to Low)</option>
            <option value="year">Year (Newest First)</option>
            <option value="title">Title (A-Z)</option>
          </select>
          <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400 pointer-events-none" />
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-purple-300 mb-2">
          Minimum Rating: {minRating.toFixed(1)}
        </label>
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={minRating}
          onChange={(e) => setMinRating(parseFloat(e.target.value))}
          className="w-full accent-purple-500"
        />
      </div>

      {/* Year Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-purple-300 mb-2">
          Year: {yearRange[0]} - {yearRange[1]}
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            min="1970"
            max="2025"
            value={yearRange[0]}
            onChange={(e) => setYearRange([parseInt(e.target.value), yearRange[1]])}
            className="w-1/2 px-3 py-2 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-400"
          />
          <input
            type="number"
            min="1970"
            max="2025"
            value={yearRange[1]}
            onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])}
            className="w-1/2 px-3 py-2 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-400"
          />
        </div>
      </div>

      {/* Genres */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-purple-300 mb-2">Genres</label>
        <div className="flex flex-wrap gap-2">
          {allGenres.map(genre => (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                selectedGenres.includes(genre)
                  ? 'bg-purple-500 text-white'
                  : 'bg-slate-800/50 text-purple-300 hover:bg-slate-700/50'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Directors */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-purple-300 mb-2">Directors</label>
        <div className="max-h-48 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
          {allDirectors.map(director => (
            <label key={director} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedDirectors.includes(director)}
                onChange={() => toggleDirector(director)}
                className="w-4 h-4 accent-purple-500"
              />
              <span className="text-sm text-purple-200 group-hover:text-white transition-colors">
                {director}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Actors */}
      <div>
        <label className="block text-sm font-medium text-purple-300 mb-2">Actors</label>
        <div className="max-h-48 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
          {allActors.map(actor => (
            <label key={actor} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedActors.includes(actor)}
                onChange={() => toggleActor(actor)}
                className="w-4 h-4 accent-purple-500"
              />
              <span className="text-sm text-purple-200 group-hover:text-white transition-colors">
                {actor}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;