-- Active: 1705399760488@@127.0.0.1@5432@maseance
INSERT INTO theater (id_theater, name, address, image_path, booking_path) VALUES
    ('20cd8109-efaf-472b-aa58-9e38afcdde36', 'C2L Saint-Germain', '25-27-29, rue du Vieux-Marche 78100 Saint-Germain-en-Laye', '/c2l-saint-germain', 'https://www.ugc.fr'),
    ('2b61a248-35cb-42cb-8f43-7b5b6fc50cc5', 'C2L Poissy', '112 Rue du Général de Gaulle 78300 Poissy', '/c2l-poissy', 'https://www.ugc.fr'),
    ('fb7fc394-2d1b-4db3-8a34-cc7595c72e4a', 'UGC Ciné Cité La Défense', 'Le Dôme - Centre commercial Westfield - Les 4 Temps 92092 Puteaux', '/ugc-defense-puteaux', 'https://www.ugc.fr'),
    ('fc6a5a05-0f4c-4c08-b4b7-6a2ebe5c1784', 'Les 5 Caumartin', '101, rue Saint-Lazare 75009 Paris 9e arrondissement', '/5-caumartin-paris', 'https://www.cinqcaumartin.com'),
    ('a0d23849-8402-4f8a-a450-7a2a11f4a221', 'UGC Ciné Cité Les Halles', '7 Place de la Rotonde 75001 Paris', '/ugc-les-halles-paris', 'https://www.ugc.fr'),
    ('22914e4d-6247-40c5-a7a1-dc8cfe3c2bfc', 'UGC Normandie', '116 bis Av. des Champs-Élysées 75008 Paris', '/ugc-normandie-paris', 'https://www.ugc.fr'),
    ('9f51e760-98f0-4a3f-9613-b3603d61e536', 'Publicis Cinémas', '129, av. des Champs-Elysées 75008 Paris 8e arrondissement', '/publicis-paris', 'https://www.publiciscinemas.com/films/'),
    ('cf21273d-1c18-47c6-a3cf-6868e19e826f', 'Elysées Lincoln', '14 Rue Lincoln 75008 Paris', '/lincoln-paris', 'https://www.lelincoln.com'),
    ('4bb2dca3-54c5-4b9d-aab9-d3c5a2dc342f', 'Les 3 Luxembourg', '67 Rue Monsieur le Prince, 75006 Paris', '/3-luxembourg-paris', 'https://www.lestroisluxembourg.com'),
    ('1843fd4d-b565-49a3-af12-0f9cf2e230dc', 'La Filmothèque du Quartier Latin', '9 Rue Champollion, 75005 Paris', '/filmotheque-paris', 'https://www.lafilmotheque.fr'),
    ('7f84b271-7da1-4892-930d-94b8c183e7df', 'Le Champo - Espace Jacques Tati', '51, rue des Ecoles 75005 Paris', '/champo-paris', 'https://www.cinema-lechampo.com'),
    ('36fe0edf-ef8c-46a3-a454-5743dbb6ad94', 'Reflet Médicis', '3 Rue Champollion, 75005 Paris', '/reflet-medicis-paris', 'https://dulaccinemas.com/cinema/2950/reflet-medicis/seances'),
    ('8df4d12b-aecc-47df-9c0f-22c51e7ebe3d', 'Écoles Cinéma Club', '23, rue des Ecoles 75005 Paris', '/ecole-cinema-paris', 'https://pariscinemaclub.com/ecoles-cinema-club/'),
    ('6a53f0c2-364a-409f-8ac5-64e8535c0e7e', 'Le Grand Action', '5 Rue des Écoles, 75005 Paris', '/grand-action-paris', 'https://www.legrandaction.com'),
    ('43819f64-bf0a-4ed3-807e-9ab7e05e98ed', 'MK2 Bibliothèque', '128-162 avenue de France 75013 Paris', '/mk2-bibliotheque-paris', 'https://www.mk2.com/salle/mk2-bibliotheque'),
    ('12fd4f09-8f7b-4809-a6fb-674e1d698ad1', 'Pathé Angers', '1, avenue des Droits de l''Homme 49000 Angers', '/pathe-angers', 'https://www.pathe.fr/cinemas/cinema-pathe-angers'),
    ('08b0b2a6-fb0e-4c05-95c5-6751861e46b3', 'Les 400 Coups', '12, rue jeanne Moreau 49000 Angers', '/400-coups-angers', 'https://www.les400coups.org'),
    ('321b3e62-0768-43ff-90aa-92d6d2c3e8a0', 'UGC Ciné Cité Strasbourg Etoile', '25, avenue du Rhin 67100 Strasbourg', '/ugc-etoile-strasbourg', 'https://www.ugc.fr'),
    ('c7264c48-1551-479d-8af1-d7b1ff568ad9', 'Mégarex Haguenau', 'route du Rhin-za du taubenhof 67500 Haguenau', '/megarex-haguenau', 'https://www.megarex.fr/pages/a-laffiche-3.html'),
    ('66e71fa7-3a3a-4377-b0e8-12f36a2cc89b', 'Le Cosmos Strasbourg', '3, rue des Francs-Bourgeois 67000 Strasbourg', '/cosmos-strasbourg', 'https://cinema-cosmos.eu'),
    ('07b79e0e-e6e7-45b0-84b3-7e39f0b4844d', 'Star Saint-Exupery', '18, rue du 22-Novembre 67000 Strasbourg', '/star-st-ex-strasbourg', 'https://www.cinema-star.com/');

CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO "user" (id_user, pseudo, email, password) VALUES
    ('8e0c9f29-3d07-4c61-a2ff-5e405e7c40c3', 'Rachel', 'rachel_green@example.com', crypt('password1', gen_salt('bf'))),
    ('7b00a15d-7c78-44fc-a4b8-b920b88f4a41', 'Ross', 'ross_geller@example.com', crypt('password2', gen_salt('bf'))),
    ('3658f41e-4d56-4980-93a9-621eab2ad3b2', 'Monica', 'monica_geller@example.com', crypt('password3', gen_salt('bf'))),
    ('f1cf04f7-6c9b-48b7-91a4-fa4df90bfdbf', 'Chandler', 'chandler_bing@example.com', crypt('password4', gen_salt('bf'))),
    ('4d747e8b-e950-4e63-8203-4f5ff7b67211', 'Joey', 'joey_tribbiani@example.com', crypt('password5', gen_salt('bf'))),
    ('e6dcf476-1182-48d8-87e4-f9678fc8cfc4', 'Phoebe', 'phoebe_buffay@example.com', crypt('password6', gen_salt('bf')));

INSERT INTO movie (id_movie, id_tmdb) VALUES
    ('0d1aef7d-d76a-4d14-9461-d6470b7c4de9', '1011985'),
    ('aaae3e9d-16f3-4924-b1de-4bb227d52949', '693134'),
    ('f1545604-573e-4d46-9644-0279b1967e2c', '437342'),
    ('b90c3b68-cb48-47bb-bbe9-66b2b594e9f2', '1125311'),
    ('8b5d52f4-c87d-4be8-a4ec-0e55a82b176b', '1192209'),
    ('d31a8dc9-1c72-4a77-b6ef-1e94af9c14a1', '967847'),
    ('c81e81b2-5f8b-47dc-b015-96a2aa53c81b', '957304'),
    ('be641c4f-36c0-4be2-b9d4-b7eef79767b4', '998022'),
    ('e0af423d-d6c4-4cb7-aa2c-28e4c00d66d3', '976584'),
    ('e143963a-6228-4459-96a6-fa2dd2207a24', '1026227'),
    ('077d8717-75a3-468e-aeab-3a3e0e54b57b', '975773'),
    ('3be8cb2a-4f19-458a-a1ad-4f1da23ac87c', '959395'),
    ('77e425f7-6a53-477a-bb70-d3e104b8edc8', '964877'),
    ('ac6199a2-4a8d-43bb-9ac6-3023f7d93da7', '1010639');

