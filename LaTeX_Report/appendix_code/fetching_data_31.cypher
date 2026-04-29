// Patient LIVES_IN City
LOAD CSV WITH HEADERS FROM 'file:///patients_1000.csv' AS row
CALL (row) {
  MATCH (p:Patient {patient_id: row.patient_id})
  MATCH (c:City {name: row.city})
  MERGE (p)-[:LIVES_IN]->(c)
} IN TRANSACTIONS OF 500 ROWS;
