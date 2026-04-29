// See government projects and their ministries
MATCH path = (g:GovernmentProject)-[:MANAGED_BY]->(m:Ministry)
RETURN path LIMIT 25;
