create table public.performances (
    id bigint generated by default as identity,
    event_id bigint not null,
    start_time time without time zone null,
    nomination_id bigint not null,
    age_id bigint not null,
    team text null,
    members text null,
    coach text null,
    is_editable boolean not null default false,
    is_active boolean not null default false,
    
    constraint performances_pkey primary key (id),
    constraint performances_event_id_fkey foreign key (event_id) 
        references events (id) on update cascade on delete restrict
    constraint performances_nomination_id_fkey foreign key (nomination_id) 
        references nominations (id) on update cascade on delete restrict
    constraint performances_age_id_fkey foreign key (age_id) 
        references ages (id) on update cascade on delete restrict    
) tablespace pg_default;

alter table performances replica identity full;