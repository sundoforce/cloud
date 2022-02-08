---
title: "Creating a Streaming Data Pipeline for a Real-Time Dashboard with Dataflow"
metaTitle: "Creating a Streaming Data Pipeline for a Real-Time Dashboard with Dataflow"
metaDescription: "데이터 흐름이 있는 실시간 대시보드를 위한 스트리밍 데이터 파이프라인 생성"
---

> 중간에 망해서 , 이글은 다시 업데이트 예정입니다.  
> 
# Task 1. Create a Pub/Sub topic and BigQuery dataset

## taxirides 이름의 bigquery를 만듭니다.  
$`bq mk taxirides`

```
$ bq mk taxirides

Dataset 'qwiklabs-gcp-xxxxxxx:taxirides' successfully created.
```

## axirides.realtime 테이블(나중에 스트리밍할 빈 스키마)을 만듭니다.

```
bq mk \
--time_partitioning_field timestamp \
--schema ride_id:string,point_idx:integer,latitude:float,longitude:float,\
timestamp:timestamp,meter_reading:float,meter_increment:float,ride_status:string,\
passenger_count:integer -t taxirides.realtime
```

## bigquery 콘솔 메뉴로 이동합니다.  
☰ >  Big Data > BigQuery 

### `dataset`을 생성합니다.  
프로젝트 아이디 옆에 `⋮`을 눌러 `Create dataset`을 누릅니다. 

![image](https://user-images.githubusercontent.com/16316626/153008132-ff256e7e-5c18-4db3-ab37-b72c8dd5a4c9.png)

![image](https://user-images.githubusercontent.com/16316626/153008345-52e4a0ce-8d7a-4e9d-a420-ad2b0991ec12.png)



# Task 2. Create a Cloud Storage bucket  
☰ >  Cloud Storage  로 이동합니다. 

* `CREATE BUCKET`을 생성합니다.   


버킷 아이디는 global에서 유니크 해야 합니다.  

# Task 3. Set up a Dataflow Pipeline 

☰ >  Big Data > Dataflow  로 이동힙니다 . 
`CREATE JOB FROM TEMPLATE.`  

![image](https://user-images.githubusercontent.com/16316626/153010022-22118807-d131-45f4-bda0-e428021117e9.png)
![image](https://user-images.githubusercontent.com/16316626/153010412-d5f57577-9871-4864-8f15-1f9abd2b2acc.png)

# Task 4. Analyze the taxi data using BigQuery
## Menu: ☰ > BigQuery
```
SELECT * FROM taxirides.realtime LIMIT 10
```


# Task 5. Perform aggregations on the stream for reporting

```
WITH streaming_data AS (
SELECT
  timestamp,
  TIMESTAMP_TRUNC(timestamp, HOUR, 'UTC') AS hour,
  TIMESTAMP_TRUNC(timestamp, MINUTE, 'UTC') AS minute,
  TIMESTAMP_TRUNC(timestamp, SECOND, 'UTC') AS second,
  ride_id,
  latitude,
  longitude,
  meter_reading,
  ride_status,
  passenger_count
FROM
  taxirides.realtime
WHERE ride_status = 'dropoff'
ORDER BY timestamp DESC
LIMIT 100000
)
# calculate aggregations on stream for reporting:
SELECT
 ROW_NUMBER() OVER() AS dashboard_sort,
 minute,
 COUNT(DISTINCT ride_id) AS total_rides,
 SUM(meter_reading) AS total_revenue,
 SUM(passenger_count) AS total_passengers
FROM streaming_data
GROUP BY minute, timestamp
```


## 새 시크릿 모드로 https://datastudio.google.com/ 에 접속합니다.   
## Reports >  Start with a Template > Blank Report 
![image](https://user-images.githubusercontent.com/16316626/153011176-7bf0da20-027b-4d34-a1d1-79001012b487.png)

## Bigquery 로 돌아옵니다.  
 EXPLORE DATA > Explore with Data Studio   
* Chart type: Combo chart  
* Date range Dimension: dashboard_sort  
* Dimension: dashboard_sort  
* Drill Down: dashboard_sort (Make sure that Drill down option is turned ON)    
* Metric: SUM() total_rides, SUM() total_passengers, SUM() total_revenue  
* Sort: dashboard_sort, Ascending (latest rides first)  

# Task 6. Create a real-time dashboard


![image](https://user-images.githubusercontent.com/16316626/153012058-7b1443d4-8de9-4169-b1e5-a8258446851c.png)



# Task 7. Create a time series dashboard
 ![image](https://user-images.githubusercontent.com/16316626/153012013-f8342fba-7b3a-467b-a58e-798edc7933f0.png)

`CUSTOM QUERY` 
```
SELECT
  *
FROM
  taxirides.realtime
WHERE
  ride_status='dropoff'
```

# Task 8. Stop the Dataflow job
![image](https://user-images.githubusercontent.com/16316626/153012416-bed8a4a2-67f1-44a8-8e1e-93ca27b6bf36.png)

## Menu  
☰ >  Dataflow  
에서 정지합니다. 


# Links 

* https://cloud.google.com/pubsub/
* https://data.cityofnewyork.us/
* https://cloud.google.com/dataflow
* https://cloud.google.com/bigquery/
