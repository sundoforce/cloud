---
title: "Classifying Images of Clouds in the Cloud with AutoML Vision"
metaTitle: "Classifying Images of Clouds in the Cloud with AutoML Vision"
metaDescription: "AutoML 비전을 통한 클라우드 이미지 분류"
---

> 이 실습에서는 이미지를 Cloud 스토리지에 업로드하고 이 이미지를 사용하여  
> 다양한 유형의 구름(적층, 적층 등)를 인식하도록 사용자 지정 모델을 교육합니다


# Task 1. Set up AutoML Vision
## Cloud AutoML API 활성화 
### 메뉴  
☰ > APIs & Services > Library   
* Cloud AutoML API 활성화 [Enable]   
  ![image](https://user-images.githubusercontent.com/16316626/152941848-5b72c4c1-f122-4bf5-a6a0-db01dcd9f975.png)
## Activate Cloud Shell  
![image](https://user-images.githubusercontent.com/16316626/152941901-6c07d008-9920-414d-84a9-40a5fbe2bdf8.png)

### 버킷을 만듭니다. 

```
gsutil mb -p $DEVSHELL_PROJECT_ID \
    -c regional    \
    -l us-central1 \
    gs://$DEVSHELL_PROJECT_ID-vcm/
```

그리고 AutoML UI에 접속합니다.  
https://console.cloud.google.com/vision/datasets 


# Task 2. Upload training images to Cloud Storage
### 메뉴  
☰ > Cloud Storage > Browser  
클라우드 트레이닝의 automl용의 이미지를 조금 전 만든 구글 스토리이제 복사합니다.  
``` 
gsutil -m cp -r gs://cloud-training/automl-lab-clouds/* gs://$DEVSHELL_PROJECT_ID-vcm/
```  
### 확인 
```
gsutil ls gs://$DEVSHELL_PROJECT_ID-vcm/
gs://qwiklabs-gcp-01-84e906daed8e-vcm/data.csv
gs://qwiklabs-gcp-01-84e906daed8e-vcm/cirrus/
gs://qwiklabs-gcp-01-84e906daed8e-vcm/cumulonimbus/
gs://qwiklabs-gcp-01-84e906daed8e-vcm/cumulus/
```
# Task 3. Create an AutoML Vision training dataset  
```
gsutil cp gs://cloud-training/automl-lab-clouds/data.csv .
head --lines=10 data.csv
sed -i -e "s/placeholder/$DEVSHELL_PROJECT_ID-vcm/g" ./data.csv
head --lines=10 data.csv
gsutil cp ./data.csv gs://$DEVSHELL_PROJECT_ID-vcm/
gsutil ls gs://$DEVSHELL_PROJECT_ID-vcm/
```
![image](https://user-images.githubusercontent.com/16316626/152945004-b6c24d3c-5d68-473d-a97b-c3badc93d159.png)
 * New dataset > Single-label Classification  > create dataset 
 * Select a CSV file on Cloud Storage 
 * gs:// [BrOWSE] 선택 합니다. 

![image](https://user-images.githubusercontent.com/16316626/152946577-8c7d0e7a-0fff-461e-92ed-acdd57a7f483.png)

# Task 4. Inspect the images  
Dataset에서 `Filter`도 해보고, add label도 할 수 있습니다. 
![image](https://user-images.githubusercontent.com/16316626/152947172-7418e820-f2f3-40c2-b90c-fd819da8f065.png)

![image](https://user-images.githubusercontent.com/16316626/152947152-d6d43d69-38aa-4499-88a6-7f13bfe0af59.png)

# Task 5. Train your model 
[Train ] > [Start training] 
![image](https://user-images.githubusercontent.com/16316626/152947379-18efe9a0-3d7b-4cfc-a1f6-2d4d6b2737ee.png)
* `into the Set your budget`: 8   
* `Deploy model to 1 node after training`: check  

![image](https://user-images.githubusercontent.com/16316626/152947598-b96ec77f-b568-48b8-87f6-60c1ca63e213.png)


# Task 6. Evaluate your model   
[Evaluate]  
Confidence threshold  
![image](https://user-images.githubusercontent.com/16316626/152948380-74e54c79-7f79-4def-8e23-a56d987fc8e8.png)

# Task 7. Generate predictions  
[Test & Use]  
Model  >  Upload images    
<img width="2032" alt="스크린샷 2022-02-08 19 03 49" src="https://user-images.githubusercontent.com/16316626/156086005-86b3baaf-e79e-4468-a99d-27e0d8a93093.png">
<img width="674" alt="스크린샷 2022-02-08 19 04 40" src="https://user-images.githubusercontent.com/16316626/156086021-92eb8bb5-c8f0-4b52-b894-8f362e6f6359.png">
<img width="1072" alt="스크린샷 2022-02-08 19 05 20" src="https://user-images.githubusercontent.com/16316626/156086023-8b4270cd-3076-4006-a10f-0f3ca8552394.png">




