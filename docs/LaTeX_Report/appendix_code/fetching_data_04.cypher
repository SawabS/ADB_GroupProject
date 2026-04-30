// Universities
LOAD CSV WITH HEADERS FROM 'file:///universities.csv' AS row
MERGE (n:University {university_id: row.university_id})
SET n.name = row.name,
    n.city = row.city,
    n.founded = toInteger(row.founded),
    n.students = toInteger(row.students),
    n.departments = toInteger(row.departments),
    n.contact_email = row.contact_email;
