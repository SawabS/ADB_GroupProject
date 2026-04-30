MATCH path1 = (gp:GovernmentProject)-[:MANAGED_BY]->(m:Ministry)
MATCH path2 = (gp)-[:LOCATED_IN]->(city:City)
RETURN path1, path2,
       gp.project_name AS Project,
       gp.status AS Status,
       gp.budget_usd AS Budget
LIMIT 30;
