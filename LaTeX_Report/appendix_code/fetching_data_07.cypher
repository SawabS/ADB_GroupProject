// Hospitals
LOAD CSV WITH HEADERS FROM 'file:///hospitals.csv' AS row
MERGE (n:Hospital {hospital_id: row.hospital_id})
SET n.name = row.name,
    n.city = row.city,
    n.type = row.type,
    n.beds = toInteger(row.beds),
    n.specialities = row.specialities,
    n.director = row.director;
