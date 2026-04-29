MATCH (city:City)
WITH city,
     COUNT { (p:Patient)-[:LIVES_IN]->(city) } AS Patients,
     COUNT { (e:Event)-[:LOCATED_IN]->(city) } AS Events,
     COUNT { (gp:GovernmentProject)-[:LOCATED_IN]->(city) } AS Projects,
     COUNT { (pr:Property)-[:LOCATED_IN]->(city) } AS Properties
RETURN city.name AS City,
       Patients,
       Events,
       Projects,
       Properties,
       Patients + Events + Projects + Properties AS StressScore
ORDER BY StressScore DESC;
