---
title: "Kubernetes Engine"
---

[Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/)

[표준 클러스터 아키텍처](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture)
[Compute Engine](https://cloud.google.com/compute)

Kubernetes on Google Cloud
When you run a GKE cluster, you also gain the benefit of advanced cluster management features that Google Cloud provides. These include:

Load balancing for Compute Engine instances
Node pools to designate subsets of nodes within a cluster for additional flexibility
Automatic scaling of your cluster's node instance count
Automatic upgrades for your cluster's node software
Node auto-repair to maintain node health and availability
Logging and Monitoring with Cloud Monitoring for visibility into your cluster

```
gcloud auth list

gcloud config list project
```

# gcloud config set compute/zone us-central1-a
```
gcloud config set compute/zone us-central1-a
```


# 2: Create a GKE cluster

클러스터 생성
```
gcloud container clusters create sdk-gke-cluster
```
### Result

```
Default change: VPC-native is the default mode during cluster creation for versions greater than 1.21.0-gke.1500. To create advanced routes based clusters, please pass the `--no-enable-ip-alias` flag
Note: Your Pod address range (`--cluster-ipv4-cidr`) can accommodate at most 1008 node(s).

Creating cluster sdk-gke-cluster in us-central1-a...working...
Creating cluster sdk-gke-cluster in us-central1-a...done.     
Created [https://container.googleapis.com/v1/projects/qwiklabs-gcp-02-96cbd2d1a423/zones/us-central1-a/clusters/sdk-gke-cluster].
To inspect the contents of your cluster, go to: https://console.cloud.google.com/kubernetes/workload_/gcloud/us-central1-a/sdk-gke-cluster?project=qwiklabs-gcp-02-96cbd2d1a423
kubeconfig entry generated for sdk-gke-cluster.
NAME: sdk-gke-cluster
LOCATION: us-central1-a
MASTER_VERSION: 1.21.6-gke.1500
MASTER_IP: 34.68.115.197
MACHINE_TYPE: e2-medium
NODE_VERSION: 1.21.6-gke.1500
NUM_NODES: 3
STATUS: RUNNING
```
# 3: Get authentication credentials for the cluster

gcloud container clusters get-credentials sdk-gke-cluster
```
Fetching cluster endpoint and auth data.
kubeconfig entry generated for sdk-gke-cluster.
```
# 4: Deploy an application to the cluster

## hello server 생성
```
$kubectl create deployment hello-server --image=gcr.io/google-samples/hello-app:1.0

deployment.apps/hello-server created
```
## Service 생성

$`kubectl expose deployment hello-server --type=LoadBalancer --port 8080`

```
service/hello-server exposed

```

$`kubectl get service`  
```
NAME           TYPE           CLUSTER-IP    EXTERNAL-IP   PORT(S)          AGE
hello-server   LoadBalancer   10.76.11.16   <pending>     8080:30656/TCP   29s
kubernetes     ClusterIP      10.76.0.1     <none>        443/TCP          5m14s
```

![capture 2022-02-04 AM 9 56 30](https://user-images.githubusercontent.com/16316626/152454577-b49bd70e-4edb-4ad0-ab65-41d12e17f525.png)

# 5.Deleting the cluster

$`gcloud container clusters delete sdk-gke-cluster`
```
The following clusters will be deleted.
 - [sdk-gke-cluster] in [us-central1-a]

Do you want to continue (Y/n)?  Y

Deleting cluster sdk-gke-cluster...done.     
Deleted [https://container.googleapis.com/v1/projects/qwiklabs-gcp-02-96cbd2d1a423/zones/us-central1-a/clusters/sdk-gke-cluster].

```


# Referens Link

[표준 클러스터 아키텍처](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture)  
[Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/)  
[Compute Engine](https://cloud.google.com/compute)  
[부하 분산 및 확장](https://cloud.google.com/compute/docs/load-balancing-and-autoscaling)  
[노드풀](https://cloud.google.com/kubernetes-engine/docs/concepts/node-pools)  
[클러스터 자동 확장 처리](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-autoscaler)  
[노드 자동 업그레이드](https://cloud.google.com/kubernetes-engine/docs/how-to/node-auto-upgrades)  
[노드 자동 복구](https://cloud.google.com/kubernetes-engine/docs/how-to/node-auto-repair)  
[GKE GCP 제품군](https://cloud.google.com/stackdriver/docs/solutions/gke)  
[리전 및 영역](https://cloud.google.com/compute/docs/regions-zones/#available)  
[GKE 개요](https://cloud.google.com/kubernetes-engine/docs/concepts/kubernetes-engine-overview)
## k8s
[Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment)
[Service](https://kubernetes.io/docs/concepts/services-networking/service/)
[expose](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#expose)





