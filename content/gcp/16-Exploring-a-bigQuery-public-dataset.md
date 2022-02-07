---
title: "Exploring a BigQuery Public Dataset"
metaTitle: "Exploring a BigQuery Public Dataset"
metaDescription: "Exploring a BigQuery Public Dataset"
---

# Task 1. Query a public dataset
## Load the USA Names dataset
[Big Query] > [ADD DATA] > [Public Datasets]  
## Query the USA Names dataset
[query editor]

```
SELECT
  name, gender,
  SUM(number) AS total
FROM
  `bigquery-public-data.usa_names.usa_1910_2013`
GROUP BY
  name, gender
ORDER BY
  total DESC
LIMIT
  10
```

# Task 2. Create a custom table


# Task 3. Create a dataset

# Task 4. Load the data into a new table  
 
# Task 5. Query the table
[Compose new query] 
```
SELECT
 name, count
FROM
 `babynames.names_2014`
WHERE
 gender = 'M'
ORDER BY count DESC LIMIT 5
```

# reference links 
* [데이터 웨어하우스 운영자를 위한 BigQuery](https://cloud.google.com/architecture/bigquery-data-warehouse)  
* [bq 명령줄 도구 사용](https://cloud.google.com/bigquery/docs/bq-command-line-tool)  
* [BigQuery API 클라이언트 라이브러리 ](https://cloud.google.com/bigquery/docs/reference/libraries)
* [BigQuery API](https://cloud.google.com/bigquery/docs/reference/rest)  
* https://www.ssa.gov/OACT/babynames/background.html  
* [데이터 세트 위치](https://cloud.google.com/bigquery/docs/locations)  
