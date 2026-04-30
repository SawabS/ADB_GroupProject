// University LOCATED_IN City
LOAD CSV WITH HEADERS FROM 'file:///universities.csv' AS row
CALL (row) {
  MATCH (u:University {university_id: row.university_id})
  MATCH (c:City {name: row.city})
  MERGE (u)-[:LOCATED_IN]->(c)
} IN TRANSACTIONS OF 500 ROWS;
