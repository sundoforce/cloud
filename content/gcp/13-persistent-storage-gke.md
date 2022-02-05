---
title: "Persistent Storage for Google Kubernetes Engine"
---


# 1. Create PVs and PVCs
## Connect to the lab GKE cluster
```
$export my_zone=us-central1-a
$export my_cluster=standard-cluster-1
$source <(kubectl completion bash)
$gcloud container clusters get-credentials $my_cluster --zone $my_zone

Fetching cluster endpoint and auth data.
kubeconfig entry generated for standard-cluster-1.
```
## Create and apply a manifest with a PVC

pvc-demo.yaml
```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: hello-web-disk
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 30Gi
```



```
$git clone https://github.com/GoogleCloudPlatform/training-data-analyst
$ln -s ~/training-data-analyst/courses/ak8s/v1.1 ~/ak8s
$cd ~/ak8s/Storage/

```
### 현재 PVC를 보여 준다
```
$$kubectl get persistentvolumeclaim
```

현재는 없ㅎ다. 

```
No resources found in default namespace.
```

### PVC만든다.
```
kubectl apply -f pvc-demo.yaml

```
### 다시 조회 
```
NAME           STATUS VOLUME        CAP   ACCESS MODES      CLASS   AGE
hello-web-disk Bound  pvc-8...34   30Gi            RWO   standard    5s
```
생겼다.

# 2. Mount and verify Google Cloud persistent disk PVCs in Pods
## Mount the PVC to a Pod
**`pod-volume-demo.yaml`**
```
kind: Pod
apiVersion: v1
metadata:
  name: pvc-demo-pod
spec:
  containers:
    - name: frontend
      image: nginx
      volumeMounts:
      - mountPath: "/var/www/html"
        name: pvc-demo-volume
  volumes:
    - name: pvc-demo-volume
      persistentVolumeClaim:
        claimName: hello-web-disk
```

### 만든다.
```
$kubectl apply -f pod-volume-demo.yaml
```
만들어 졌다.
```
pod/pvc-demo-pod created
```
### 확인
```
$kubectl get pods

NAME           READY   STATUS    RESTARTS   AGE
pvc-demo-pod   1/1     Running   0          28s
```

### 셀세션 시작 
```
kubectl exec -it pvc-demo-pod -- sh
```

```
echo Test webpage in a persistent volume!>/var/www/html/index.html
chmod +x /var/www/html/index.html
exet
```

## Test the persistence of the PV
### 1. 지운다. pvc-demo-pod.
$`kubectl delete pod pvc-demo-pod`
```
pod "pvc-demo-pod" deleted
```
### 2. 확인 한다.
$`kubectl get pods`
지워졌다. 
```
No resources found in default namespace.
```

### 3. PVC를 확인
$`kubectl get persistentvolumeclaim`
   
```
NAME             STATUS   VOLUME                   CAPACITY   ACCESS MODES   STORAGECLASS   AGE
hello-web-disk   Bound    pvc-                     30Gi       RWO            standard       7m43s
```
### 4. pvc-demo-pod 재 패포
$`kubectl apply -f pod-volume-demo.yaml`  
Output  
```
pod/pvc-demo-pod created
```

### 5. pvc-demoe-pod 쉘 접속
$`kubectl exec -it pvc-demo-pod -- sh`  
접속되면 #으로 바뀐다. 
#`cat /var/www/html/index.html`

Output
```
Test webpage in a persistent volume!
```
빠져 나온다.
#`exit`  

