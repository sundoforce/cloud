---
title: "Hello GCP World"
metaTitle: "Syntax Highlighting is the meta title tag for this page"
metaDescription: "This is the meta description for this page"
---

# Google Cloud Platform 

`Compute:` A variety of machine types that support any type of workload. The different computing options let you decide how much control you want over operational details and infrastructure.  
`Storage`: Data storage and database options for structured or unstructured, relational or non relational data.  
`Networking`: Services that balance application traffic and provision security rules.  
`Cloud Operations`: A suite of cross-cloud logging, monitoring, trace, and other service reliability tools.  
`Tools`: Services that help developers manage deployments and application build pipelines.    
`Big Data`: Services that allow you to process and analyze large datasets.  
`Artificial Intelligence`: A suite of APIs that run specific artificial intelligence and machine learning tasks on Google Cloud.  

## Google Cloud 제품
https://cloud.google.com/products#top_of_page

## VM insatnace 생성
gcloud compute instances create gcelab2 --machine-type n1-standard-2 --zone us-central1-f

### ssh 연결
gcloud compute ssh gcelab2 --zone us-central1-f

## Cloud shell 
zone, region 가져오기 

gcloud config get-value compute/zone
gcloud config get-value compute/region

### 제대로 되지 않은 경우 
Click Navigation menu (Navigation menu), and then click Home > Dashboard.

gcloud compute project-info describe --project <your_project_ID>

#### 환경 변수 지정 
export PROJECT_ID=<your_project_ID>
export ZONE=<your_zone>

## VM 생성 

gcloud compute instances create test2 --machine-type n1-standard-2 --zone $ZONE
```
Created [https://www.googleapis.com/compute/v1/projects/id/zones/us-central1-a/instances/gcelab2].
NAME: test2
ZONE: us-central1-a
MACHINE_TYPE: n1-standard-2
PREEMPTIBLE:
INTERNAL_IP: 10.128.0.2
EXTERNAL_IP: 
STATUS: RUNNING
```


