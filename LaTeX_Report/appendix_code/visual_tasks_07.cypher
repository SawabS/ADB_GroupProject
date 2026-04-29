MATCH path1 = (p:Patient)-[:LIVES_IN]->(homeCity:City)
MATCH path2 = (p)-[:ADMITTED_TO]->(h:Hospital)-[:LOCATED_IN]->(hospitalCity:City)
RETURN path1, path2,
       p.full_name AS Patient,
       p.diagnosis AS Diagnosis,
       homeCity.name AS HomeCity,
       hospitalCity.name AS HospitalCity,
       CASE
         WHEN homeCity.name <> hospitalCity.name THEN 'Cross-City'
         ELSE 'Local'
       END AS ReferralType
LIMIT 30;
