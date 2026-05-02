# Neo4j CRUD Operations

This folder adds the missing CRUD requirement for the Neo4j KRG graph database
project. The scripts demonstrate create, read, update, and delete operations on
a small demo subgraph using the same labels and relationships as the main
dataset.

## What This Demonstrates

The CRUD workflow uses these existing graph elements:

- `(:Student)`
- `(:Course)`
- `(:Enrollment)`
- `(:City)`
- `(:University)`
- `(:Department)`
- `(:Student)-[:LIVES_IN]->(:City)`
- `(:Student)-[:STUDIES_AT]->(:University)`
- `(:Student)-[:ENROLLED_IN]->(:Course)`
- `(:Course)-[:BELONGS_TO]->(:Department)`
- `(:Department)-[:PART_OF]->(:University)`

All demo identifiers start with `CRUD_DEMO_` so they are easy to find and safe
to delete without affecting the imported CSV records.

## Files

| File | Operation | Purpose |
|---|---|---|
| `01_create.cypher` | Create | Adds a demo student, course, enrollment node, and education relationships. |
| `02_read.cypher` | Read | Retrieves the demo subgraph and also returns a tabular summary. |
| `03_update.cypher` | Update | Updates the demo student, enrollment node, and enrollment relationship. |
| `04_delete.cypher` | Delete | Deletes only nodes whose IDs start with `CRUD_DEMO_`. |

## How To Run

1. Build the database first using the import workflow in `fetching_data.md`.
2. Open Neo4j Browser or Neo4j Workspace.
3. Run the files in order:
   - `01_create.cypher`
   - `02_read.cypher`
   - `03_update.cypher`
   - `02_read.cypher` again to confirm the update
   - `04_delete.cypher` when you want to clean up the demo data
4. For presentation screenshots, run `02_read.cypher` and switch the result
   panel to the graph view.

## Safety Note

The delete script matches only demo nodes with identifiers beginning with
`CRUD_DEMO_`. It intentionally does not delete shared nodes such as `City` or
the existing `University` node from the main dataset.
