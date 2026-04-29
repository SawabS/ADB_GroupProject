// Ministry LOCATED_IN City
LOAD CSV WITH HEADERS FROM 'file:///ministries.csv' AS row
CALL (row) {
  MATCH (m:Ministry {ministry_id: row.ministry_id})
  MATCH (c:City {name: row.city})
  MERGE (m)-[:LOCATED_IN]->(c)
} IN TRANSACTIONS OF 500 ROWS;
