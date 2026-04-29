# ADB_GroupProject — 10 Neo4j Visual Tasks

This document contains 10 Neo4j visual tasks for the Advanced Database Systems group project.  
Each task includes a presentation-ready question, graph shape, Cypher query, and visualization idea.

Repository: `ADB_GroupProject`  
DBMS: Neo4j Graph Database  
Output type: Visual graph results in Neo4j
Recommended result view: `Graph`

---

## Table of Contents
- [ADB\_GroupProject — 10 Neo4j Visual Tasks](#adb_groupproject--10-neo4j-visual-tasks)
  - [Table of Contents](#table-of-contents)
  - [1. City as a Central Multi-Sector Hub](#1-city-as-a-central-multi-sector-hub)
    - [Task Summary](#task-summary)
    - [Cypher Query](#cypher-query)
  - [2. Patient and Hospital Movement](#2-patient-and-hospital-movement)
    - [Task Summary](#task-summary-1)
    - [Cypher Query](#cypher-query-1)
  - [3. Government Project Network](#3-government-project-network)
    - [Task Summary](#task-summary-2)
    - [Cypher Query](#cypher-query-2)
  - [4. Cross-City Student Mobility](#4-cross-city-student-mobility)
    - [Task Summary](#task-summary-3)
    - [Cypher Query](#cypher-query-3)
  - [5. Full Academic Path for Students](#5-full-academic-path-for-students)
    - [Task Summary](#task-summary-4)
    - [Cypher Query](#cypher-query-4)
  - [6. Event Registrations and Their Cities](#6-event-registrations-and-their-cities)
    - [Task Summary](#task-summary-5)
    - [Cypher Query](#cypher-query-5)
  - [7. Cross-City Healthcare Referral Network](#7-cross-city-healthcare-referral-network)
    - [Task Summary](#task-summary-6)
    - [Cypher Query](#cypher-query-6)
  - [8. Ministry Cross-City Project Control](#8-ministry-cross-city-project-control)
    - [Task Summary](#task-summary-7)
    - [Cypher Query](#cypher-query-7)
  - [9. City Stress Index Graph](#9-city-stress-index-graph)
    - [Task Summary](#task-summary-8)
    - [Cypher Query](#cypher-query-8)
  - [10. Public Investment and Property Market Pressure](#10-public-investment-and-property-market-pressure)
    - [Task Summary](#task-summary-9)
    - [Cypher Query](#cypher-query-9)
  - [Presentation Order](#presentation-order)
  - [Notes for Neo4j](#notes-for-neo4j)
  - [Relationship Reference](#relationship-reference)

---

## 1. City as a Central Multi-Sector Hub

This introductory graph shows `City` as the central integration point across multiple datasets.

### Task Summary

| Item | Details |
|---|---|
| Presentation question | Which city acts as the strongest shared hub across education, healthcare, business, events, and real estate? |
| Graph shape | `University / Hospital / Company / Event / Property --[:LOCATED_IN]--> City` |
| Visualization idea | The city appears at the center of the graph, with different sectors around it such as education, healthcare, business, events, and properties. |

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

---

## 2. Patient and Hospital Movement

This graph separates each patient’s home city from the hospital city, allowing local and cross-city treatment patterns to appear clearly.

### Task Summary

| Item | Details |
|---|---|
| Presentation question | How do patients move from their home city to the hospital system, and are they treated locally or outside their city? |
| Graph shape | `Patient --[:LIVES_IN]--> HomeCity`<br>`Patient --[:ADMITTED_TO]--> Hospital --[:LOCATED_IN]--> HospitalCity` |
| Visualization idea | Each patient links to a home city and a hospital. The hospital then links to its own city, making healthcare movement visible. |

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

---

## 3. Government Project Network

This graph shows the public administration structure by connecting ministries, projects, budgets, statuses, and cities.

### Task Summary

| Item | Details |
|---|---|
| Presentation question | Which ministries control public projects, and how are those projects distributed across cities? |
| Graph shape | `Ministry <--[:MANAGED_BY]-- GovernmentProject --[:LOCATED_IN]--> City` |
| Visualization idea | Government projects appear between ministries and cities, forming a clear public-service network. |

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

---

## 4. Cross-City Student Mobility

This graph reveals educational migration by showing each student’s home city and university city.

### Task Summary

| Item | Details |
|---|---|
| Presentation question | Which students leave their home city for university, and which cities are sending or receiving students? |
| Graph shape | `Student --[:LIVES_IN]--> HomeCity`<br>`Student --[:STUDIES_AT]--> University --[:LOCATED_IN]--> UniversityCity` |
| Visualization idea | Students become bridge nodes between home cities and university cities. |

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

---

## 5. Full Academic Path for Students

This graph presents the complete education chain from students through courses, departments, universities, and cities.

### Task Summary

| Item | Details |
|---|---|
| Presentation question | How does each student connect into the full academic structure of courses, departments, universities, and locations? |
| Graph shape | `Student --[:ENROLLED_IN]--> Course --[:BELONGS_TO]--> Department --[:PART_OF]--> University --[:LOCATED_IN]--> City` |
| Visualization idea | The graph forms layered academic trees rooted around universities and cities. |

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

---

## 6. Event Registrations and Their Cities

This graph visualizes the event domain end-to-end and shows where registration activity concentrates.

### Task Summary

| Item | Details |
|---|---|
| Presentation question | How do registrations connect to events, and how are events distributed across cities? |
| Graph shape | `EventRegistration --[:REGISTERED_FOR]--> Event --[:LOCATED_IN]--> City` |
| Visualization idea | Popular events become dense clusters of registration nodes, while city nodes show geographic grouping. |

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

---

## 7. Cross-City Healthcare Referral Network

This graph focuses on cross-city healthcare movement by returning only patients treated outside their home city.

### Task Summary

| Item | Details |
|---|---|
| Presentation question | Which cities depend on hospitals in other cities, and where is cross-city healthcare movement strongest? |
| Graph shape | `Patient --[:LIVES_IN]--> HomeCity`<br>`Patient --[:ADMITTED_TO]--> Hospital --[:LOCATED_IN]--> HospitalCity` |
| Visualization idea | Patient nodes bridge two different city nodes, revealing referral-like movement between cities. |

### Cypher Query

```cypher
MATCH path1 = (p:Patient)-[:LIVES_IN]->(homeCity:City)
MATCH path2 = (p)-[:ADMITTED_TO]->(h:Hospital)-[:LOCATED_IN]->(hospitalCity:City)
RETURN path1, path2,
       p.full_name AS Patient,
       p.diagnosis AS Diagnosis,
       homeCity.name AS HomeCity,
       hospitalCity.name AS HospitalCity,
       CASE
         WHEN homeCity.name <> hospitalCity.name THEN 'Cross-City'
         ELSE 'Local'
       END AS ReferralType
LIMIT 30;
```

---

## 8. Ministry Cross-City Project Control

This graph reveals administrative centralization and cross-city government control.

### Task Summary

| Item | Details |
|---|---|
| Presentation question | Is public project management local, or are some cities controlled administratively from other cities? |
| Graph shape | `Ministry --[:LOCATED_IN]--> MinistryCity`<br>`GovernmentProject --[:MANAGED_BY]--> Ministry`<br>`GovernmentProject --[:LOCATED_IN]--> ProjectCity` |
| Visualization idea | Ministries appear as control hubs connected to projects outside their own city. |

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

---

## 9. City Stress Index Graph

This analytical graph computes a city-level stress score before returning the related graph paths.

### Task Summary

| Item | Details |
|---|---|
| Presentation question | Which cities carry the highest multi-sector load across healthcare, events, government projects, and real estate? |
| Graph shape | `Patient / Event / GovernmentProject / Property --> City`<br>`City is ranked by combined StressScore` |
| Visualization idea | The highest-stress cities appear as dense hubs surrounded by multiple sectors. |

### Cypher Query

```cypher
MATCH (city:City)
WITH city,
     COUNT { (p:Patient)-[:LIVES_IN]->(city) } AS Patients,
     COUNT { (e:Event)-[:LOCATED_IN]->(city) } AS Events,
     COUNT { (gp:GovernmentProject)-[:LOCATED_IN]->(city) } AS Projects,
     COUNT { (pr:Property)-[:LOCATED_IN]->(city) } AS Properties
WITH city, Patients, Events, Projects, Properties,
     Patients + Events + Projects + Properties AS StressScore
ORDER BY StressScore DESC
LIMIT 3

OPTIONAL MATCH p1 = (:Patient)-[:LIVES_IN]->(city)
WITH city, Patients, Events, Projects, Properties, StressScore,
     collect(DISTINCT p1)[..10] AS patientPaths

OPTIONAL MATCH p2 = (:Event)-[:LOCATED_IN]->(city)
WITH city, Patients, Events, Projects, Properties, StressScore, patientPaths,
     collect(DISTINCT p2)[..10] AS eventPaths

OPTIONAL MATCH p3 = (:GovernmentProject)-[:LOCATED_IN]->(city)
WITH city, Patients, Events, Projects, Properties, StressScore, patientPaths, eventPaths,
     collect(DISTINCT p3)[..10] AS projectPaths

OPTIONAL MATCH p4 = (:Property)-[:LOCATED_IN]->(city)
RETURN city,
       patientPaths,
       eventPaths,
       projectPaths,
       collect(DISTINCT p4)[..10] AS propertyPaths,
       Patients, Events, Projects, Properties, StressScore
ORDER BY StressScore DESC;
```

---

## 10. Public Investment and Property Market Pressure

This graph connects government spending with real estate values to support a planning and economics analysis.

### Task Summary

| Item | Details |
|---|---|
| Presentation question | Which cities show both large public investment and high property prices, suggesting economic pressure or development concentration? |
| Graph shape | `Ministry -- GovernmentProject -- City -- Property` |
| Visualization idea | City nodes become bridges between high-budget projects and expensive properties. |

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

---

## Presentation Order

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

## Notes for Neo4j

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
