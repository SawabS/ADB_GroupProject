MATCH (city:City)
WITH city,
     COUNT { (p:Patient)-[:LIVES_IN]->(city) } AS Patients,
     COUNT { (e:Event)-[:LOCATED_IN]->(city) } AS Events,
     COUNT { (gp:GovernmentProject)-[:LOCATED_IN]->(city) } AS Projects,
     COUNT { (pr:Property)-[:LOCATED_IN]->(city) } AS Properties
WITH city, Patients, Events, Projects, Properties,
     Patients + Events + Projects + Properties AS StressScore
ORDER BY StressScore DESC

OPTIONAL MATCH p1 = (:Patient)-[:LIVES_IN]->(city)
WITH city, Patients, Events, Projects, Properties, StressScore,
     collect(DISTINCT p1)[..8] AS patientPaths

OPTIONAL MATCH p2 = (:Event)-[:LOCATED_IN]->(city)
WITH city, Patients, Events, Projects, Properties, StressScore,
     patientPaths, collect(DISTINCT p2)[..8] AS eventPaths

OPTIONAL MATCH p3 = (:GovernmentProject)-[:LOCATED_IN]->(city)
WITH city, Patients, Events, Projects, Properties, StressScore,
     patientPaths, eventPaths, collect(DISTINCT p3)[..8] AS projectPaths

OPTIONAL MATCH p4 = (:Property)-[:LOCATED_IN]->(city)
RETURN city,
       patientPaths,
       eventPaths,
       projectPaths,
       collect(DISTINCT p4)[..8] AS propertyPaths,
       Patients, Events, Projects, Properties, StressScore
ORDER BY StressScore DESC;
