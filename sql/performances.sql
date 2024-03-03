create table public.performances (
    id bigint generated by default as identity,
    start_time time without time zone null,
    nomination_id bigint not null,
    is_active boolean not null default false,
    team text null,
    members text null,
    coach text null,
    
    constraint performances_pkey primary key (id),
    constraint performances_nomination_id_fkey foreign key (nomination_id) 
        references nominations (id) 
        on update cascade 
        on delete cascade
) tablespace pg_default;