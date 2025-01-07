--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (Debian 16.3-1.pgdg120+1)
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: admin
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO admin;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: admin
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: expenseCategories; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."expenseCategories" (
    id integer NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."expenseCategories" OWNER TO admin;

--
-- Name: expenseCategoriesLimits; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."expenseCategoriesLimits" (
    id integer NOT NULL,
    "categoryId" integer NOT NULL,
    "limit" double precision,
    "userId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."expenseCategoriesLimits" OWNER TO admin;

--
-- Name: expenseCategoriesLimits_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."expenseCategoriesLimits_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."expenseCategoriesLimits_id_seq" OWNER TO admin;

--
-- Name: expenseCategoriesLimits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."expenseCategoriesLimits_id_seq" OWNED BY public."expenseCategoriesLimits".id;


--
-- Name: expenseCategories_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."expenseCategories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."expenseCategories_id_seq" OWNER TO admin;

--
-- Name: expenseCategories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."expenseCategories_id_seq" OWNED BY public."expenseCategories".id;


--
-- Name: expenses; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.expenses (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    "categoryId" integer NOT NULL,
    amount double precision,
    deadline timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "isPaid" boolean DEFAULT true NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.expenses OWNER TO admin;

--
-- Name: expenses_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.expenses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.expenses_id_seq OWNER TO admin;

--
-- Name: expenses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.expenses_id_seq OWNED BY public.expenses.id;


--
-- Name: guestStatuses; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."guestStatuses" (
    id integer NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."guestStatuses" OWNER TO admin;

--
-- Name: guestStatuses_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."guestStatuses_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."guestStatuses_id_seq" OWNER TO admin;

--
-- Name: guestStatuses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."guestStatuses_id_seq" OWNED BY public."guestStatuses".id;


--
-- Name: guests; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.guests (
    id integer NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    "isVege" boolean DEFAULT false NOT NULL,
    "isCompanion" boolean DEFAULT false NOT NULL,
    "isChild" boolean DEFAULT false NOT NULL,
    "canGetThere" boolean DEFAULT false NOT NULL,
    overnight boolean DEFAULT false NOT NULL,
    notes text,
    "guestStatusId" integer DEFAULT 1 NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.guests OWNER TO admin;

--
-- Name: guests_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.guests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.guests_id_seq OWNER TO admin;

--
-- Name: guests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.guests_id_seq OWNED BY public.guests.id;


--
-- Name: mainBudgetLimits; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."mainBudgetLimits" (
    id integer NOT NULL,
    "limit" double precision NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."mainBudgetLimits" OWNER TO admin;

--
-- Name: mainBudgetLimits_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."mainBudgetLimits_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."mainBudgetLimits_id_seq" OWNER TO admin;

--
-- Name: mainBudgetLimits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."mainBudgetLimits_id_seq" OWNED BY public."mainBudgetLimits".id;


--
-- Name: providerCategories; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."providerCategories" (
    id integer NOT NULL,
    "iconId" integer NOT NULL,
    name text NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."providerCategories" OWNER TO admin;

--
-- Name: providerCategories_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."providerCategories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."providerCategories_id_seq" OWNER TO admin;

--
-- Name: providerCategories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."providerCategories_id_seq" OWNED BY public."providerCategories".id;


--
-- Name: providers; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.providers (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    "categoryId" integer NOT NULL,
    amount double precision,
    website text,
    instagram text,
    email text,
    "phoneNumber" text,
    stars integer DEFAULT 1 NOT NULL,
    "isReserved" boolean DEFAULT false NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.providers OWNER TO admin;

--
-- Name: providers_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.providers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.providers_id_seq OWNER TO admin;

--
-- Name: providers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.providers_id_seq OWNED BY public.providers.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users (
    id integer NOT NULL,
    "firstNameBride" text NOT NULL,
    "firstNameGroom" text NOT NULL,
    "lastName" text NOT NULL,
    "weddingDate" timestamp(3) without time zone NOT NULL,
    language text DEFAULT 'en'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.users OWNER TO admin;

--
-- Name: usersLogins; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."usersLogins" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."usersLogins" OWNER TO admin;

--
-- Name: usersLogins_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."usersLogins_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."usersLogins_id_seq" OWNER TO admin;

--
-- Name: usersLogins_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."usersLogins_id_seq" OWNED BY public."usersLogins".id;


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO admin;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: expenseCategories id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."expenseCategories" ALTER COLUMN id SET DEFAULT nextval('public."expenseCategories_id_seq"'::regclass);


--
-- Name: expenseCategoriesLimits id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."expenseCategoriesLimits" ALTER COLUMN id SET DEFAULT nextval('public."expenseCategoriesLimits_id_seq"'::regclass);


--
-- Name: expenses id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.expenses ALTER COLUMN id SET DEFAULT nextval('public.expenses_id_seq'::regclass);


--
-- Name: guestStatuses id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."guestStatuses" ALTER COLUMN id SET DEFAULT nextval('public."guestStatuses_id_seq"'::regclass);


--
-- Name: guests id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.guests ALTER COLUMN id SET DEFAULT nextval('public.guests_id_seq'::regclass);


--
-- Name: mainBudgetLimits id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."mainBudgetLimits" ALTER COLUMN id SET DEFAULT nextval('public."mainBudgetLimits_id_seq"'::regclass);


--
-- Name: providerCategories id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."providerCategories" ALTER COLUMN id SET DEFAULT nextval('public."providerCategories_id_seq"'::regclass);


--
-- Name: providers id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.providers ALTER COLUMN id SET DEFAULT nextval('public.providers_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: usersLogins id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."usersLogins" ALTER COLUMN id SET DEFAULT nextval('public."usersLogins_id_seq"'::regclass);


--
-- Data for Name: expenseCategories; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."expenseCategories" (id, name, "createdAt", "updatedAt") FROM stdin;
1	food	2025-01-03 19:27:46.823	2025-01-03 19:27:46.823
2	place	2025-01-03 19:27:46.823	2025-01-03 19:27:46.823
3	decoration	2025-01-03 19:27:46.823	2025-01-03 19:27:46.823
4	flowers	2025-01-03 19:27:46.823	2025-01-03 19:27:46.823
5	photos	2025-01-03 19:27:46.823	2025-01-03 19:27:46.823
6	music	2025-01-03 19:27:46.823	2025-01-03 19:27:46.823
7	entertainment	2025-01-03 19:27:46.823	2025-01-03 19:27:46.823
8	presents	2025-01-03 19:27:46.823	2025-01-03 19:27:46.823
9	outfits	2025-01-03 19:27:46.823	2025-01-03 19:27:46.823
10	beauty	2025-01-03 19:27:46.823	2025-01-03 19:27:46.823
11	accesories	2025-01-03 19:27:46.823	2025-01-03 19:27:46.823
12	rings	2025-01-03 19:27:46.823	2025-01-03 19:27:46.823
13	accomodation	2025-01-03 19:27:46.823	2025-01-03 19:27:46.823
14	legal	2025-01-03 19:27:46.823	2025-01-03 19:27:46.823
15	transport	2025-01-03 19:27:46.823	2025-01-03 19:27:46.823
16	other	2025-01-03 19:27:46.823	2025-01-03 19:27:46.823
\.


--
-- Data for Name: expenseCategoriesLimits; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."expenseCategoriesLimits" (id, "categoryId", "limit", "userId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: expenses; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.expenses (id, name, description, "categoryId", amount, deadline, "isPaid", "userId", "createdAt", "updatedAt") FROM stdin;
1	Wódka	\N	1	1000	2025-01-03 20:38:44.188	t	1	2025-01-03 20:40:13.011	2025-01-03 20:40:13.011
2	Słodki stół	\N	1	1200	2027-01-03 20:38:44.188	t	1	2025-01-03 20:40:30.286	2025-01-03 20:40:30.286
3	Sala weselna	\N	2	35000	2027-01-03 20:38:44.188	t	1	2025-01-03 20:40:41.87	2025-01-03 20:40:41.87
4	Świeczki	\N	3	550	2027-01-03 20:38:44.188	t	1	2025-01-03 20:41:27.361	2025-01-03 20:41:27.361
5	fotograf	\N	5	5000	2026-01-03 20:38:44.188	t	1	2025-01-03 20:41:50.597	2025-01-03 20:41:50.597
6	Obrązki - warsztaty	\N	12	5000	2025-05-03 20:38:44.188	f	1	2025-01-03 20:42:17.412	2025-01-03 20:42:17.412
7	Szminka	\N	10	60	2024-05-17 20:38:44.188	t	1	2025-01-03 20:43:41.912	2025-01-03 20:43:41.912
\.


--
-- Data for Name: guestStatuses; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."guestStatuses" (id, name, "createdAt", "updatedAt") FROM stdin;
1	created	2025-01-03 19:27:46.817	2025-01-03 19:27:46.817
2	invited	2025-01-03 19:27:46.817	2025-01-03 19:27:46.817
3	accepted	2025-01-03 19:27:46.817	2025-01-03 19:27:46.817
4	rejected	2025-01-03 19:27:46.817	2025-01-03 19:27:46.817
\.


--
-- Data for Name: guests; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.guests (id, "firstName", "lastName", "isVege", "isCompanion", "isChild", "canGetThere", overnight, notes, "guestStatusId", "userId", "createdAt", "updatedAt") FROM stdin;
3	Edyta	Woźniak	f	f	f	t	t	\N	3	1	2025-01-03 20:21:31.566	2025-01-03 20:21:31.566
1	Lena	Woźniak	f	f	f	t	t	\N	3	1	2025-01-03 20:22:32.564	2025-01-03 20:22:32.564
2	Mateusz	Brzóska	f	f	f	t	t	\N	3	1	2025-01-03 20:22:32.564	2025-01-03 20:22:32.564
4	Paweł	Woźniak	f	f	f	t	t	\N	3	1	2025-01-03 20:28:59.926	2025-01-03 20:28:59.926
5	Rafał	Woźniak	f	f	f	t	t	\N	3	1	2025-01-03 20:29:04.327	2025-01-03 20:29:04.327
6	Justyna	Brzóska	f	f	f	t	t	\N	3	1	2025-01-03 20:29:12.156	2025-01-03 20:29:12.156
7	Witold	Brzóska	f	f	f	t	t	\N	3	1	2025-01-03 20:29:37.254	2025-01-03 20:29:37.254
8	Grażyna	Brzóska	f	f	f	t	t	\N	3	1	2025-01-03 20:30:00.438	2025-01-03 20:30:00.438
9	Irena	Antkowiak	f	f	f	t	t	\N	3	1	2025-01-03 20:30:08.096	2025-01-03 20:30:08.096
10	Monika	Antkowiak	f	f	f	t	t	\N	3	1	2025-01-03 20:30:16.167	2025-01-03 20:30:16.167
11	Tomasz	Antkowiak	f	f	f	t	t	\N	3	1	2025-01-03 20:30:22.949	2025-01-03 20:30:22.949
12	Agata	Antkowiak	f	f	f	t	t	\N	3	1	2025-01-03 20:30:26.887	2025-01-03 20:30:26.887
13	Przemysław	Cyl	f	f	f	t	t	\N	3	1	2025-01-03 20:30:35.005	2025-01-03 20:30:35.005
14	Kinga	Ozorkiewicz	f	f	f	t	t	\N	3	1	2025-01-03 20:30:46.541	2025-01-03 20:30:46.541
15	Michał	Ozorkiewicz	f	f	f	t	t	\N	3	1	2025-01-03 20:30:52.125	2025-01-03 20:30:52.125
16	Maria	Woźniak	f	f	f	f	t	\N	3	1	2025-01-03 20:31:18.476	2025-01-03 20:31:18.476
17	Jerzy	Woźniak	f	f	f	f	t	\N	3	1	2025-01-03 20:31:22.857	2025-01-03 20:31:22.857
18	Agnieszka	Rybarczyk	f	f	f	t	t	\N	3	1	2025-01-03 20:31:38.642	2025-01-03 20:31:38.642
19	Przemysław	Rybarczyk	f	f	f	t	t	\N	3	1	2025-01-03 20:31:44.061	2025-01-03 20:31:44.061
20	Maja	Rybarczyk	f	f	t	t	f	\N	3	1	2025-01-03 20:31:59.138	2025-01-03 20:31:59.138
21	Andrzej	Kołpowski	f	f	f	t	f	\N	3	1	2025-01-03 20:32:21.014	2025-01-03 20:32:21.014
22	Ania	Kołpowska	f	f	f	t	f	\N	3	1	2025-01-03 20:32:35.015	2025-01-03 20:32:35.015
23	Artur	Kołpowski	f	f	f	t	f	\N	3	1	2025-01-03 20:32:44.022	2025-01-03 20:32:44.022
24	Karolina	Kołpowska	f	f	f	t	f	\N	3	1	2025-01-03 20:32:50.542	2025-01-03 20:32:50.542
25	Błażej	Czekała	f	f	f	t	t	\N	1	1	2025-01-03 20:33:22.354	2025-01-03 20:33:22.354
26	Paula	Lewandowska-Czekała	f	f	f	t	t	\N	1	1	2025-01-03 20:33:30.364	2025-01-03 20:33:30.364
27	Wojciech	Walczak	f	f	f	t	f	\N	1	1	2025-01-03 20:33:50.91	2025-01-03 20:33:50.91
28	Monika	Singh-Walczak	f	f	f	t	f	\N	1	1	2025-01-03 20:33:58.944	2025-01-03 20:33:58.944
29	Nadia	Plenzler	f	f	f	t	t	\N	1	1	2025-01-03 20:34:22.787	2025-01-03 20:34:22.787
30	Filip	Borkowski	f	f	f	t	t	\N	1	1	2025-01-03 20:34:31.894	2025-01-03 20:34:31.894
31	Paulina	Wójcik	f	f	f	t	t	\N	1	1	2025-01-03 20:34:45.519	2025-01-03 20:34:45.519
32	Michał	Kalinowski	f	f	f	t	t	\N	1	1	2025-01-03 20:34:54.661	2025-01-03 20:34:54.661
33	Alicja	Tacakiewicz	t	f	f	t	t	\N	1	1	2025-01-03 20:35:19.96	2025-01-03 20:35:19.96
34	Jan	Tacakiewicz	f	f	f	t	t	\N	1	1	2025-01-03 20:35:28.522	2025-01-03 20:35:28.522
35	Partner Alicji?	Tacakiewicz	f	t	f	t	t	\N	1	1	2025-01-03 20:35:52.229	2025-01-03 20:35:52.229
36	Partnerka Janka?	Tacakiewicz	f	t	f	t	t	\N	1	1	2025-01-03 20:36:01.3	2025-01-03 20:36:01.3
37	Addam	Cegielski	f	f	f	t	t	\N	1	1	2025-01-03 20:36:23.144	2025-01-03 20:36:23.144
38	Aleksandra	Rabieko	f	t	f	t	t	\N	1	1	2025-01-03 20:36:52.706	2025-01-03 20:36:52.706
\.


--
-- Data for Name: mainBudgetLimits; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."mainBudgetLimits" (id, "limit", "userId", "createdAt", "updatedAt") FROM stdin;
1	50000	1	2025-01-03 20:39:10.554	2025-01-03 20:39:10.554
\.


--
-- Data for Name: expenseCategoriesLimits; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."expenseCategoriesLimits" (id, "categoryId", "limit", "userId", "createdAt", "updatedAt") FROM stdin;
1	1	0	1	2025-01-03 20:39:10.554	2025-01-03 20:39:10.554
2	2	0	1	2025-01-03 20:39:10.554	2025-01-03 20:39:10.554
3	3	0	1	2025-01-03 20:39:10.554	2025-01-03 20:39:10.554
4	4	0	1	2025-01-03 20:39:10.554	2025-01-03 20:39:10.554
5	5	0	1	2025-01-03 20:39:10.554	2025-01-03 20:39:10.554
6	6	0	1	2025-01-03 20:39:10.554	2025-01-03 20:39:10.554
7	7	0	1	2025-01-03 20:39:10.554	2025-01-03 20:39:10.554
8	8	0	1	2025-01-03 20:39:10.554	2025-01-03 20:39:10.554
9	9	0	1	2025-01-03 20:39:10.554	2025-01-03 20:39:10.554
10	10	0	1	2025-01-03 20:39:10.554	2025-01-03 20:39:10.554
11	11	0	1	2025-01-03 20:39:10.554	2025-01-03 20:39:10.554
12	12	0	1	2025-01-03 20:39:10.554	2025-01-03 20:39:10.554
13	13	0	1	2025-01-03 20:39:10.554	2025-01-03 20:39:10.554
14	14	0	1	2025-01-03 20:39:10.554	2025-01-03 20:39:10.554
15	15	0	1	2025-01-03 20:39:10.554	2025-01-03 20:39:10.554
16	16	0	1	2025-01-03 20:39:10.554	2025-01-03 20:39:10.554
\.

--
-- Data for Name: providerCategories; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."providerCategories" (id, "iconId", name, "userId", "createdAt", "updatedAt") FROM stdin;
1	2	Sale weselne	1	2025-01-03 20:46:18.988	2025-01-03 20:46:18.988
2	5	Fotograf	1	2025-01-03 20:46:36.801	2025-01-03 20:46:36.801
\.


--
-- Data for Name: providers; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.providers (id, name, description, "categoryId", amount, website, instagram, email, "phoneNumber", stars, "isReserved", "userId", "createdAt", "updatedAt") FROM stdin;
1	Pałac Śródka	Jedzenie bardzo dobre, sala ładna, Monia i Wojtek zadowoleni. Ma dobrą lokalizację	1	26496	https://palac-srodka.pl/	@palacsrodka	\N	\N	5	t	1	2025-01-03 20:50:37.447	2025-01-03 20:50:37.447
2	Dwór Wierzenica	Piękny, ale sala wydaje się mała (i jest max 80 osób)	1	32500	\N	\N	info@dwor-wierzenica.pl	503503034	5	f	1	2025-01-03 20:52:17.65	2025-01-03 20:52:17.65
3	Przyborowo11	Na żywo brzydko. W dodatku drogo	1	100000000	\N	\N	\N	\N	1	f	1	2025-01-03 20:54:31.66	2025-01-03 20:54:31.66
4	Słoneczko Sieraków	Niby tanio niby ładnie, ale kto by chciał mieć wesele na słoneczku w Sierakowie? xD	1	25000	\N	\N	\N	\N	3	f	1	2025-01-03 20:56:42.258	2025-01-03 20:56:42.258
5	Pałac Szczepowice	ładny namiot mają i jest niedrogo	1	26000	\N	\N	\N	\N	4	f	1	2025-01-03 20:57:47.852	2025-01-03 20:57:47.852
6	Marika Sęowska	Ta od Moni i Wojtka	2	\N	https://www.marikasekowska.pl/	@marikasekowskafotografie	\N	\N	5	f	1	2025-01-03 21:01:33.822	2025-01-03 21:01:33.822
7	Nina&Darek	Bardzo nostalgiczny vibe	2	\N	https://ninaanddarek.com	@ninaanddarek	\N	\N	5	f	1	2025-01-03 21:02:57.722	2025-01-03 21:02:57.722
8	Dominika Miś	W ostateczności xD	2	\N	https://www.dominikamis.com/	@dominikamis_com/	\N	\N	2	f	1	2025-01-03 21:04:14.425	2025-01-03 21:04:14.425
9	Mybestphoto.pl	Ja uważam, że ładne - Nadia nie	2	\N	https://mybestphoto.pl/	@mybestphoto.pl	\N	\N	4	f	1	2025-01-03 21:06:07.401	2025-01-03 21:06:07.401
10	Studio lento fotografia film	Meh	2	\N	\N	@studiolento_fotografia.film	\N	\N	2	f	1	2025-01-03 21:07:20.915	2025-01-03 21:07:20.915
11	Zara Zarachowicz	Robi pięne filmy, ale jest z podlasia XD	2	\N	\N	@zara.zarachowicz	\N	\N	5	f	1	2025-01-03 21:08:28.159	2025-01-03 21:08:28.159
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.users (id, "firstNameBride", "firstNameGroom", "lastName", "weddingDate", language, "createdAt", "updatedAt") FROM stdin;
1	Lena	Mateusz	Brzóska	2027-01-03 19:17:28.919	pl	2025-01-03 19:27:35.822	2025-01-03 19:27:35.822
\.


--
-- Data for Name: usersLogins; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."usersLogins" (id, "userId", email, password, "createdAt", "updatedAt") FROM stdin;
1	1	lenka.wozniak@gmail.com	$2b$10$nIVmSvNAp90h01Oilkrpi.0C8NysLb/u8mJmmKWkgGOZ31.jFnjIu	2025-01-03 19:27:35.876	2025-01-03 19:27:35.876
\.


--
-- Name: expenseCategoriesLimits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."expenseCategoriesLimits_id_seq"', 16, false);


--
-- Name: expenseCategories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."expenseCategories_id_seq"', 16, true);


--
-- Name: expenses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.expenses_id_seq', 7, true);


--
-- Name: guestStatuses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."guestStatuses_id_seq"', 4, true);


--
-- Name: guests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.guests_id_seq', 38, true);


--
-- Name: mainBudgetLimits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."mainBudgetLimits_id_seq"', 1, true);


--
-- Name: providerCategories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."providerCategories_id_seq"', 2, true);


--
-- Name: providers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.providers_id_seq', 11, true);


--
-- Name: usersLogins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."usersLogins_id_seq"', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: expenseCategoriesLimits expenseCategoriesLimits_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."expenseCategoriesLimits"
    ADD CONSTRAINT "expenseCategoriesLimits_pkey" PRIMARY KEY (id);


--
-- Name: expenseCategories expenseCategories_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."expenseCategories"
    ADD CONSTRAINT "expenseCategories_pkey" PRIMARY KEY (id);


--
-- Name: expenses expenses_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT expenses_pkey PRIMARY KEY (id);


--
-- Name: guestStatuses guestStatuses_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."guestStatuses"
    ADD CONSTRAINT "guestStatuses_pkey" PRIMARY KEY (id);


--
-- Name: guests guests_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.guests
    ADD CONSTRAINT guests_pkey PRIMARY KEY (id);


--
-- Name: mainBudgetLimits mainBudgetLimits_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."mainBudgetLimits"
    ADD CONSTRAINT "mainBudgetLimits_pkey" PRIMARY KEY (id);


--
-- Name: providerCategories providerCategories_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."providerCategories"
    ADD CONSTRAINT "providerCategories_pkey" PRIMARY KEY (id);


--
-- Name: providers providers_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.providers
    ADD CONSTRAINT providers_pkey PRIMARY KEY (id);


--
-- Name: usersLogins usersLogins_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."usersLogins"
    ADD CONSTRAINT "usersLogins_pkey" PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: guestStatuses_name_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "guestStatuses_name_key" ON public."guestStatuses" USING btree (name);


--
-- Name: usersLogins_email_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "usersLogins_email_key" ON public."usersLogins" USING btree (email);


--
-- Name: expenseCategoriesLimits expenseCategoriesLimits_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."expenseCategoriesLimits"
    ADD CONSTRAINT "expenseCategoriesLimits_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."expenseCategories"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: expenseCategoriesLimits expenseCategoriesLimits_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."expenseCategoriesLimits"
    ADD CONSTRAINT "expenseCategoriesLimits_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: expenses expenses_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT "expenses_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."expenseCategories"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: expenses expenses_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT "expenses_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: guests guests_guestStatusId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.guests
    ADD CONSTRAINT "guests_guestStatusId_fkey" FOREIGN KEY ("guestStatusId") REFERENCES public."guestStatuses"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: guests guests_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.guests
    ADD CONSTRAINT "guests_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: mainBudgetLimits mainBudgetLimits_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."mainBudgetLimits"
    ADD CONSTRAINT "mainBudgetLimits_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: providerCategories providerCategories_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."providerCategories"
    ADD CONSTRAINT "providerCategories_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: providers providers_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.providers
    ADD CONSTRAINT "providers_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."providerCategories"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: providers providers_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.providers
    ADD CONSTRAINT "providers_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: usersLogins usersLogins_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."usersLogins"
    ADD CONSTRAINT "usersLogins_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: admin
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