![image](https://user-images.githubusercontent.com/16316626/152635602-49876939-5ec1-43d7-ade9-5e5c0e8de593.png)

# 3.Create StatefulSets with PVCs
> 이 작업에서는 StatefulSet에서 PVC를 사용합니다.   
> StatefulSet은 포드에 고유 식별자가 제공된다는 점을 제외하고는 배포와 같습니다.  


## Release the PVC
### pvc-demo-pod 삭제
$`kubectl delete pod pvc-demo-pod`  

지워졌졌음.
```
pod "pvc-demo-pod" deleted
```
확인   
`kubectl get pods`
결과
```
No resources found in default namespace.
```  

## Create a StatefulSet
스테이플셋 생성 
**statefulset-demo.yaml**
```
kind: Service
apiVersion: v1
metadata:
  name: statefulset-demo-service
spec:
  ports:
  - protocol: TCP
    port: 80
    targetPort: 9376
  type: LoadBalancer
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: statefulset-demo
spec:
  selector:
    matchLabels:
      app: MyApp
  serviceName: statefulset-demo-service
  replicas: 3
  updateStrategy:
    type: RollingUpdate
  template:
    metadata:
      labels:
        app: MyApp
    spec:
      containers:
      - name: stateful-set-container
        image: nginx
        ports:
        - containerPort: 80
          name: http
        volumeMounts:
        - name: hello-web-disk
          mountPath: "/var/www/html"
  volumeClaimTemplates:
  - metadata:
      name: hello-web-disk
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 30Gi
```

### 생성
$`kubectl apply -f statefulset-demo.yaml`

로드벨런싱 되는 서비스와,  30G 볼륨이 생성되었음.
`hello-web-disk` `/var/www/html` 마운트 욈

```sh
service/statefulset-demo-service created
statefulset.apps/statefulset-demo created
```

## Verify the connection of Pods in StatefulSets  
StatefulSet에서 포드의 연결 확인
### 세부 정보 확인
$`kubectl describe statefulset statefulset-demo`  
Output  
```
Name:               statefulset-demo
Namespace:          default
CreationTimestamp:  Sat, 05 Feb 2022 09:11:44 +0000
Selector:           app=MyApp
Labels:             <none>
Annotations:        <none>
Replicas:           3 desired | 3 total
Update Strategy:    RollingUpdate
Pods Status:        3 Running / 0 Waiting / 0 Succeeded / 0 Failed
Pod Template:
  Labels:  app=MyApp
  Containers:
   stateful-set-container:
    Image:        nginx
    Port:         80/TCP
    Host Port:    0/TCP
    Environment:  <none>
    Mounts:
      /var/www/html from hello-web-disk (rw)
  Volumes:  <none>
Volume Claims:
  Name:          hello-web-disk
  StorageClass:
  Labels:        <none>
  Annotations:   <none>
  Capacity:      30Gi
  Access Modes:  [ReadWriteOnce]
Events:
  Type    Reason            Age    From                    Message
  ----    ------            ----   ----                    -------
  Normal  SuccessfulCreate  2m52s  statefulset-controller  create Claim hello-web-disk-statefulset-demo-0 Pod statefulset-demo-0 in StatefulSet statefulset-demo success
  Normal  SuccessfulCreate  2m52s  statefulset-controller  create Pod statefulset-demo-0 in StatefulSet statefulset-demo successful
  Normal  SuccessfulCreate  2m38s  statefulset-controller  create Claim hello-web-disk-statefulset-demo-1 Pod statefulset-demo-1 in StatefulSet statefulset-demo success
  Normal  SuccessfulCreate  2m38s  statefulset-controller  create Pod statefulset-demo-1 in StatefulSet statefulset-demo successful
  Normal  SuccessfulCreate  2m24s  statefulset-controller  create Claim hello-web-disk-statefulset-demo-2 Pod statefulset-demo-2 in StatefulSet statefulset-demo success
  Normal  SuccessfulCreate  2m24s  statefulset-controller  create Pod statefulset-demo-2 in StatefulSet statefulset-demo successful
```

### 포드 리스트 확인
$`keubectl get pods`  
```
NAME                 READY   STATUS    RESTARTS   AGE
statefulset-demo-0   1/1     Running   0          4m14s
statefulset-demo-1   1/1     Running   0          4m
statefulset-demo-2   1/1     Running   0          3m46s
```

### PVC 확인
$`kubectl get pvc`
```
NAME                                STATUS   VOLUME   CAPACITY   ACCESS MODES   STORAGECLASS   AGE
hello-web-disk                      Bound    pvc-80   30Gi       RWO            standard       20m
hello-web-disk-statefulset-demo-0   Bound    pvc-3a   30Gi       RWO            standard       5m4s
hello-web-disk-statefulset-demo-1   Bound    pvc-42   30Gi       RWO            standard       4m50s
hello-web-disk-statefulset-demo-2   Bound    pvc-4c   30Gi       RWO            standard       4m36s
```

### 스테이트풀 pvc 확인
$`kubectl describe pvc hello-web-disk-statefulset-demo-0`

# 4. Verify the persistence of Persistent Volume connections to Pods managed by StatefulSets
##  statefulset-demo-0 쉘 접속 
$`kubectl exec -it statefulset-demo-0 -- sh`
```
# echo Test webpage in a persistent volume!>/var/www/html/index.html
chmod +x /var/www/html/index.html#
#
# cat /var/www/html/index.html
Test webpage in a persistent volume!
#
# exit
```


