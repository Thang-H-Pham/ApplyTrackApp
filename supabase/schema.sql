CREATE TABLE applications (
    id UUID ,
    user_id ,
    company ,
    role ,
    url ,
    location ,
    pay ,
    deadline ,
    skills
    status
    created_at 
);

CREATE TABLE status_history (
    application_id, 
    from_status, 
    to_status, 
    changed_at
);

CREATE TABLE notes (
    application_id, 
    body, 
    created_at
);