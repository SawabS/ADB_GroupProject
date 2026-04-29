// Hospital LOCATED_IN City
LOAD CSV WITH HEADERS FROM 'file:///hospitals.csv' AS row
CALL (row) {
  MATCH (h:Hospital {hospital_id: row.hospital_id})
  MATCH (c:City {name: row.city})
  MERGE (h)-[:LOCATED_IN]->(c)
} IN TRANSACTIONS OF 500 ROWS;
