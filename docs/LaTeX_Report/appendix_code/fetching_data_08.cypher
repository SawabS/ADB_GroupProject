// Patients
LOAD CSV WITH HEADERS FROM 'file:///patients_1000.csv' AS row
MERGE (n:Patient {patient_id: row.patient_id})
SET n.full_name = row.full_name,
    n.age = toInteger(row.age),
    n.city = row.city,
    n.diagnosis = row.diagnosis,
    n.admission = row.admission,
    n.status = row.status,
    n.doctor = row.doctor;
