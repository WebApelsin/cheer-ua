create table public.evaluations (
    id bigint generated by default as identity,
    user_id uuid not null default auth.uid (),
    performance_id bigint not null,
    criteria_id bigint not null,
    value real not null default '0'::real,
    
    constraint evaluations_pkey primary key (id),
    constraint evaluations_criteria_id_fkey foreign key (criteria_id) 
        references evaluation_criteria (id) on update cascade on delete restrict,
    constraint evaluations_performance_id_fkey foreign key (performance_id) 
        references performances (id) on update cascade on delete cascade,
    constraint evaluations_user_id_fkey foreign key (user_id) 
        references auth.users (id) on update cascade on delete restrict
) tablespace pg_default;