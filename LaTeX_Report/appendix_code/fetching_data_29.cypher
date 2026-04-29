// Property LOCATED_IN City
LOAD CSV WITH HEADERS FROM 'file:///properties.csv' AS row
CALL (row) {
  MATCH (pr:Property {property_id: row.property_id})
  MATCH (c:City {name: row.city})
  MERGE (pr)-[:LOCATED_IN]->(c)
} IN TRANSACTIONS OF 500 ROWS;
