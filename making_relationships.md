Here's the complete Phase 3 relationship script:

***

## Step 3 — Create All Relationships

```cypher
// Student STUDIES_AT University
LOAD CSV WITH HEADERS FROM 'file:///students.csv' AS row
CALL {
  WITH row
  MATCH (s:Student {student_id: row.student_id})
  MATCH (u:University {name: row.university})
  MERGE (s)-[:STUDIES_AT]->(u)
} IN TRANSACTIONS OF 500 ROWS;
```

```cypher
// Student ENROLLED_IN Course (via enrollments)
LOAD CSV WITH HEADERS FROM 'file:///enrollments_1000.csv' AS row
CALL {
  WITH row
  MATCH (s:Student {student_id: row.student_id})
  MATCH (c:Course {course_id: row.course_id})
  MERGE (s)-[r:ENROLLED_IN {enroll_id: row.enroll_id}]->(c)
  SET r.semester = row.semester,
      r.status = row.status,
      r.grade = row.grade,
      r.enrolled_date = row.enrolled_date
} IN TRANSACTIONS OF 500 ROWS;
```

```cypher
// Course BELONGS_TO Department
LOAD CSV WITH HEADERS FROM 'file:///courses.csv' AS row
CALL {
  WITH row
  MATCH (c:Course {course_id: row.course_id})
  MATCH (d:Department {dept_id: row.department})
  MERGE (c)-[:BELONGS_TO]->(d)
} IN TRANSACTIONS OF 500 ROWS;
```

```cypher
// Department PART_OF University
LOAD CSV WITH HEADERS FROM 'file:///departments.csv' AS row
CALL {
  WITH row
  MATCH (d:Department {dept_id: row.dept_id})
  MATCH (u:University {name: row.university})
  MERGE (d)-[:PART_OF]->(u)
} IN TRANSACTIONS OF 500 ROWS;
```

```cypher
// Patient ADMITTED_TO Hospital
LOAD CSV WITH HEADERS FROM 'file:///patients_1000.csv' AS row
CALL {
  WITH row
  MATCH (p:Patient {patient_id: row.patient_id})
  MATCH (h:Hospital {name: row.hospital})
  MERGE (p)-[r:ADMITTED_TO]->(h)
  SET r.admission_date = row.admission,
      r.status = row.status,
      r.doctor = row.doctor
} IN TRANSACTIONS OF 500 ROWS;
```

```cypher
// GovernmentProject MANAGED_BY Ministry
LOAD CSV WITH HEADERS FROM 'file:///government_projects.csv' AS row
CALL {
  WITH row
  MATCH (g:GovernmentProject {project_id: row.project_id})
  MATCH (m:Ministry {ministry_name: row.ministry})
  MERGE (g)-[r:MANAGED_BY]->(m)
  SET r.lead_official = row.lead_official
} IN TRANSACTIONS OF 500 ROWS;
```

```cypher
// GovernmentProject LOCATED_IN City (as Ministry city cross-check)
LOAD CSV WITH HEADERS FROM 'file:///government_projects.csv' AS row
CALL {
  WITH row
  MATCH (g:GovernmentProject {project_id: row.project_id})
  MATCH (m:Ministry {ministry_name: row.ministry})
  MERGE (g)-[r:BASED_IN_CITY {city: row.city}]->(m)
} IN TRANSACTIONS OF 500 ROWS;
```

```cypher
// EventRegistration REGISTERED_FOR Event
LOAD CSV WITH HEADERS FROM 'file:///event_registrations_1000.csv' AS row
CALL {
  WITH row
  MATCH (reg:EventRegistration {registration_id: row.registration_id})
  MATCH (e:Event {event_id: row.event_id})
  MERGE (reg)-[r:REGISTERED_FOR]->(e)
  SET r.ticket_type = row.ticket_type,
      r.paid_usd = toFloat(row.paid_usd),
      r.registration_date = row.registration_date
} IN TRANSACTIONS OF 500 ROWS;
```

***

## Step 4 — Verify All Relationships

```cypher
MATCH ()-[r]->()
RETURN type(r) AS Relationship, count(r) AS Count
ORDER BY Count DESC;
```

***

## Step 5 — Quick Sanity Check (Visual)

Run this in the Query tab to see a sample of your graph visually:

```cypher
// See a student, their courses, and their university
MATCH path = (s:Student)-[:STUDIES_AT]->(u:University),
             (s)-[:ENROLLED_IN]->(c:Course)
RETURN path LIMIT 25;
```

```cypher
// See a patient and their hospital
MATCH path = (p:Patient)-[:ADMITTED_TO]->(h:Hospital)
RETURN path LIMIT 25;
```

```cypher
// See government projects and their ministries
MATCH path = (g:GovernmentProject)-[:MANAGED_BY]->(m:Ministry)
RETURN path LIMIT 25;
```

Switch to the **"Graph"** view tab in the Query results panel to see the visual node-and-edge diagram — that's the screenshot you'll want for your report. 🎯

***

> ⚠️ **If any relationship query returns 0 rows**, it means the join values don't match exactly (e.g., `row.university` in `students.csv` doesn't match `u.name` in `universities.csv`). Run this to debug:
> ```cypher
> MATCH (s:Student) RETURN DISTINCT s.city LIMIT 10;
> // Compare with:
> MATCH (u:University) RETURN DISTINCT u.name LIMIT 10;
> ```