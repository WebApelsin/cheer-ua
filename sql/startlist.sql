create view public.startlist as
select
    performances.event_id,
    performances.id,
    row_number() over (order by performances.start_time ) as row_number,
    performances.start_time,
    nominations.id as nomination_id,
    nominations.name as nomination,
    ages.id as age_id,
    ages.name as age,
    performances.team,
    performances.members,
    performances.coach,
    performances.is_editable,
    performances.is_active
from
    performances
    join nominations on performances.nomination_id = nominations.id
    join ages on performances.age_id = ages.id
order by
    performances.start_time;