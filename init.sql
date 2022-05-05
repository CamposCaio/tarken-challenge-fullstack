--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3323 (class 1262 OID 16385)
-- Name: moovy; Type: DATABASE; Schema: -; Owner: admin
--

CREATE DATABASE moovy WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE moovy OWNER TO admin;

\connect moovy

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 211 (class 1259 OID 16392)
-- Name: movie; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.movie (
    id integer NOT NULL,
    "imdbID" character varying NOT NULL,
    title character varying NOT NULL,
    "imdbRating" character varying(7) NOT NULL,
    "imageSrc" character varying(127) NOT NULL,
    "audioSrc" character varying(127),
    deleted boolean DEFAULT false NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.movie OWNER TO admin;

--
-- TOC entry 210 (class 1259 OID 16391)
-- Name: movie_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.movie_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.movie_id_seq OWNER TO admin;

--
-- TOC entry 3324 (class 0 OID 0)
-- Dependencies: 210
-- Name: movie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.movie_id_seq OWNED BY public.movie.id;


--
-- TOC entry 209 (class 1259 OID 16386)
-- Name: typeorm_metadata; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.typeorm_metadata (
    type character varying NOT NULL,
    database character varying,
    schema character varying,
    "table" character varying,
    name character varying,
    value text
);


ALTER TABLE public.typeorm_metadata OWNER TO admin;

--
-- TOC entry 3170 (class 2604 OID 16395)
-- Name: movie id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.movie ALTER COLUMN id SET DEFAULT nextval('public.movie_id_seq'::regclass);


--
-- TOC entry 3317 (class 0 OID 16392)
-- Dependencies: 211
-- Data for Name: movie; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.movie (id, "imdbID", title, "imdbRating", "imageSrc", "audioSrc", deleted, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 3315 (class 0 OID 16386)
-- Dependencies: 209
-- Data for Name: typeorm_metadata; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.typeorm_metadata (type, database, schema, "table", name, value) FROM stdin;
\.


--
-- TOC entry 3325 (class 0 OID 0)
-- Dependencies: 210
-- Name: movie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.movie_id_seq', 1, false);


--
-- TOC entry 3175 (class 2606 OID 16402)
-- Name: movie PK_cb3bb4d61cf764dc035cbedd422; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.movie
    ADD CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY (id);

--
-- PostgreSQL database dump complete
--
