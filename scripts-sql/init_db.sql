CREATE DATABASE maseance;

DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS theater;
DROP TABLE IF EXISTS movie;
DROP TABLE IF EXISTS screening;
DROP TABLE IF EXISTS agenda;
DROP TABLE IF EXISTS movie_watchlist;
DROP TABLE IF EXISTS theater_bookmark;

CREATE TABLE "user"  (
  id_user UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pseudo VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE theater (
    id_theater UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    image_path VARCHAR(255),
    booking_path VARCHAR(255) NOT NULL
);

CREATE TABLE movie (
    id_movie UUID PRIMARY KEY,
    id_tmdb VARCHAR(12) UNIQUE NOT NULL
);

CREATE TABLE screening (
    id_screening UUID PRIMARY KEY,
    date DATE NOT NULL,
    id_movie UUID,
    id_theater UUID,
    CONSTRAINT fk_movie FOREIGN KEY (id_movie) REFERENCES movie (id_movie),
    CONSTRAINT fk_theater FOREIGN KEY (id_theater) REFERENCES theater (id_theater)
);

CREATE TABLE agenda (
    id_user UUID,
    id_screening UUID,
    CONSTRAINT fk_user FOREIGN KEY (id_user) REFERENCES "user" (id_user),
    CONSTRAINT fk_screening FOREIGN KEY (id_screening) REFERENCES screening (id_screening)
);

CREATE TABLE movie_watchlist (
    id_user UUID,
    id_movie UUID,
    CONSTRAINT fk_user FOREIGN KEY (id_user) REFERENCES "user" (id_user),
    CONSTRAINT fk_movie FOREIGN KEY (id_movie) REFERENCES movie (id_movie)
);

CREATE TABLE theater_bookmark (
    id_user UUID,
    id_theater UUID,
    CONSTRAINT fk_user FOREIGN KEY (id_user) REFERENCES "user" (id_user),
    CONSTRAINT fk_theater FOREIGN KEY (id_theater) REFERENCES theater (id_theater)
);