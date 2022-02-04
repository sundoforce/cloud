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
```
gcloud compute project-info describe --project <your_project_ID>
```
#### 환경 변수 지정 
```
export PROJECT_ID=<your_project_ID>
export ZONE=<your_zone>
```
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


**Command details**

* `gcloud compute` allows you to manage your Compute Engine resources in a format that's simpler than the Compute Engine API.

* `instances create`  creates a new instance.

* `test2` is the name of the VM.

* The `--machine-type` flag specifies the machine type as n1-standard-2.

* The `--zone` flag specifies where the VM is created.

* If you omit the `--zone` flag, the `gcloud` tool can infer your desired zone based on your default properties.   
Other required instance settings, such as machine type and image, are set to default values if not specified in the create command.

## Help Command 

gcloud compute instances create --help

### Explore gcloud commands
gcloud -h

gcloud config --help
gcloud help config
gcloud config list
gcloud config list --all
gcloud components list

# 2: Install a new component

## 자동 완성 모드 
**Auto-complete mode**
$sudo apt-get install google-cloud-sdk
$gcloud beta interactive


```
gcloud beta interactive
Welcome to the gcloud interactive shell environment.

    Tips:

      o start by typing commands to get auto-suggestions and inline help
      o use tab, up-arrow, or down-arrow to navigate completion dropdowns
      o use space or / to accept the highlighted dropdown item
      o run gcloud <alpha|beta> interactive --help for more info

    Run $ gcloud feedback to report bugs or request new features.
```

gcloud compute instances describe <your_vm>

### SSH 접속
gcloud compute ssh [instance 이름]  --zone $ZONE


### Google Cloud services

* Cloud Console  
* Command-line interface  
* Client libraries



### Referens Link
[커스텀 VM 만들기](https://cloud.google.com/compute/docs/instances/creating-instance-with-custom-machine-type)
[머신 계열](https://cloud.google.com/compute/docs/machine-types)
[API 디자인 가이드](https://cloud.google.com/apis/design/)   
[google APIs Explorer](https://developers.google.com/apis-explorer/#p/)  

[gcloud 도구 개요](https://cloud.google.com/sdk/gcloud)  
[리전 및 영역](https://cloud.google.com/compute/docs/regions-zones/)  
[Linux VM에 연결](https://cloud.google.com/compute/docs/instances/connecting-to-instance)  
  
  
https://stackoverflow.com/questions/57406218/what-does-ps-auwx-grep-nginx-means

```
a lift 'only yourself' restriction -> list all processes with a terminal.
u 'user format' -> provides additional information columns.
w wide output -> for when you have a screen wide enough to show all info.
x lift 'must have terminal' restriction -> a+x == list everything.
```




