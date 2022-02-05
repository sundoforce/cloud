---
title: "Kubernetes Engine Deployments"
---

# 1. Create deployment manifests and deploy to the cluster
## Connect to the lab GKE cluster
### 환경 변수 설정
```
export my_zone=us-central1-a
export my_cluster=standard-cluster-1
```

### 설정 반영
```
source <(kubectl completion bash)
```


### 클러스터 구성
```
gcloud container clusters get-credentials $my_cluster --zone $my_zone
```
#### OUTPUT
```
Fetching cluster endpoint and auth data.
kubeconfig entry generated for standard-cluster-1.
```

### Repository 복제
```
git clone https://github.com/GoogleCloudPlatform/training-data-analyst
```

### 심볼릭 링크 
```
ln -s ~/training-data-analyst/courses/ak8s/v1.1 ~/ak8s
```

### ak8s 디렉토리로 이동
```
cd ~/ak8s/Deployments/
```

## Create a deployment manifest


### nginx-deployment.yaml 
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.7.9
        ports:
        - containerPort: 80
```

### kubectl apply 
```
kubectl apply -f ./nginx-deployment.yaml
```
### kubectl get deployments
**Output**
```
NAME               READY   UP-TO-DATE   AVAILABLE   AGE
nginx-deployment   3/3     3            3           11s
```

# 2. Manually scale up and down the number of Pods in deployments  
> 끄고 싶을 때가 있음..

## Scale Pods up and down in the console
☰ > Kubernetes Engine > Workloads.

![image](https://user-images.githubusercontent.com/16316626/152631986-1e6abf4e-7b6c-4135-bd5d-0564960753ae.png)

![image](https://user-images.githubusercontent.com/16316626/152632012-1b9d4b69-f0fe-4d1b-98b1-3125baa259a4.png)
![image](https://user-images.githubusercontent.com/16316626/152632019-9d944b59-5524-4dd7-bd11-ea59d3ea5fe3.png)

## Scale Pods up and down in the shell

replicas 갯수 커맨드로 늘이기 
### 현재 deployments보기
```
kubectl get deployments
```
### Output
```
NAME               READY   UP-TO-DATE   AVAILABLE   AGE
nginx-deployment   1/1     1            1           4m24s
```

### replicas 3개로 늘이기 
```
kubectl scale --replicas=3 deployment nginx-deployment
```

### 결과 
```
$kubectl get deployments
NAME               READY   UP-TO-DATE   AVAILABLE   AGE
nginx-deployment   3/3     3            3           4m53s
```

# 3. Trigger a deployment rollout and a deployment rollback
## Trigger a deployment rollout

```
$kubectl set image deployment.v1.apps/nginx-deployment nginx=nginx:1.9.1 --record

Flag --record has been deprecated, --record will be removed in the future
deployment.apps/nginx-deployment image updated
```
### To view the rollout status, execute the following command:


```
kubectl rollout status deployment.v1.apps/nginx-deployment
```

### 확인
```
kubectl get deployments
```

###  rollout history 보기
```
kubectl rollout history deployment nginx-deploymentkubectl rollout history deployment nginx-deployment
```

### Output
```
deployment.apps/nginx-deployment
REVISION  CHANGE-CAUSE
1         <none>
2         kubectl set image deployment.v1.apps/nginx-deployment nginx=nginx:1.9.1 --record=true
```

### 최신 배포판 상세 보기 

```
$kubectl rollout history deployment/nginx-deployment --revision=3

```

# 4. Define the service type in the manifest
## 메니패스트에서 버시스 유형 정의
#### yaml
```
apiVersion: v1
kind: Service
metadata:
  name: nginx
spec:
  type: LoadBalancer
  selector:
    app: nginx
  ports:
  - protocol: TCP
    port: 60000
    targetPort: 80
    
```


### 로드 반렌스 확인 

```
$kubectl get service nginx

NAME    TYPE           CLUSTER-IP    EXTERNAL-IP   PORT(S)           AGE
nginx   LoadBalancer   10.12.7.221   <pending>     60000:30953/TCP   28s
```

# 5. 배포
## yaml
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-canary
  labels:
    app: nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
        track: canary
        Version: 1.9.1
    spec:
      containers:
      - name: nginx
        image: nginx:1.9.1
        ports:
        - containerPort: 80
```

##  kubectl
```
kubectl apply -f nginx-canary.yaml
```

```
kubectl get deployments
NAME               READY   UP-TO-DATE   AVAILABLE   AGE
nginx-canary       1/1     1            1           38s
nginx-deployment   3/3     3            3           14m
```

## replicas 0으로 줄이기 
```
kubectl scale --replicas=0 deployment nginx-deployment

NAME               READY   UP-TO-DATE   AVAILABLE   AGE
nginx-canary       1/1     1            1           84s
nginx-deployment   0/0     0            0           15m
```