INSERT INTO movie_watchlist (id_user, id_movie) VALUES
    ('8e0c9f29-3d07-4c61-a2ff-5e405e7c40c3', '0d1aef7d-d76a-4d14-9461-d6470b7c4de9'),
    ('8e0c9f29-3d07-4c61-a2ff-5e405e7c40c3', 'aaae3e9d-16f3-4924-b1de-4bb227d52949'),
    ('7b00a15d-7c78-44fc-a4b8-b920b88f4a41', 'f1545604-573e-4d46-9644-0279b1967e2c'),
    ('7b00a15d-7c78-44fc-a4b8-b920b88f4a41', 'b90c3b68-cb48-47bb-bbe9-66b2b594e9f2'),
    ('3658f41e-4d56-4980-93a9-621eab2ad3b2', '8b5d52f4-c87d-4be8-a4ec-0e55a82b176b'),
    ('3658f41e-4d56-4980-93a9-621eab2ad3b2', 'd31a8dc9-1c72-4a77-b6ef-1e94af9c14a1'),
    ('f1cf04f7-6c9b-48b7-91a4-fa4df90bfdbf', 'c81e81b2-5f8b-47dc-b015-96a2aa53c81b'),
    ('f1cf04f7-6c9b-48b7-91a4-fa4df90bfdbf', 'be641c4f-36c0-4be2-b9d4-b7eef79767b4'),
    ('4d747e8b-e950-4e63-8203-4f5ff7b67211', 'e0af423d-d6c4-4cb7-aa2c-28e4c00d66d3'),
    ('4d747e8b-e950-4e63-8203-4f5ff7b67211', 'e143963a-6228-4459-96a6-fa2dd2207a24'),
    ('e6dcf476-1182-48d8-87e4-f9678fc8cfc4', '077d8717-75a3-468e-aeab-3a3e0e54b57b'),
    ('e6dcf476-1182-48d8-87e4-f9678fc8cfc4', '3be8cb2a-4f19-458a-a1ad-4f1da23ac87c');


