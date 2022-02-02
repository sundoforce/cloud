---
title: "Disk"
metaTitle: "Disk"
metaDescription: "Disk"
---

# Disk

## 디스크 확인
$`gcloud compute disks list` 

![capture 2022-01-31 AM 10 54 05](https://user-images.githubusercontent.com/16316626/151728768-f9e6e2d0-321f-44dc-982e-092ffe1cbfcb.png)

```
 sdk  ~  gcloud compute disks list                                                                              ✔
NAME              LOCATION                   LOCATION_SCOPE  SIZE_GB  TYPE         STATUS
tutor-us          us-central1-a              zone            10       pd-balanced  READY
tutor-europe      europe-west6-a             zone            10       pd-balanced  READY
global-web        asia-northeast3-a          zone            10       pd-balanced  READY
instance-was      asia-northeast3-a          zone            10       pd-balanced  READY
pet-mig-was-95tc  asia-northeast3-a          zone            10       pd-balanced  READY
pet-mig-was-lllb  asia-northeast3-a          zone            10       pd-balanced  READY
pet-mig-was-q0n4  asia-northeast3-a          zone            10       pd-balanced  READY
tutor-toronto     northamerica-northeast2-a  zone            10       pd-balanced  READY
 sdk  ~ 
 
```

## 디스크 연결 
`attach-disk` 명령 사용   
`rw` 읽고 쓰기  
$`gcloud compute instances attach-disk tutor-us --zone us-central1-a --disk disk-1 --mode rw`  

`ro`: read only ; 읽기 전용  
$`gcloud compute instances attach-disk totur-us --zone us-central1-a --disk disk-1 --mode ro`  

## 디스크 사용  
```
# 두 인스턴스에서 분리 
gcloud compute instances detach-disk instance-1 \
--zone us-central1-a --disk disk-1
# 읽고 쓰기 모드로 다시 연결
gcloud compute instances attach-disk instance-1 \
--zone us-central1-a --disk disk-1 --mode rw 

```



