// See a patient and their hospital
MATCH path = (p:Patient)-[:ADMITTED_TO]->(h:Hospital)
RETURN path LIMIT 25;