INSERT INTO screening (id_screening, date, id_movie, id_theater) VALUES
    ('8e37450f-e746-4b38-8b44-88944df0372a', '2024-04-10 15:00:00', '0d1aef7d-d76a-4d14-9461-d6470b7c4de9', '20cd8109-efaf-472b-aa58-9e38afcdde36'),
    ('07e4c502-741f-4455-b54a-890a2951c65d', '2024-04-10 18:00:00', '0d1aef7d-d76a-4d14-9461-d6470b7c4de9', '20cd8109-efaf-472b-aa58-9e38afcdde36'),
    ('f3cabbf5-2fe3-4a53-af14-0d15b8e4fe57', '2024-04-11 16:30:00', 'aaae3e9d-16f3-4924-b1de-4bb227d52949', '2b61a248-35cb-42cb-8f43-7b5b6fc50cc5'),
    ('57f4b33f-2b23-47d1-8c26-f774d7fb3f7e', '2024-04-12 17:00:00', 'f1545604-573e-4d46-9644-0279b1967e2c', 'fb7fc394-2d1b-4db3-8a34-cc7595c72e4a'),
    ('d9df9b94-9f67-41e5-8891-0bb7dbcc0d14', '2024-04-12 20:00:00', 'b90c3b68-cb48-47bb-bbe9-66b2b594e9f2', 'fc6a5a05-0f4c-4c08-b4b7-6a2ebe5c1784'),
    ('29a1b764-8da3-4e47-b5d8-6c1f68d0d226', '2024-04-13 19:30:00', '8b5d52f4-c87d-4be8-a4ec-0e55a82b176b', 'a0d23849-8402-4f8a-a450-7a2a11f4a221'),
    ('71e1767d-3497-4327-8c4e-c8d83e85f10e', '2024-04-13 22:00:00', 'd31a8dc9-1c72-4a77-b6ef-1e94af9c14a1', '22914e4d-6247-40c5-a7a1-dc8cfe3c2bfc'),
    ('acefc5a3-ef9f-4fae-af13-b687961b3aa2', '2024-04-14 18:45:00', 'c81e81b2-5f8b-47dc-b015-96a2aa53c81b', '9f51e760-98f0-4a3f-9613-b3603d61e536'),
    ('9e1d4a7d-5b14-41d9-af63-8d4f032da07d', '2024-04-14 21:15:00', 'be641c4f-36c0-4be2-b9d4-b7eef79767b4', 'cf21273d-1c18-47c6-a3cf-6868e19e826f'),
    ('d48b3b9c-225a-4b37-b14f-d89cfb787f4d', '2024-04-15 14:00:00', 'e0af423d-d6c4-4cb7-aa2c-28e4c00d66d3', '4bb2dca3-54c5-4b9d-aab9-d3c5a2dc342f'),
    ('c5fe9b19-b5f5-4665-8559-4a6a41df9963', '2024-04-15 17:30:00', 'e143963a-6228-4459-96a6-fa2dd2207a24', '1843fd4d-b565-49a3-af12-0f9cf2e230dc'),
    ('f50ec679-12bb-4d9b-b96c-1b9b9e9442d9', '2024-04-16 20:30:00', '077d8717-75a3-468e-aeab-3a3e0e54b57b', '7f84b271-7da1-4892-930d-94b8c183e7df'),
    ('e44f24af-45a5-4c27-8629-279a1507c0de', '2024-04-16 22:45:00', '3be8cb2a-4f19-458a-a1ad-4f1da23ac87c', '36fe0edf-ef8c-46a3-a454-5743dbb6ad94'),
    ('16ae89bc-ee10-4f95-853e-8dc832f3bb75', '2024-04-17 15:15:00', '77e425f7-6a53-477a-bb70-d3e104b8edc8', '8df4d12b-aecc-47df-9c0f-22c51e7ebe3d'),
    ('22b992b3-4b1e-45b1-a10f-4e0cc139a214', '2024-04-17 18:00:00', 'ac6199a2-4a8d-43bb-9ac6-3023f7d93da7', '43819f64-bf0a-4ed3-807e-9ab7e05e98ed'),
    ('01e87aa7-d94b-47e3-9b1d-305c5b810f1b', '2024-04-18 16:30:00', '0d1aef7d-d76a-4d14-9461-d6470b7c4de9', '321b3e62-0768-43ff-90aa-92d6d2c3e8a0'),
    ('8cf004a1-82ad-47af-aa4a-b2c891e3deae', '2024-04-18 19:00:00', 'aaae3e9d-16f3-4924-b1de-4bb227d52949', 'c7264c48-1551-479d-8af1-d7b1ff568ad9'),
    ('1578a609-eb4f-4a8f-bb34-99d8d8f35f69', '2024-04-19 21:00:00', 'f1545604-573e-4d46-9644-0279b1967e2c', '66e71fa7-3a3a-4377-b0e8-12f36a2cc89b'),
    ('59d20ee3-7eb2-4dd7-bf32-47d421666f31', '2024-04-19 23:30:00', 'b90c3b68-cb48-47bb-bbe9-66b2b594e9f2', '07b79e0e-e6e7-45b0-84b3-7e39f0b4844d');

