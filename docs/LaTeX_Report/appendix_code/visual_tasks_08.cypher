MATCH path1 = (m:Ministry)-[:LOCATED_IN]->(ministryCity:City)
MATCH path2 = (gp:GovernmentProject)-[:MANAGED_BY]->(m)
MATCH path3 = (gp)-[:LOCATED_IN]->(projectCity:City)
WHERE ministryCity.name <> projectCity.name
RETURN path1, path2, path3,
       m.ministry_name AS Ministry,
       gp.project_name AS Project,
       ministryCity.name AS MinistryCity,
       projectCity.name AS ProjectCity
LIMIT 40;
