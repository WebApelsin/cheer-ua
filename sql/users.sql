create view public.users as
select
    users.id,
    users.email,
    profiles.given_name,
    profiles.role
from
    auth.users left join profiles 
        on users.id = profiles.user_id;