create table public.ages (
    id bigint generated by default as identity,
    name text not null,
    
    constraint ages_pkey primary key (id)
) tablespace pg_default;