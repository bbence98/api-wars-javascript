ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS pk_user_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.planet_votes DROP CONSTRAINT IF EXISTS pk_vote_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.planet_votes DROP CONSTRAINT IF EXISTS fk_user_id CASCADE;

DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public.users_id_seq;
CREATE TABLE users (
    id serial NOT NULL,
    username text,
    password text
);

DROP TABLE IF EXISTS public.planet_votes;
DROP SEQUENCE IF EXISTS public.planet_votes_id_seq;
CREATE TABLE planet_votes (
    id serial NOT NULL,
    planet_id integer,
    planet_name text,
    user_id integer,
    submission_time timestamp without time zone
);

ALTER TABLE ONLY users
    ADD CONSTRAINT pk_user_id PRIMARY KEY (id);

ALTER TABLE ONLY planet_votes
    ADD CONSTRAINT pk_vote_id PRIMARY KEY (id);

ALTER TABLE ONLY planet_votes
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id);

INSERT INTO users VALUES (1, 'admin', '$2b$12$5qQoUpX2BLhjFsVzm.9jjeQ3Yt/Iq2MSeS.AmdbuXMxTzzkrAJXRW');
SELECT pg_catalog.setval('users_id_seq', 2, true);

INSERT INTO planet_votes VALUES (1, 1, 'Alderaan', NULL, '2019-10-08 15:36:27');
INSERT INTO planet_votes VALUES (2, 2, 'Yavin IV', NULL, '2019-11-09 05:45:54');
INSERT INTO planet_votes VALUES (3, 3, 'Hoth', NULL, '2019-09-15 12:45:36');
INSERT INTO planet_votes VALUES (4, 4, 'Dagobah', NULL, '2018-06-24 09:16:53');
INSERT INTO planet_votes VALUES (5, 5, 'Bespin', NULL, '2018-04-29 18:30:46');
INSERT INTO planet_votes VALUES (6, 6, 'Endor', NULL, '2018-08-12 20:29:06');
INSERT INTO planet_votes VALUES (7, 7, 'Naboo', NULL, '2017-06-08 22:37:28');
INSERT INTO planet_votes VALUES (8, 8, 'Coruscant', NULL, '2017-03-08 14:38:37');
INSERT INTO planet_votes VALUES (9, 9, 'Kamino', NULL, '2017-02-25 23:16:15');
INSERT INTO planet_votes VALUES (10, 10, 'Geonosis', NULL, '2016-04-21 13:55:43');
SELECT pg_catalog.setval('planet_votes_id_seq', 2, true);

