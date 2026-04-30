MATCH path1 = (gp:GovernmentProject)-[:MANAGED_BY]->(m:Ministry)
MATCH path2 = (gp)-[:LOCATED_IN]->(city:City)
MATCH path3 = (prop:Property)-[:LOCATED_IN]->(city)
WHERE gp.budget_usd IS NOT NULL
  AND prop.listed_price_usd IS NOT NULL
RETURN path1, path2, path3,
       gp.project_name AS Project,
       gp.budget_usd AS ProjectBudget,
       prop.type AS PropertyType,
       prop.listed_price_usd AS PropertyPrice,
       city.name AS City
ORDER BY ProjectBudget DESC, PropertyPrice DESC
LIMIT 50;
