---
title: "VPC Networking"
metaTitle: "VPC Networking"
metaDescription: "VPC Networking"
---

# VPC Networking
![lX+lZ11ZdTwmfFe3Kwrh3uu3mWYFQwnS0LdcgBS70ng=](https://user-images.githubusercontent.com/16316626/152282010-425b2f30-f599-4018-bd2c-3f1eaba05d2d.png)


[Google Cloud region.](https://cloud.google.com/compute/docs/regions-zones/#available)

[VPC 네트워크 개요](https://cloud.google.com/vpc/docs/vpc#auto-mode-considerations)

```
gcloud compute networks create NAME --project=qwiklabs-gcp-02-a4fc478e2e74 --subnet-mode=custom --mtu=1460 --bgp-routing-mode=regional

$
gcloud compute networks subnets create NAME --project=qwiklabs-gcp-02-a4fc478e2e74 --range=IP_RANGE --network=NAME --region=REGION
```



gcloud compute networks create privatenet --subnet-mode=custom


```
Created [https://www.googleapis.com/compute/v1/projects/id/global/networks/privatenet].
NAME: privatenet
SUBNET_MODE: CUSTOM
BGP_ROUTING_MODE: REGIONAL
IPV4_RANGE:
GATEWAY_IPV4:

Instances on this network will not be reachable until firewall rules
are created. As an example, you can allow all internal traffic between
instances as well as SSH, RDP, and ICMP by running:

$ gcloud compute firewall-rules create <FIREWALL_NAME> --network privatenet --allow tcp,udp,icmp --source-ranges <IP_RANGE>
$ gcloud compute firewall-rules create <FIREWALL_NAME> --network privatenet --allow tcp:22,tcp:3389,icmp

```

gcloud compute networks subnets create privatesubnet-us --network=privatenet --region=us-central1 --range=172.16.0.0/24
```
$ gcloud compute networks subnets create privatesubnet-us --network=privatenet --region=us-central1 --range=172.16.0.0/24
Created [https://www.googleapis.com/compute/v1/projects/{ID}/regions/us-central1/subnetworks/privatesubnet-us].
NAME: privatesubnet-us
REGION: us-central1
NETWORK: privatenet
RANGE: 172.16.0.0/24
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:
```

gcloud compute networks subnets create privatesubnet-eu --network=privatenet --region=europe-west1 --range=172.20.0.0/20

```
Created
NAME: privatesubnet-eu
REGION: europe-west1
NETWORK: privatenet
RANGE: 172.20.0.0/20
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:
```

gcloud compute networks list
```
 gcloud compute networks list
NAME: managementnet
SUBNET_MODE: CUSTOM
BGP_ROUTING_MODE: REGIONAL
IPV4_RANGE:
GATEWAY_IPV4:

NAME: mynetwork
SUBNET_MODE: CUSTOM
BGP_ROUTING_MODE: REGIONAL
IPV4_RANGE:
GATEWAY_IPV4:

NAME: privatenet
SUBNET_MODE: CUSTOM
BGP_ROUTING_MODE: REGIONAL
IPV4_RANGE:
GATEWAY_IPV4:
```

 gcloud compute networks list

```
gcloud compute networks list
NAME: managementnet
SUBNET_MODE: CUSTOM
BGP_ROUTING_MODE: REGIONAL
IPV4_RANGE:
GATEWAY_IPV4:

NAME: mynetwork
SUBNET_MODE: CUSTOM
BGP_ROUTING_MODE: REGIONAL
IPV4_RANGE:
GATEWAY_IPV4:

NAME: privatenet
SUBNET_MODE: CUSTOM
BGP_ROUTING_MODE: REGIONAL
IPV4_RANGE:
GATEWAY_IPV4:
student_00_9ba26ddd28ee@cloudshell:~ (qwiklabs-gcp-02-a4fc478e2e74)$ gcloud compute networks subnets list --sort-by=NETWORK
NAME: managementsubnet-us
REGION: us-central1
NETWORK: managementnet
RANGE: 10.130.0.0/20
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:

NAME: mynetwork
REGION: us-central1
NETWORK: mynetwork
RANGE: 10.128.0.0/20
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:

NAME: mynetwork
REGION: europe-west1
NETWORK: mynetwork
RANGE: 10.132.0.0/20
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:

NAME: mynetwork
REGION: us-west1
NETWORK: mynetwork
RANGE: 10.138.0.0/20
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:

NAME: mynetwork
REGION: asia-east1
NETWORK: mynetwork
RANGE: 10.140.0.0/20
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:

NAME: mynetwork
REGION: us-east1
NETWORK: mynetwork
RANGE: 10.142.0.0/20
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:

NAME: mynetwork
REGION: asia-northeast1
NETWORK: mynetwork
RANGE: 10.146.0.0/20
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:

NAME: mynetwork
REGION: asia-southeast1
NETWORK: mynetwork
RANGE: 10.148.0.0/20
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:

NAME: mynetwork
REGION: us-east4
NETWORK: mynetwork
RANGE: 10.150.0.0/20
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:

NAME: mynetwork
REGION: australia-southeast1
NETWORK: mynetwork
RANGE: 10.152.0.0/20
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:

NAME: mynetwork
REGION: europe-west2
NETWORK: mynetwork
RANGE: 10.154.0.0/20
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:

NAME: mynetwork
REGION: europe-west3
NETWORK: mynetwork
RANGE: 10.156.0.0/20
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:

NAME: mynetwork
REGION: southamerica-east1
NETWORK: mynetwork
RANGE: 10.158.0.0/20
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:

NAME: mynetwork
REGION: asia-south1
NETWORK: mynetwork
RANGE: 10.160.0.0/20
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:

NAME: mynetwork
REGION: northamerica-northeast1
NETWORK: mynetwork
RANGE: 10.162.0.0/20
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:

NAME: mynetwork
REGION: europe-west4
NETWORK: mynetwork
RANGE: 10.164.0.0/20
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:

NAME: mynetwork
REGION: europe-north1
NETWORK: mynetwork
RANGE: 10.166.0.0/20
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:

NAME: mynetwork
REGION: us-west2
NETWORK: mynetwork
RANGE: 10.168.0.0/20
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:

NAME: mynetwork
REGION: asia-east2
NETWORK: mynetwork
RANGE: 10.170.0.0/20
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:

NAME: mynetwork
REGION: europe-west6
NETWORK: mynetwork
RANGE: 10.172.0.0/20
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:

NAME: mynetwork
REGION: asia-northeast2
NETWORK: mynetwork
RANGE: 10.174.0.0/20
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:

NAME: mynetwork
REGION: asia-northeast3
NETWORK: mynetwork
RANGE: 10.178.0.0/20
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:

NAME: mynetwork
REGION: us-west3
NETWORK: mynetwork
RANGE: 10.180.0.0/20
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:

NAME: mynetwork
REGION: us-west4
NETWORK: mynetwork
RANGE: 10.182.0.0/20
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:

NAME: mynetwork
REGION: asia-southeast2
NETWORK: mynetwork
RANGE: 10.184.0.0/20
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:

NAME: mynetwork
REGION: europe-central2
NETWORK: mynetwork
RANGE: 10.186.0.0/20
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:

NAME: mynetwork
REGION: northamerica-northeast2
NETWORK: mynetwork
RANGE: 10.188.0.0/20
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:

NAME: mynetwork
REGION: asia-south2
NETWORK: mynetwork
RANGE: 10.190.0.0/20
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:

NAME: mynetwork
REGION: australia-southeast2
NETWORK: mynetwork
RANGE: 10.192.0.0/20
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:

NAME: mynetwork
REGION: southamerica-west1
NETWORK: mynetwork
RANGE: 10.194.0.0/20
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:

NAME: privatesubnet-us
REGION: us-central1
NETWORK: privatenet
RANGE: 172.16.0.0/24
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:

NAME: privatesubnet-eu
REGION: europe-west1
NETWORK: privatenet
RANGE: 172.20.0.0/20
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
IPV6_CIDR_RANGE:
EXTERNAL_IPV6_CIDR_RANGE:
```
![capture 2022-02-03 PM 2 30 56](https://user-images.githubusercontent.com/16316626/152286810-1181d13d-7c16-4881-bd4f-ec4c671229dd.png)

## Friewall
|--|--|  
|Property	|Value (type value or select option as specified)|  
|Name|	managementnet-allow-icmp-ssh-rdp|  
|Network|	managementnet|  
|Targets|	All instances in the network|  
|Source filter	|IPv4 Ranges|  
|Source IPv4 ranges	|0.0.0.0/0|  
|Protocols and ports|	Specified protocols and ports|  

![image](https://user-images.githubusercontent.com/16316626/152287049-ede51196-884c-42b6-9966-3f6bcf3bf470.png)


### Equivalent Command line.

```
gcloud compute --project=qwiklabs-gcp-02-a4fc478e2e74 firewall-rules create managementnet-allow-icmp-ssh-rdp --direction=INGRESS --priority=1000 --network=managementnet --action=ALLOW --rules=tcp:22,tcp:3389,icmp --source-ranges=0.0.0.0/0

```

## Create the firewall rules for privatenet


```
gcloud compute firewall-rules create privatenet-allow-icmp-ssh-rdp --direction=INGRESS --priority=1000 --network=privatenet --action=ALLOW --rules=icmp,tcp:22,tcp:3389 --source-ranges=0.0.0.0/0
```

```
 gcloud compute firewall-rules create privatenet-allow-icmp-ssh-rdp --direction=INGRESS --priority=1000 --network=privatenet --action=ALLOW --rules=icmp,tcp:22,tcp:3389 --source-ranges=0.0.0.0/0
Creating firewall...working..Created [https://www.googleapis.com/compute/v1/projects/qwiklabs-gcp-02-a4fc478e2e74/global/firewalls/privatenet-allow-icmp-ssh-rdp].
Creating firewall...done.
NAME: privatenet-allow-icmp-ssh-rdp
NETWORK: privatenet
DIRECTION: INGRESS
PRIORITY: 1000
ALLOW: icmp,tcp:22,tcp:3389
DENY:
```

gcloud compute firewall-rules list --sort-by=NETWORK

```
NAME: managementnet-allow-icmp-ssh-rdp
NETWORK: managementnet
DIRECTION: INGRESS
PRIORITY: 1000
ALLOW: tcp:22,tcp:3389,icmp
DENY:
DISABLED: False

NAME: privatenet-allow-icmp-ssh-rdp
NETWORK: privatenet
DIRECTION: INGRESS
PRIORITY: 1000
ALLOW: icmp,tcp:22,tcp:3389
DENY:
DISABLED: False

To show all fields of the firewall, please show in JSON format: --format=json
To show all fields in table format, please see the examples in --help.
```


# Create the managementnet-us-vm instance

![image](https://user-images.githubusercontent.com/16316626/152287507-b75f6a1c-6d5d-46a0-93a4-90fa9e9fbc76.png)

gcloud command line
  
  
```
gcloud compute instances create managementnet-us-vm --project=qwiklabs-gcp-02-a4fc478e2e74 --zone=us-central1-c --machine-type=n1-standard-1 --network-interface=network-tier=PREMIUM,subnet=managementsubnet-us --metadata=enable-oslogin=true --maintenance-policy=MIGRATE --service-account=392250948586-compute@developer.gserviceaccount.com --scopes=https://www.googleapis.com/auth/devstorage.read_only,https://www.googleapis.com/auth/logging.write,https://www.googleapis.com/auth/monitoring.write,https://www.googleapis.com/auth/servicecontrol,https://www.googleapis.com/auth/service.management.readonly,https://www.googleapis.com/auth/trace.append --create-disk=auto-delete=yes,boot=yes,device-name=managementnet-us-vm,image=projects/debian-cloud/global/images/debian-10-buster-v20220118,mode=rw,size=10,type=projects/qwiklabs-gcp-02-a4fc478e2e74/zones/us-central1-c/diskTypes/pd-balanced --no-shielded-secure-boot --shielded-vtpm --shielded-integrity-monitoring --reservation-affinity=any
```

## 추가 생성 
```
gcloud compute instances create privatenet-us-vm --zone=us-central1-c --machine-type=f1-micro --subnet=privatesubnet-us --image-family=debian-10 --image-project=debian-cloud --boot-disk-size=10GB --boot-disk-type=pd-standard --boot-disk-device-name=privatenet-us-vm
```

## 목록 확인
gcloud compute instances list --sort-by=ZONE

# Task 4. Explore the connectivity across networks







