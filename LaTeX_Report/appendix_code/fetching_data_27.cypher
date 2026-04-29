// Company LOCATED_IN City
LOAD CSV WITH HEADERS FROM 'file:///companies.csv' AS row
CALL (row) {
  MATCH (co:Company {company_id: row.company_id})
  MATCH (c:City {name: row.city})
  MERGE (co)-[:LOCATED_IN]->(c)
} IN TRANSACTIONS OF 500 ROWS;
