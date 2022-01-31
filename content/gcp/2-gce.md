---
title: "GCE - Google Compute Engine"
metaTitle: "Google Compute Engine"
metaDescription: "gcloud command line"
---

```
glcoud sdk 설치: https://cloud.google.com/sdk 

```  

## GCE 개요 svg // TODO

## gcloud login (로그인)

$`gcloud auth login`
로그인 한다.

## 프로젝트 설정 
$`gcloud config set project PROJECT_ID`

# GCE 
## compute instance 생성
$`gcloud compute instances create test-instance-1 --zone us-central1-a`

### 결과 
```
Created [https://www.googleapis.com/compute/v1/projects/[projeectID]/zones/us-central1-a/instances/test-instance-1].
```

## instance list

$`gcloud compute instances list`
![capture 2022-01-31 AM 10 26 14](https://user-images.githubusercontent.com/16316626/151727092-09c4b34e-af44-4ad1-9999-920f081fd7d4.png)

```
gcloud compute instances list | grep tutor                                                             ✔
tutor-us          us-central1-a              e2-medium                  10.128.0.9   35.222.92.191   RUNNING
tutor-europe      europe-west6-a             e2-medium                  10.172.0.2   34.65.25.240    RUNNING
tutor-toronto     northamerica-northeast2-a  e2-medium                  10.188.0.2   34.130.126.193  RUNNING
```

## 접속
$`gcloud compute ssh --zone us-central1-a tutor-us`

![capture 2022-01-31 AM 10 28 35](https://user-images.githubusercontent.com/16316626/151727213-78aa0298-fd85-411c-bc60-548a5d0ac2e1.png)

```
sdk  ~  gcloud compute ssh --zone us-central1-a tutor-us                                                       ✔
Updating project ssh metadata...⠛Updated [https://www.googleapis.com/compute/v1/projects/zeta-axiom-338701].
Updating project ssh metadata...done.
Waiting for SSH key to propagate.
Warning: Permanently added 'compute.3026694066933510101' (ECDSA) to the list of known hosts.
Welcome to Ubuntu 18.04.6 LTS (GNU/Linux 5.4.0-1062-gcp x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Mon Jan 31 01:28:20 UTC 2022

  System load:  0.0               Processes:           110
  Usage of /:   17.5% of 9.52GB   Users logged in:     0
  Memory usage: 5%                IP address for ens4: 10.128.0.9
  Swap usage:   0%

 * Super-optimized for small spaces - read how we shrank the memory
   footprint of MicroK8s to make it the smallest full K8s around.

   https://ubuntu.com/blog/microk8s-memory-optimisation

0 updates can be applied immediately.

New release '20.04.3 LTS' available.
Run 'do-release-upgrade' to upgrade to it.


sdk@tutor-us:~$
```