INSERT INTO theater_bookmark (id_user, id_theater) VALUES
    ('8e0c9f29-3d07-4c61-a2ff-5e405e7c40c3', 'cf21273d-1c18-47c6-a3cf-6868e19e826f'),
    ('8e0c9f29-3d07-4c61-a2ff-5e405e7c40c3', '7f84b271-7da1-4892-930d-94b8c183e7df'),
    ('8e0c9f29-3d07-4c61-a2ff-5e405e7c40c3', '36fe0edf-ef8c-46a3-a454-5743dbb6ad94'),
    ('8e0c9f29-3d07-4c61-a2ff-5e405e7c40c3', '8df4d12b-aecc-47df-9c0f-22c51e7ebe3d'),
    ('7b00a15d-7c78-44fc-a4b8-b920b88f4a41', '43819f64-bf0a-4ed3-807e-9ab7e05e98ed'),
    ('7b00a15d-7c78-44fc-a4b8-b920b88f4a41', '321b3e62-0768-43ff-90aa-92d6d2c3e8a0'),
    ('7b00a15d-7c78-44fc-a4b8-b920b88f4a41', 'c7264c48-1551-479d-8af1-d7b1ff568ad9'),
    ('7b00a15d-7c78-44fc-a4b8-b920b88f4a41', '66e71fa7-3a3a-4377-b0e8-12f36a2cc89b'),
    ('3658f41e-4d56-4980-93a9-621eab2ad3b2', '07b79e0e-e6e7-45b0-84b3-7e39f0b4844d'),
    ('3658f41e-4d56-4980-93a9-621eab2ad3b2', '66e71fa7-3a3a-4377-b0e8-12f36a2cc89b'),
    ('3658f41e-4d56-4980-93a9-621eab2ad3b2', '43819f64-bf0a-4ed3-807e-9ab7e05e98ed'),
    ('3658f41e-4d56-4980-93a9-621eab2ad3b2', '321b3e62-0768-43ff-90aa-92d6d2c3e8a0'),
    ('f1cf04f7-6c9b-48b7-91a4-fa4df90bfdbf', '66e71fa7-3a3a-4377-b0e8-12f36a2cc89b'),
    ('f1cf04f7-6c9b-48b7-91a4-fa4df90bfdbf', '07b79e0e-e6e7-45b0-84b3-7e39f0b4844d'),
    ('f1cf04f7-6c9b-48b7-91a4-fa4df90bfdbf', '66e71fa7-3a3a-4377-b0e8-12f36a2cc89b'),
    ('f1cf04f7-6c9b-48b7-91a4-fa4df90bfdbf', '07b79e0e-e6e7-45b0-84b3-7e39f0b4844d'),
    ('4d747e8b-e950-4e63-8203-4f5ff7b67211', '43819f64-bf0a-4ed3-807e-9ab7e05e98ed'),
    ('4d747e8b-e950-4e63-8203-4f5ff7b67211', '321b3e62-0768-43ff-90aa-92d6d2c3e8a0'),
    ('4d747e8b-e950-4e63-8203-4f5ff7b67211', '07b79e0e-e6e7-45b0-84b3-7e39f0b4844d'),
    ('4d747e8b-e950-4e63-8203-4f5ff7b67211', '66e71fa7-3a3a-4377-b0e8-12f36a2cc89b'),
    ('e6dcf476-1182-48d8-87e4-f9678fc8cfc4', '321b3e62-0768-43ff-90aa-92d6d2c3e8a0'),
    ('e6dcf476-1182-48d8-87e4-f9678fc8cfc4', '66e71fa7-3a3a-4377-b0e8-12f36a2cc89b'),
    ('e6dcf476-1182-48d8-87e4-f9678fc8cfc4', '43819f64-bf0a-4ed3-807e-9ab7e05e98ed'),
    ('e6dcf476-1182-48d8-87e4-f9678fc8cfc4', '07b79e0e-e6e7-45b0-84b3-7e39f0b4844d');

INSERT INTO agenda (id_user, id_screening) VALUES
    ('8e0c9f29-3d07-4c61-a2ff-5e405e7c40c3', '07e4c502-741f-4455-b54a-890a2951c65d'),
    ('8e0c9f29-3d07-4c61-a2ff-5e405e7c40c3', 'e44f24af-45a5-4c27-8629-279a1507c0de'),
    ('7b00a15d-7c78-44fc-a4b8-b920b88f4a41', '9e1d4a7d-5b14-41d9-af63-8d4f032da07d'),
    ('7b00a15d-7c78-44fc-a4b8-b920b88f4a41', '01e87aa7-d94b-47e3-9b1d-305c5b810f1b'),
    ('3658f41e-4d56-4980-93a9-621eab2ad3b2', '71e1767d-3497-4327-8c4e-c8d83e85f10e'),
    ('3658f41e-4d56-4980-93a9-621eab2ad3b2', '1578a609-eb4f-4a8f-bb34-99d8d8f35f69'),
    ('4d747e8b-e950-4e63-8203-4f5ff7b67211', '07e4c502-741f-4455-b54a-890a2951c65d'),
    ('4d747e8b-e950-4e63-8203-4f5ff7b67211', 'e44f24af-45a5-4c27-8629-279a1507c0de'),
    ('4d747e8b-e950-4e63-8203-4f5ff7b67211', '9e1d4a7d-5b14-41d9-af63-8d4f032da07d'),
    ('4d747e8b-e950-4e63-8203-4f5ff7b67211', '01e87aa7-d94b-47e3-9b1d-305c5b810f1b');

