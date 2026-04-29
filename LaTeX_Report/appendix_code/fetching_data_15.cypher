// City nodes --- collected from all sources
LOAD CSV WITH HEADERS FROM 'file:///companies.csv' AS row
MERGE (:City {name: row.city});

LOAD CSV WITH HEADERS FROM 'file:///students.csv' AS row
MERGE (:City {name: row.city});

LOAD CSV WITH HEADERS FROM 'file:///universities.csv' AS row
MERGE (:City {name: row.city});

LOAD CSV WITH HEADERS FROM 'file:///hospitals.csv' AS row
MERGE (:City {name: row.city});

LOAD CSV WITH HEADERS FROM 'file:///patients_1000.csv' AS row
MERGE (:City {name: row.city});

LOAD CSV WITH HEADERS FROM 'file:///events.csv' AS row
MERGE (:City {name: row.city});

LOAD CSV WITH HEADERS FROM 'file:///ministries.csv' AS row
MERGE (:City {name: row.city});

LOAD CSV WITH HEADERS FROM 'file:///government_projects.csv' AS row
MERGE (:City {name: row.city});

LOAD CSV WITH HEADERS FROM 'file:///properties.csv' AS row
MERGE (:City {name: row.city});

LOAD CSV WITH HEADERS FROM 'file:///event_registrations_1000.csv' AS row
MERGE (:City {name: row.city});
