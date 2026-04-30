// Patient ADMITTED_TO Hospital
LOAD CSV WITH HEADERS FROM 'file:///patients_1000.csv' AS row
CALL (row) {
  MATCH (p:Patient {patient_id: row.patient_id})
  MATCH (h:Hospital {hospital_id: row.hospital})
  MERGE (p)-[:ADMITTED_TO {diagnosis: row.diagnosis, status: row.status, doctor: row.doctor}]->(h)
} IN TRANSACTIONS OF 500 ROWS;
