MATCH (city:City)
OPTIONAL MATCH path1 = (u:University)-[:LOCATED_IN]->(city)
OPTIONAL MATCH path2 = (h:Hospital)-[:LOCATED_IN]->(city)
OPTIONAL MATCH path3 = (c:Company)-[:LOCATED_IN]->(city)
OPTIONAL MATCH path4 = (e:Event)-[:LOCATED_IN]->(city)
OPTIONAL MATCH path5 = (p:Property)-[:LOCATED_IN]->(city)
RETURN city, path1, path2, path3, path4, path5
LIMIT 30;
