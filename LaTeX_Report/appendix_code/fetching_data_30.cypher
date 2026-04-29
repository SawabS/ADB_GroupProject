// Student LIVES_IN City
LOAD CSV WITH HEADERS FROM 'file:///students.csv' AS row
CALL (row) {
  MATCH (s:Student {student_id: row.student_id})
  MATCH (c:City {name: row.city})
  MERGE (s)-[:LIVES_IN]->(c)
} IN TRANSACTIONS OF 500 ROWS;
