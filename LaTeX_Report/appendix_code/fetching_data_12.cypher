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
