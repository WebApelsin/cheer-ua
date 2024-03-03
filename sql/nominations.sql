create table public.nominations (
    id bigint generated by default as identity,
    name text not null,
    age text not null,
    
    constraint nominations_pkey primary key (id),
    constraint nominations_id_key unique (id)
) tablespace pg_default;