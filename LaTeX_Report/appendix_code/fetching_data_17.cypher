// Student STUDIES_AT University
LOAD CSV WITH HEADERS FROM 'file:///students.csv' AS row
CALL (row) {
  MATCH (s:Student {student_id: row.student_id})
  MATCH (u:University {university_id: row.university})
  MERGE (s)-[:STUDIES_AT]->(u)
} IN TRANSACTIONS OF 500 ROWS;
