MATCH ()-[r]->()
RETURN type(r) AS Relationship, count(r) AS Count
ORDER BY Count DESC;
