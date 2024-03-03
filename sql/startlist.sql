create view public.startlist as
select
    performances.id,
    row_number() over (order by performances.start_time) as row_number,
    performances.start_time,
    nominations.name as nomination,
    nominations.age,
    performances.team,
    performances.members,
    performances.coach,
    performances.is_active
from
    performances left join nominations 
        on performances.nomination_id = nominations.id
order by
    performances.start_time;