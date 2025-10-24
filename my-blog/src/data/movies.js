// Sample movie data
const moviesData = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    year: 1994,
    rating: 9.3,
    director: "Frank Darabont",
    actors: ["Tim Robbins", "Morgan Freeman"],
    genres: ["Drama"],
    poster: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg",
    description: "Two imprisoned men bond over years, finding redemption through acts of common decency."
  },
  {
    id: 2,
    title: "The Godfather",
    year: 1972,
    rating: 9.2,
    director: "Francis Ford Coppola",
    actors: ["Marlon Brando", "Al Pacino", "James Caan"],
    genres: ["Crime", "Drama"],
    poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    description: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son."
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    director: "Christopher Nolan",
    actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    genres: ["Action", "Crime", "Drama"],
    poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    description: "Batman must accept one of the greatest psychological and physical tests to fight injustice."
  },
  {
    id: 4,
    title: "Pulp Fiction",
    year: 1994,
    rating: 8.9,
    director: "Quentin Tarantino",
    actors: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    genres: ["Crime", "Drama"],
    poster: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    description: "The lives of two mob hitmen, a boxer, and a pair of diner bandits intertwine."
  },
  {
    id: 5,
    title: "Forrest Gump",
    year: 1994,
    rating: 8.8,
    director: "Robert Zemeckis",
    actors: ["Tom Hanks", "Robin Wright"],
    genres: ["Drama", "Romance"],
    poster: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    description: "The presidencies of Kennedy and Johnson unfold through the perspective of an Alabama man."
  },
  {
    id: 6,
    title: "Inception",
    year: 2010,
    rating: 8.8,
    director: "Christopher Nolan",
    actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    genres: ["Action", "Sci-Fi", "Thriller"],
    poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    description: "A thief who steals corporate secrets through dream-sharing technology."
  },
  {
    id: 7,
    title: "The Matrix",
    year: 1999,
    rating: 8.7,
    director: "Lana Wachowski",
    actors: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    genres: ["Action", "Sci-Fi"],
    poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality."
  },
  {
    id: 8,
    title: "Goodfellas",
    year: 1990,
    rating: 8.7,
    director: "Martin Scorsese",
    actors: ["Robert De Niro", "Ray Liotta", "Joe Pesci"],
    genres: ["Crime", "Drama"],
    poster: "https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    description: "The story of Henry Hill and his life in the mob."
  },
  {
    id: 9,
    title: "Interstellar",
    year: 2014,
    rating: 8.6,
    director: "Christopher Nolan",
    actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    genres: ["Adventure", "Drama", "Sci-Fi"],
    poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    description: "A team of explorers travel through a wormhole in space to ensure humanity's survival."
  },
  {
    id: 10,
    title: "The Lion King",
    year: 1994,
    rating: 8.5,
    director: "Roger Allers",
    actors: ["Matthew Broderick", "Jeremy Irons", "James Earl Jones"],
    genres: ["Animation", "Adventure", "Drama"],
    poster: "https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_SX300.jpg",
    description: "Lion prince Simba flees his kingdom after the murder of his father."
  },
  {
    id: 11,
    title: "Avengers: Endgame",
    year: 2019,
    rating: 8.4,
    director: "Anthony Russo",
    actors: ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"],
    genres: ["Action", "Adventure", "Sci-Fi"],
    poster: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg",
    description: "The Avengers take one final stand in this grand conclusion to the Infinity Saga."
  },
  {
    id: 12,
    title: "Parasite",
    year: 2019,
    rating: 8.6,
    director: "Bong Joon Ho",
    actors: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
    genres: ["Comedy", "Drama", "Thriller"],
    poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    description: "A poor family schemes to become employed by a wealthy family and infiltrate their household."
  },
  {
    id: 13,
    title: "Spirited Away",
    year: 2001,
    rating: 8.6,
    director: "Hayao Miyazaki",
    actors: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki"],
    genres: ["Animation", "Adventure", "Family"],
    poster: "https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    description: "A young girl wanders into a world ruled by gods, witches, and spirits."
  }
];

export default moviesData;