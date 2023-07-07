# TRAINING

## USEFUL NPM PACKAGE

- npm i @reduxjs/toolkit react-redux react-router-dom redux-persist
- npm i antd
- npm i axios redux-thunk                

## MONGODB QUERIES

to filter the data in aggregate method  it can have multiple comparator like $gt $eq by default it is eq 
format ==>  
```python
db.article.aggregate(
    { $filter : { author : { $eq : "Joe Bloggs" } } }
);
```

The following filter finds all documents where the value of name is "Andrea Le".
```python
{ name: "Andrea Le" }
```

The following query filter uses the $not operator to find all documents where:
- The value of the name field is not equal to "Andrea Le", or
- The name field does not exist
```python
{ name: { $not: { $eq: "Andrea Le" } } }
```

The following query filter uses the $lte operator to find all documents where version is less than or equal to 4.
```python
{ version: { $lte: 4 } }
```

The following query filter  uses the $gt operator and Date() method to find all documents where the dateCreated field value is later than June 22nd, 2000.
```python
{ dateCreated: { $gt: Date('2000-06-22') } }
```

The following query filter uses the $elemMatch operator to find all documents where at least one value in the scores array is greater than 80 and less than 90.
```python
{ scores: { $elemMatch: { $gt: 80, $lt: 90 } }
```

The following query filter finds all documents where the UUID is "002636e1-10cd-4c8b-a9a7-01b7bfd3899c".
```python
{_id: UUID('002636e1-10cd-4c8b-a9a7-01b7bfd3899c')}
```

$project corresponds to choosing specific fields to return in a SQL SELECT statement.
format ==>
```python
db.article.aggregate(
  { $project : { headline : 1, author : 1 } }
)
```
To include fields:
```python
{ year: 1, name: 1 }
```
To exclude fields:
```python
{ year: 0, name: 0 }
```

$sort corresponds to the ORDER BY ... clause in a SQL SELECT statement.
format ==>
```python
db.article.aggregate(
  { $sort : { headline : 1 } }
);
```

Enter the sort document into the Sort field:

- To specify ascending order for a field, set the field to 1 in the sort document.
- To specify descending order for a field, set the field and -1 in the sort documents.
```python
{ year: -1, name: 1 }
```

$skip corresponds to the LIMIT ... OFFSET ... clause in a SQL SELECT statement.
```python
db.article.aggregate(
  { $limit : 50 },
  { $skip : 435 }
);
```
$limit corresponds to the LIMIT ... clause in a SQL SELECT statement.
```python
db.article.aggregate(
  { $limit : 10 }
);
```