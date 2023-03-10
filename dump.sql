PGDMP                         z            shortly    14.5    14.5                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            	           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            
           1262    24978    shortly    DATABASE     g   CREATE DATABASE shortly WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE shortly;
                postgres    false            ?            1259    25021    public.sessions    TABLE     {   CREATE TABLE public."public.sessions" (
    id integer NOT NULL,
    token text NOT NULL,
    "userId" integer NOT NULL
);
 %   DROP TABLE public."public.sessions";
       public         heap    postgres    false            ?            1259    25020    public.sessions_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."public.sessions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public."public.sessions_id_seq";
       public          postgres    false    212                       0    0    public.sessions_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."public.sessions_id_seq" OWNED BY public."public.sessions".id;
          public          postgres    false    211            ?            1259    25035    public.urls    TABLE     ?   CREATE TABLE public."public.urls" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "shortUrl" character varying(10) NOT NULL,
    url text NOT NULL,
    "visitCount" integer DEFAULT 0
);
 !   DROP TABLE public."public.urls";
       public         heap    postgres    false            ?            1259    25034    public.urls_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."public.urls_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."public.urls_id_seq";
       public          postgres    false    214                       0    0    public.urls_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."public.urls_id_seq" OWNED BY public."public.urls".id;
          public          postgres    false    213            ?            1259    24980    public.users    TABLE     ?   CREATE TABLE public."public.users" (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email text NOT NULL,
    password text NOT NULL
);
 "   DROP TABLE public."public.users";
       public         heap    postgres    false            ?            1259    24979    public.users_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."public.users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."public.users_id_seq";
       public          postgres    false    210                       0    0    public.users_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."public.users_id_seq" OWNED BY public."public.users".id;
          public          postgres    false    209            g           2604    25024    public.sessions id    DEFAULT     |   ALTER TABLE ONLY public."public.sessions" ALTER COLUMN id SET DEFAULT nextval('public."public.sessions_id_seq"'::regclass);
 C   ALTER TABLE public."public.sessions" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    211    212            h           2604    25038    public.urls id    DEFAULT     t   ALTER TABLE ONLY public."public.urls" ALTER COLUMN id SET DEFAULT nextval('public."public.urls_id_seq"'::regclass);
 ?   ALTER TABLE public."public.urls" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    213    214    214            f           2604    24983    public.users id    DEFAULT     v   ALTER TABLE ONLY public."public.users" ALTER COLUMN id SET DEFAULT nextval('public."public.users_id_seq"'::regclass);
 @   ALTER TABLE public."public.users" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209    210                      0    25021    public.sessions 
   TABLE DATA           @   COPY public."public.sessions" (id, token, "userId") FROM stdin;
    public          postgres    false    212   ?                 0    25035    public.urls 
   TABLE DATA           T   COPY public."public.urls" (id, "userId", "shortUrl", url, "visitCount") FROM stdin;
    public          postgres    false    214   d                  0    24980    public.users 
   TABLE DATA           C   COPY public."public.users" (id, name, email, password) FROM stdin;
    public          postgres    false    210   ?                   0    0    public.sessions_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."public.sessions_id_seq"', 3, true);
          public          postgres    false    211                       0    0    public.urls_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."public.urls_id_seq"', 16, true);
          public          postgres    false    213                       0    0    public.users_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."public.users_id_seq"', 3, true);
          public          postgres    false    209            o           2606    25045 $   public.urls public.urls_shortUrl_key 
   CONSTRAINT     i   ALTER TABLE ONLY public."public.urls"
    ADD CONSTRAINT "public.urls_shortUrl_key" UNIQUE ("shortUrl");
 R   ALTER TABLE ONLY public."public.urls" DROP CONSTRAINT "public.urls_shortUrl_key";
       public            postgres    false    214            m           2606    25028    public.sessions sessions_pk 
   CONSTRAINT     [   ALTER TABLE ONLY public."public.sessions"
    ADD CONSTRAINT sessions_pk PRIMARY KEY (id);
 G   ALTER TABLE ONLY public."public.sessions" DROP CONSTRAINT sessions_pk;
       public            postgres    false    212            q           2606    25043    public.urls urls_pk 
   CONSTRAINT     S   ALTER TABLE ONLY public."public.urls"
    ADD CONSTRAINT urls_pk PRIMARY KEY (id);
 ?   ALTER TABLE ONLY public."public.urls" DROP CONSTRAINT urls_pk;
       public            postgres    false    214            k           2606    24987    public.users users_pk 
   CONSTRAINT     U   ALTER TABLE ONLY public."public.users"
    ADD CONSTRAINT users_pk PRIMARY KEY (id);
 A   ALTER TABLE ONLY public."public.users" DROP CONSTRAINT users_pk;
       public            postgres    false    210            r           2606    25029    public.sessions sessions_fk0    FK CONSTRAINT     ?   ALTER TABLE ONLY public."public.sessions"
    ADD CONSTRAINT sessions_fk0 FOREIGN KEY ("userId") REFERENCES public."public.users"(id);
 H   ALTER TABLE ONLY public."public.sessions" DROP CONSTRAINT sessions_fk0;
       public          postgres    false    210    212    3179            s           2606    25046    public.urls urls_fk0    FK CONSTRAINT        ALTER TABLE ONLY public."public.urls"
    ADD CONSTRAINT urls_fk0 FOREIGN KEY ("userId") REFERENCES public."public.users"(id);
 @   ALTER TABLE ONLY public."public.urls" DROP CONSTRAINT urls_fk0;
       public          postgres    false    210    3179    214               d   x?ʻ!??"?????ɓ??K??;?:B·?G_?G/W?f?_Ɂ ????}4Mqw???Q/k?e?Sz??U@h???8??pߛ:CN?}???CD??         |  x???KN?0 ??u|?lFM㼋dA??>??		9?k?u??N???A?a3;?f?/???q?(?|??i????Z[TʉU??o? ?XI??f6y?: ? ?c?{?s????"X????7?W!K\??f?KR7H??=ښL!?qS?JnQ|_??U????f]??׋x9;???M??B_? ?~ Ny???I??Rf?WH1q0F?y&?`?,&zw?%q??]?t*_??4??q????Dę????*?f^j?삡????A"hA??n:m?<?????????cd{???r??w?X?7Y?I??m??K;??{??-߶?%?v:??o????1??=??^?X=D??%t??#^??m??5??t,?w??ӏ?? ?[3?          ?   x?m?Mr?0 ?59???i??e?"D?o???)J?C?\ǣ?bݺ??9?J?ݥq?L??????????{0?????Ӥ?M??|???k??_?????v>??}z'??}??}x???UZ??tV?-?$???????_??E0?2?o?????W=A?C?=??0>?Ec?? ?SRl/׊++?p?./uJt?ި???	XF_!?~?Xb     