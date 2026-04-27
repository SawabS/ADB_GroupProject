# ADB_GroupProject — 10 Neo4j Visual Tasks

This document contains 10 refined Neo4j visual tasks for the Advanced Database Systems group project.  
Each task includes a presentation-ready question, graph shape, Cypher query, and visualization idea.

Repository: `ADB_GroupProject`  
DBMS: Neo4j Graph Database  
Output type: Visual graph results in Neo4j Browser  
Recommended result view: `Graph`

---

## Table of Contents

1. [City as a Central Multi-Sector Hub](#1-city-as-a-central-multi-sector-hub)
2. [Patient and Hospital Movement](#2-patient-and-hospital-movement)
3. [Government Project Network](#3-government-project-network)
4. [Cross-City Student Mobility](#4-cross-city-student-mobility)
5. [Full Academic Path for Students](#5-full-academic-path-for-students)
6. [Event Registrations and Their Cities](#6-event-registrations-and-their-cities)
7. [Cross-City Healthcare Referral Network](#7-cross-city-healthcare-referral-network)
8. [Ministry Cross-City Project Control](#8-ministry-cross-city-project-control)
9. [City Stress Index Graph](#9-city-stress-index-graph)
10. [Public Investment and Property Market Pressure](#10-public-investment-and-property-market-pressure)

---

## 1. City as a Central Multi-Sector Hub

### Natural Question

Which universities, hospitals, companies, events, and properties are connected to the same city?

### Refined Presentation Question

Which city acts as the strongest shared hub across education, healthcare, business, events, and real estate?

### Graph Shape

```text
University / Hospital / Company / Event / Property ──[:LOCATED_IN]──▶ City
```

### Why This Task Is Strong

This is a strong introductory graph because it proves that `City` is the central integration point across different datasets.

### Cypher Query

```cypher
MATCH (city:City)
OPTIONAL MATCH path1 = (u:University)-[:LOCATED_IN]->(city)
OPTIONAL MATCH path2 = (h:Hospital)-[:LOCATED_IN]->(city)
OPTIONAL MATCH path3 = (c:Company)-[:LOCATED_IN]->(city)
OPTIONAL MATCH path4 = (e:Event)-[:LOCATED_IN]->(city)
OPTIONAL MATCH path5 = (p:Property)-[:LOCATED_IN]->(city)
RETURN city, path1, path2, path3, path4, path5
LIMIT 30;
```

### Visualization Idea

The city appears at the center of the graph, with different sectors around it such as education, healthcare, business, events, and properties.

---

## 2. Patient and Hospital Movement

### Natural Question

Where do patients live, and which hospitals are they admitted to?

### Refined Presentation Question

How do patients move from their home city to the hospital system, and are they treated locally or outside their city?

### Graph Shape

```text
Patient ──[:LIVES_IN]──▶ HomeCity
Patient ──[:ADMITTED_TO]──▶ Hospital ──[:LOCATED_IN]──▶ HospitalCity
```

### Why This Task Is Strong

This improves the original version by separating the patient’s home city from the hospital city, so both local and cross-city treatment can appear.

### Cypher Query

```cypher
MATCH path1 = (p:Patient)-[:LIVES_IN]->(homeCity:City)
MATCH path2 = (p)-[:ADMITTED_TO]->(h:Hospital)-[:LOCATED_IN]->(hospitalCity:City)
RETURN path1, path2,
       CASE
         WHEN homeCity.name = hospitalCity.name THEN 'Local treatment'
         ELSE 'Cross-city treatment'
       END AS TreatmentType
LIMIT 30;
```

### Visualization Idea

Each patient links to a home city and a hospital. The hospital then links to its own city, making healthcare movement visible.

---

## 3. Government Project Network

### Natural Question

Which ministries manage government projects, and where are those projects located?

### Refined Presentation Question

Which ministries control public projects, and how are those projects distributed across cities?

### Graph Shape

```text
Ministry ◀──[:MANAGED_BY]── GovernmentProject ──[:LOCATED_IN]──▶ City
```

### Why This Task Is Strong

This shows public administration structure by connecting ministries, projects, budgets, statuses, and cities.

### Cypher Query

```cypher
MATCH path1 = (gp:GovernmentProject)-[:MANAGED_BY]->(m:Ministry)
MATCH path2 = (gp)-[:LOCATED_IN]->(city:City)
RETURN path1, path2,
       gp.project_name AS Project,
       gp.status AS Status,
       gp.budget_usd AS Budget
LIMIT 30;
```

### Visualization Idea

Government projects appear between ministries and cities, forming a clear public-service network.

---

## 4. Cross-City Student Mobility

### Natural Question

Which students live in one city but study at a university in a different city?

### Refined Presentation Question

Which students leave their home city for university, and which cities are sending or receiving students?

### Graph Shape

```text
Student ──[:LIVES_IN]──▶ HomeCity
Student ──[:STUDIES_AT]──▶ University ──[:LOCATED_IN]──▶ UniversityCity
```

### Why This Task Is Strong

This reveals educational migration and shows two city nodes per student: home city and university city.

### Cypher Query

```cypher
MATCH path1 = (s:Student)-[:LIVES_IN]->(homeCity:City)
MATCH path2 = (s)-[:STUDIES_AT]->(u:University)-[:LOCATED_IN]->(uniCity:City)
WHERE homeCity.name <> uniCity.name
RETURN path1, path2,
       s.full_name AS Student,
       homeCity.name AS HomeCity,
       uniCity.name AS UniversityCity
LIMIT 30;
```

### Visualization Idea

Students become bridge nodes between home cities and university cities.

---

## 5. Full Academic Path for Students

### Natural Question

What is the complete academic path from student to course, department, university, and city?

### Refined Presentation Question

How does each student connect into the full academic structure of courses, departments, universities, and locations?

### Graph Shape

```text
Student ──[:ENROLLED_IN]──▶ Course ──[:BELONGS_TO]──▶ Department ──[:PART_OF]──▶ University ──[:LOCATED_IN]──▶ City
```

### Why This Task Is Strong

This produces a complete education chain instead of isolated student-course or department-university fragments.

### Cypher Query

```cypher
MATCH path = (s:Student)-[:ENROLLED_IN]->(c:Course)-[:BELONGS_TO]->(d:Department)-[:PART_OF]->(u:University)-[:LOCATED_IN]->(city:City)
RETURN path,
       s.full_name AS Student,
       c.course_name AS Course,
       d.department_name AS Department,
       u.name AS University,
       city.name AS City
LIMIT 50;
```

### Visualization Idea

The graph forms layered academic trees rooted around universities and cities.

---

## 6. Event Registrations and Their Cities

### Natural Question

Which events attract the most registrations, and how do those events cluster by city?

### Refined Presentation Question

How do registrations connect to events, and how are events distributed across cities?

### Graph Shape

```text
EventRegistration ──[:REGISTERED_FOR]──▶ Event ──[:LOCATED_IN]──▶ City
```

### Why This Task Is Strong

This visualizes the event domain end-to-end and shows where registration activity concentrates.

### Cypher Query

```cypher
MATCH path = (r:EventRegistration)-[:REGISTERED_FOR]->(e:Event)-[:LOCATED_IN]->(city:City)
RETURN path,
       e.event_name AS Event,
       e.type AS EventType,
       city.name AS City,
       r.ticket_type AS TicketType,
       r.paid_usd AS PaidUSD
LIMIT 50;
```

### Visualization Idea

Popular events become dense clusters of registration nodes, while city nodes show geographic grouping.

---

## 7. Cross-City Healthcare Referral Network

### Natural Question

Which patients are treated outside their home city?

### Refined Presentation Question

Which cities depend on hospitals in other cities, and where is cross-city healthcare movement strongest?

### Graph Shape

```text
Patient ──[:LIVES_IN]──▶ HomeCity
Patient ──[:ADMITTED_TO]──▶ Hospital ──[:LOCATED_IN]──▶ HospitalCity
```

### Why This Task Is Strong

This is a harder version of patient movement because it filters only cross-city treatment cases.

### Cypher Query

```cypher
MATCH path1 = (p:Patient)-[:LIVES_IN]->(homeCity:City)
MATCH path2 = (p)-[:ADMITTED_TO]->(h:Hospital)-[:LOCATED_IN]->(hospitalCity:City)
WHERE homeCity.name <> hospitalCity.name
RETURN path1, path2,
       p.full_name AS Patient,
       p.diagnosis AS Diagnosis,
       homeCity.name AS HomeCity,
       hospitalCity.name AS HospitalCity
LIMIT 40;
```

### Visualization Idea

Patient nodes bridge two different city nodes, revealing referral-like movement between cities.

---

## 8. Ministry Cross-City Project Control

### Natural Question

Which ministries are located in one city but manage projects in another city?

### Refined Presentation Question

Is public project management local, or are some cities controlled administratively from other cities?

### Graph Shape

```text
Ministry ──[:LOCATED_IN]──▶ MinistryCity
GovernmentProject ──[:MANAGED_BY]──▶ Ministry
GovernmentProject ──[:LOCATED_IN]──▶ ProjectCity
```

### Why This Task Is Strong

This reveals administrative centralization and cross-city government control.

### Cypher Query

```cypher
MATCH path1 = (m:Ministry)-[:LOCATED_IN]->(ministryCity:City)
MATCH path2 = (gp:GovernmentProject)-[:MANAGED_BY]->(m)
MATCH path3 = (gp)-[:LOCATED_IN]->(projectCity:City)
WHERE ministryCity.name <> projectCity.name
RETURN path1, path2, path3,
       m.ministry_name AS Ministry,
       gp.project_name AS Project,
       ministryCity.name AS MinistryCity,
       projectCity.name AS ProjectCity
LIMIT 40;
```

### Visualization Idea

Ministries appear as control hubs connected to projects outside their own city.

---

## 9. City Stress Index Graph

### Natural Question

Which cities are the busiest when combining patients, events, government projects, and properties?

### Refined Presentation Question

Which cities carry the highest multi-sector load across healthcare, events, government projects, and real estate?

### Graph Shape

```text
Patient / Event / GovernmentProject / Property ──▶ City
City is ranked by combined StressScore
```

### Why This Task Is Strong

This is an analytical task because it computes a city-level score before returning graph paths.

### Cypher Query

```cypher
MATCH (city:City)
OPTIONAL MATCH (patient:Patient)-[:LIVES_IN]->(city)
OPTIONAL MATCH (event:Event)-[:LOCATED_IN]->(city)
OPTIONAL MATCH (project:GovernmentProject)-[:LOCATED_IN]->(city)
OPTIONAL MATCH (property:Property)-[:LOCATED_IN]->(city)
WITH city,
     count(DISTINCT patient) AS Patients,
     count(DISTINCT event) AS Events,
     count(DISTINCT project) AS Projects,
     count(DISTINCT property) AS Properties
WITH city, Patients, Events, Projects, Properties,
     Patients + Events + Projects + Properties AS StressScore
ORDER BY StressScore DESC
LIMIT 3
OPTIONAL MATCH path1 = (patient:Patient)-[:LIVES_IN]->(city)
OPTIONAL MATCH path2 = (event:Event)-[:LOCATED_IN]->(city)
OPTIONAL MATCH path3 = (project:GovernmentProject)-[:LOCATED_IN]->(city)
OPTIONAL MATCH path4 = (property:Property)-[:LOCATED_IN]->(city)
RETURN city, path1, path2, path3, path4,
       Patients, Events, Projects, Properties, StressScore
LIMIT 80;
```

### Visualization Idea

The highest-stress cities appear as dense hubs surrounded by multiple sectors.

---

## 10. Public Investment and Property Market Pressure

### Natural Question

Are high-budget government projects located in cities that also contain expensive properties?

### Refined Presentation Question

Which cities show both large public investment and high property prices, suggesting economic pressure or development concentration?

### Graph Shape

```text
Ministry ── GovernmentProject ── City ── Property
```

### Why This Task Is Strong

This connects government spending with real estate values and turns the graph into a planning/economics question.

### Cypher Query

```cypher
MATCH path1 = (gp:GovernmentProject)-[:MANAGED_BY]->(m:Ministry)
MATCH path2 = (gp)-[:LOCATED_IN]->(city:City)
MATCH path3 = (prop:Property)-[:LOCATED_IN]->(city)
WHERE gp.budget_usd IS NOT NULL
  AND prop.listed_price_usd IS NOT NULL
RETURN path1, path2, path3,
       gp.project_name AS Project,
       gp.budget_usd AS ProjectBudget,
       prop.type AS PropertyType,
       prop.listed_price_usd AS PropertyPrice,
       city.name AS City
ORDER BY ProjectBudget DESC, PropertyPrice DESC
LIMIT 50;
```

### Visualization Idea

City nodes become bridges between high-budget projects and expensive properties.

---

## Suggested Presentation Order

Use this order for a clean flow:

1. Start with `City as a Central Multi-Sector Hub`.
2. Move into education tasks.
3. Move into healthcare tasks.
4. Move into government tasks.
5. Finish with city-level analytics and economic pressure.

Recommended order:

```text
1 → 4 → 5 → 6 → 2 → 7 → 3 → 8 → 9 → 10
```

This starts broad, then moves through individual domains, then ends with stronger analytical tasks.

---

## Notes for Neo4j Browser

After running each query:

1. Use the `Graph` result tab.
2. Increase or reduce `LIMIT` depending on visual clarity.
3. Use node colors by label.
4. Use captions such as:
   - `City.name`
   - `Student.full_name`
   - `University.name`
   - `Hospital.name`
   - `GovernmentProject.project_name`
   - `Ministry.ministry_name`
   - `Event.event_name`
   - `Company.company_name`
   - `Property.type`

For screenshots, avoid overly dense graphs. A clean graph with 20–50 returned paths is usually better for presentation than a visually overloaded graph.

---

## Relationship Reference

```text
(:University)-[:LOCATED_IN]->(:City)
(:Hospital)-[:LOCATED_IN]->(:City)
(:Company)-[:LOCATED_IN]->(:City)
(:Event)-[:LOCATED_IN]->(:City)
(:Property)-[:LOCATED_IN]->(:City)
(:GovernmentProject)-[:LOCATED_IN]->(:City)
(:Ministry)-[:LOCATED_IN]->(:City)

(:Student)-[:LIVES_IN]->(:City)
(:Student)-[:STUDIES_AT]->(:University)
(:Student)-[:ENROLLED_IN]->(:Course)

(:Course)-[:BELONGS_TO]->(:Department)
(:Department)-[:PART_OF]->(:University)

(:Patient)-[:LIVES_IN]->(:City)
(:Patient)-[:ADMITTED_TO]->(:Hospital)

(:GovernmentProject)-[:MANAGED_BY]->(:Ministry)

(:EventRegistration)-[:REGISTERED_FOR]->(:Event)
```
