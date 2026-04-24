> **Disclaimer**: do not import the '.csv' files from the import section of Neo4j Desktop. You have to move/copy them to the folder where your instance sits locally on your machine. You can find the path of that folder when you go to your active instance under `Local instances` and tap `open folder` then a window will pop up showing that location, for me it is: `C:\Users\sawab\.Neo4jDesktop2\Data\dbmss\dbms-e506bb18-442a-4405-944a-ff0d73d4b83f`. There is a **import** folder under that path which the files should be sitting there, and then you can proceed with both step 2 and 3.

## Step 1 — Create Indexes First

```cypher
CREATE INDEX company_id IF NOT EXISTS FOR (n:Company) ON (n.company_id);
CREATE INDEX student_id IF NOT EXISTS FOR (n:Student) ON (n.student_id);
CREATE INDEX university_id IF NOT EXISTS FOR (n:University) ON (n.university_id);
CREATE INDEX course_id IF NOT EXISTS FOR (n:Course) ON (n.course_id);
CREATE INDEX hospital_id IF NOT EXISTS FOR (n:Hospital) ON (n.hospital_id);
CREATE INDEX patient_id IF NOT EXISTS FOR (n:Patient) ON (n.patient_id);
CREATE INDEX dept_id IF NOT EXISTS FOR (n:Department) ON (n.dept_id);
CREATE INDEX event_id IF NOT EXISTS FOR (n:Event) ON (n.event_id);
CREATE INDEX project_id IF NOT EXISTS FOR (n:GovernmentProject) ON (n.project_id);
CREATE INDEX ministry_id IF NOT EXISTS FOR (n:Ministry) ON (n.ministry_id);
CREATE INDEX property_id IF NOT EXISTS FOR (n:Property) ON (n.property_id);
CREATE INDEX enroll_id IF NOT EXISTS FOR (n:Enrollment) ON (n.enroll_id);
CREATE INDEX reg_id IF NOT EXISTS FOR (n:EventRegistration) ON (n.registration_id);
```

***

## Step 2 — Load All Nodes (run each block separately)

```cypher
// Companies
LOAD CSV WITH HEADERS FROM 'file:///companies.csv' AS row
MERGE (n:Company {company_id: row.company_id})
SET n.company_name = row.company_name,
    n.city = row.city,
    n.sector = row.sector,
    n.founded = toInteger(row.founded),
    n.employees = toInteger(row.employees),
    n.annual_revenue_usd = toFloat(row.annual_revenue_usd),
    n.ceo = row.ceo;
```

```cypher
// Students
LOAD CSV WITH HEADERS FROM 'file:///students.csv' AS row
MERGE (n:Student {student_id: row.student_id})
SET n.full_name = row.full_name,
    n.age = toInteger(row.age),
    n.city = row.city,
    n.major = row.major,
    n.gpa = toFloat(row.gpa),
    n.enroll_year = toInteger(row.enroll_year),
    n.phone = row.phone;
```

```cypher
// Universities
LOAD CSV WITH HEADERS FROM 'file:///universities.csv' AS row
MERGE (n:University {university_id: row.university_id})
SET n.name = row.name,
    n.city = row.city,
    n.founded = toInteger(row.founded),
    n.students = toInteger(row.students),
    n.departments = toInteger(row.departments),
    n.contact_email = row.contact_email;
```

```cypher
// Courses
LOAD CSV WITH HEADERS FROM 'file:///courses.csv' AS row
MERGE (n:Course {course_id: row.course_id})
SET n.course_name = row.course_name,
    n.credits = toInteger(row.credits),
    n.department = row.department,
    n.professor = row.professor,
    n.max_cap = toInteger(row.max_cap),
    n.mode = row.mode;
```

```cypher
// Departments
LOAD CSV WITH HEADERS FROM 'file:///departments.csv' AS row
MERGE (n:Department {dept_id: row.dept_id})
SET n.department_name = row.department_name,
    n.university = row.university,
    n.head_professor = row.head_professor,
    n.students = toInteger(row.students),
    n.budget_usd = toFloat(row.budget_usd);
```

