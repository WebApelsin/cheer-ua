create view public.evaluations_template as
select
    performances.id as performance_id,
    evaluation_criteria.id as criteria_id,
    evaluation_criteria.category,
    evaluation_criteria.subject,
    evaluation_criteria.description,
    evaluation_criteria.max_value,
    evaluation_criteria.sort_order
from
    performances left join evaluation_criteria 
        on performances.nomination_id = evaluation_criteria.nomination_id
order by
    performances.id,
    evaluation_criteria.sort_order;