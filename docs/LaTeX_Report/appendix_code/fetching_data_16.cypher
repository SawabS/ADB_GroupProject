MATCH (n) RETURN labels(n) AS Label, count(n) AS Count ORDER BY Count DESC;
