create view public.startlist as
select
    performances.event_id,
    performances.id,
    row_number() over (order by performances.start_time) as row_number,
    performances.start_time,
    nominations.name as nomination,
    ages.name as age,
    performances.team,
    performances.members,
    performances.coach,
    performances.is_editable,
    performances.is_active
from
    performances 
      inner join nominations 
        on performances.nomination_id = nominations.id
      inner join ages
        on performances.age_id = ages.id
order by
    performances.start_time;