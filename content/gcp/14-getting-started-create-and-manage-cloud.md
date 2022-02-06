---
title: "Create and Manage Cloud Resources: Challenge Lab"
metaTitle: "Create and Manage Cloud Resources: Challenge Lab"
metaDescription: "Create and Manage Cloud Resources: Challenge Lab"
---

## Naming Rules 
|GCP|Code|
|------|---|
|Load balance| lb|
|Instance Template|it|
|Managed instance group| mig|
|Unmanaged instance group| ig| 
|firewall| fw| 
|Health Check| hc|  
|template| template| 
| target-pools| tp|
|backend-services| bs| 
|clusters| clusters|
  
# Task 1. Create a project jumphost instance

✅ ☰ > [Compute Engine] > [VM instances] > [Create]

✔︎ Cloud Shell 
```
gcloud compute instances create nucleus-jumphost \
  --zone us-east1-b  \
  --machine-type f1-micro  \
  --image-family debian-9  \
  --image-project debian-cloud
      
```


# Task 2. Create a Kubernetes service cluster

## Create a cluster (in the us-east1-b zone) to host the service.
> 서비스를 호스팅할 클러스터(us-east1-b 영역)를 만듭니다.  

### 사전 작업 
```
$gcloud auth list
$gcloud config list project
```
### zone을 `/zone us-east1-b`로 설정 
$`gcloud config set compute/zone us-east1-b`  


### Create a cluster  
클러스터 생성 
```
gcloud container clusters create sdk-clusters
```
생성 확인 
```
gcloud container clusters get-credentials sdk-clusters
```

## Use the Docker container hello-app   
> (gcr.io/google-samples/hello-app:2.0) as a place holder; 
> the team will replace the container with their own work later.  

> Docker 컨테이너 hello-app(gcr.io/google-samples/hello-app:2.0)을 자리표시자로 사용하세요. 
> 팀에서 나중에 컨테이너를 팀의 작업으로 대체할 것입니다.  
```
kubectl create deployment {server-name} \
          --image={image}
```

```
kubectl create deployment sdk-server \
          --image=gcr.io/google-samples/hello-app:2.0
```

## Expose the app on port App port number .
> 앱을 포트 App port number 에 노출시킵니다.
```
kubectl expose deployment sdk-server \
          --type=LoadBalancer \
          --port 8080
```

# Task 3. Set up an HTTP load balancer  
(작업 3: HTTP 부하 분산기 설정하기)   

```
cat << EOF > startup.sh
#! /bin/bash
apt-get update
apt-get install -y nginx
service nginx start
sed -i -- 's/nginx/Google Cloud Platform - '"\$HOSTNAME"'/' /var/www/html/index.nginx-debian.html
EOF
```  

## Create an instance template.
> 인스턴스 템플릿을 만듭니다.  

```
gcloud compute instance-templates create sdk-it \
  --metadata-from-file startup-script=startup.sh \

```

## Create a target pool.
> 대상 풀을 만듭니다.

$`gcloud compute target-pools create sdk-tp`

## Create a managed instance group.  
> 관리형 인스턴스 그룹을 만듭니다.

```
gcloud compute instance-groups managed create sdk-ig \
          --base-instance-name sdk-server \
          --size 2 \
          --template sdk-server-template \
          --region us-east1 \
          -–target-pool sdk-tp       
```

## Create a firewall rule named as Firewall rule to allow traffic (80/tcp).  
> 트래픽(80/tcp)을 허용하며 이름이 Firewall rule 인 방화벽 규칙을 만듭니다.

```
gcloud compute firewall-rules create sdk-fw \
          --allow tcp:80 
```

## Create a health check.
> 헬스체크(상태 점검)을 만듭니다.

$`gcloud compute http-health-checks create sdk-hc`

```
gcloud compute instance-groups managed \
          set-named-ports sdk-mig \
          --named-ports http:80 \
          --region us-east1
      
```

## Create a backend service, and attach the managed instance group with named port (http:80).
> 백엔드 서비스를 만들고 관리형 인스턴스 그룹과 이름을 지정한 포트(http:80)를 연결합니다.  

```
gcloud compute backend-services create sdk-bs \
          --protocol HTTP \
          --http-health-checks sdk-hc \
          --global
```

## Create a URL map, and target the HTTP proxy to route requests to your URL map.  
> URL 맵을 만들고 URL 맵에 요청을 라우팅할 대상 HTTP 프록시를 설정합니다.

```
gcloud compute target-http-proxies create http-lb-proxy \
          --url-map sdk-map
```
## Create a forwarding rule.
> 전달 규칙을 만듭니다.  

```
gcloud compute forwarding-rules create http-content-rule \
        --global \
        --target-http-proxy sdk-hc \
        --ports 80
```
방화벽 확인 
$`gcloud compute forwarding-rules list`


## Reference Links
https://github.com/codeGarry/Getting-Started-Create-and-Manage-Cloud-Resources-Challenge-Lab/blob/master/New%20Text%20Document.txt   
https://www.onlineintercollege.com/2021/03/getting-started-create-and-manage-cloud.html  
https://janvijain.github.io/Qwiklabs-Create-and-Manage-Cloud-Resources-Challenge-Lab/  