```cypher
// Hospitals
LOAD CSV WITH HEADERS FROM 'file:///hospitals.csv' AS row
MERGE (n:Hospital {hospital_id: row.hospital_id})
SET n.name = row.name,
    n.city = row.city,
    n.type = row.type,
    n.beds = toInteger(row.beds),
    n.specialities = row.specialities,
    n.director = row.director;
```

```cypher
// Patients
LOAD CSV WITH HEADERS FROM 'file:///patients_1000.csv' AS row
MERGE (n:Patient {patient_id: row.patient_id})
SET n.full_name = row.full_name,
    n.age = toInteger(row.age),
    n.city = row.city,
    n.diagnosis = row.diagnosis,
    n.admission = row.admission,
    n.status = row.status,
    n.doctor = row.doctor;
```

```cypher
// Events
LOAD CSV WITH HEADERS FROM 'file:///events.csv' AS row
MERGE (n:Event {event_id: row.event_id})
SET n.event_name = row.event_name,
    n.type = row.type,
    n.city = row.city,
    n.venue = row.venue,
    n.date = row.date,
    n.tickets = toInteger(row.tickets),
    n.price_usd = toFloat(row.price_usd),
    n.organiser = row.organiser;
```

```cypher
// Ministries
LOAD CSV WITH HEADERS FROM 'file:///ministries.csv' AS row
MERGE (n:Ministry {ministry_id: row.ministry_id})
SET n.ministry_name = row.ministry_name,
    n.city = row.city,
    n.minister = row.minister,
    n.employees = toInteger(row.employees),
    n.annual_budget_usd = toFloat(row.annual_budget_usd),
    n.website = row.website;
```

```cypher
// Government Projects
LOAD CSV WITH HEADERS FROM 'file:///government_projects.csv' AS row
MERGE (n:GovernmentProject {project_id: row.project_id})
SET n.project_name = row.project_name,
    n.city = row.city,
    n.budget_usd = toFloat(row.budget_usd),
    n.start_date = row.start_date,
    n.end_date = row.end_date,
    n.status = row.status,
    n.lead_official = row.lead_official;
```

```cypher
// Properties
LOAD CSV WITH HEADERS FROM 'file:///properties.csv' AS row
MERGE (n:Property {property_id: row.property_id})
SET n.type = row.type,
    n.city = row.city,
    n.district = row.district,
    n.area_m2 = toFloat(row.area_m2),
    n.bedrooms = toInteger(row.bedrooms),
    n.listed_price_usd = toFloat(row.listed_price_usd),
    n.status = row.status,
    n.listed_date = row.listed_date;
```

```cypher
// Enrollments
LOAD CSV WITH HEADERS FROM 'file:///enrollments_1000.csv' AS row
MERGE (n:Enrollment {enroll_id: row.enroll_id})
SET n.student_id = row.student_id,
    n.course_id = row.course_id,
    n.semester = row.semester,
    n.status = row.status,
    n.grade = row.grade,
    n.enrolled_date = row.enrolled_date;
```

```cypher
// Event Registrations
LOAD CSV WITH HEADERS FROM 'file:///event_registrations_1000.csv' AS row
MERGE (n:EventRegistration {registration_id: row.registration_id})
SET n.event_id = row.event_id,
    n.registrant_name = row.registrant_name,
    n.city = row.city,
    n.ticket_type = row.ticket_type,
    n.paid_usd = toFloat(row.paid_usd),
    n.registration_date = row.registration_date;
```

### Verify Everything Loaded

```cypher
MATCH (n) RETURN labels(n) AS Label, count(n) AS Count ORDER BY Count DESC;
```

You should see **13 rows**, each with **1,000 nodes**. Once confirmed, you're ready for Phase 3 (relationships). Want me to give you that script too?

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