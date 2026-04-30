MATCH (n)-[:LOCATED_IN]->(c:City)
RETURN c.name AS City, labels(n)[0] AS NodeType, count(n) AS Count
ORDER BY City, NodeType;
