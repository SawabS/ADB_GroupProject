MATCH path1 = (p:Patient)-[:LIVES_IN]->(homeCity:City)
MATCH path2 = (p)-[:ADMITTED_TO]->(h:Hospital)-[:LOCATED_IN]->(hospitalCity:City)
RETURN path1, path2,
       CASE
         WHEN homeCity.name = hospitalCity.name THEN 'Local treatment'
         ELSE 'Cross-city treatment'
       END AS TreatmentType
LIMIT 30;
