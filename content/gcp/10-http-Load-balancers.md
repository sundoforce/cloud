---
title: "Set Up Network and HTTP Load Balancers"
metaTitle: "Set Up Network and HTTP Load Balancers"
metaDescription: "Set Up Network and HTTP Load Balancers"
---



# Set Up Network and HTTP Load Balancers

* [외부 TCP/UDP 네트워크 부하 분산 개요](https://cloud.google.com/load-balancing/docs/network)  
* [외부 HTTP(S) 부하 분산 개요](https://cloud.google.com/load-balancing/docs/https)  
* [Cloud Load Balancing 개요](https://cloud.google.com/load-balancing/docs/load-balancing-overview#a_closer_look_at_cloud_load_balancers)  
* [부하 분산기 선택](https://cloud.google.com/load-balancing/docs/choosing-load-balancer) 



# 1. Set the default region and zone for all resources
```
gcloud config set compute/zone us-central1-a
gcloud config set compute/region us-central1
```

# 2. Create multiple web server instances

## 1
```
gcloud compute instances create www1 \
  --image-family debian-9 \
  --image-project debian-cloud \
  --zone us-central1-a \
  --tags network-lb-tag \
  --metadata startup-script="#! /bin/bash
    sudo apt-get update
    sudo apt-get install apache2 -y
    sudo service apache2 restart
    echo '<!doctype html><html><body><h1>www1</h1></body></html>' | tee /var/www/html/index.html"
```
    
## 2
```
gcloud compute instances create www2 \
  --image-family debian-9 \
  --image-project debian-cloud \
  --zone us-central1-a \
  --tags network-lb-tag \
  --metadata startup-script="#! /bin/bash
    sudo apt-get update
    sudo apt-get install apache2 -y
    sudo service apache2 restart
    echo '<!doctype html><html><body><h1>www2</h1></body></html>' | tee /var/www/html/index.html"
```

## 3
```
gcloud compute instances create www3 \
  --image-family debian-9 \
  --image-project debian-cloud \
  --zone us-central1-a \
  --tags network-lb-tag \
  --metadata startup-script="#! /bin/bash
    sudo apt-get update
    sudo apt-get install apache2 -y
    sudo service apache2 restart
    echo '<!doctype html><html><body><h1>www3</h1></body></html>' | tee /var/www/html/index.html"
```

## Create a firewall rule to allow external traffic to the VM instances:
```
gcloud compute firewall-rules create www-firewall-network-lb \
    --target-tags network-lb-tag --allow tcp:80
```

```
gcloud compute instances list
```

```
NAME: www1
ZONE: us-central1-a
MACHINE_TYPE: n1-standard-1
PREEMPTIBLE:
INTERNAL_IP: 10.128.0.2
EXTERNAL_IP: 
STATUS: RUNNING

NAME: www2
ZONE: us-central1-a
MACHINE_TYPE: n1-standard-1
PREEMPTIBLE:
INTERNAL_IP: 10.128.0.3
EXTERNAL_IP: 
STATUS: RUNNING

NAME: www3
ZONE: us-central1-a
MACHINE_TYPE: n1-standard-1
PREEMPTIBLE:
INTERNAL_IP: 10.128.0.4
EXTERNAL_IP: 
```

# 3: Configure the load balancing service

## 1. Create a static external IP address for your load balancer:
```
gcloud compute addresses create network-lb-ip-1 \
 --region us-central1
```

(Output)
```
Created [https://www.googleapis.com/compute/v1/projects/xxxxx5/regions/us-central1/addresses/network-lb-ip-1].
```

## Add a legacy HTTP health check resource:. 
```
gcloud compute http-health-checks create basic-check
```

### Add a target pool in the same region as your instances. Run the following to create the target pool and use the health check, which is required for the service to function:

```
gcloud compute target-pools add-instances www-pool \
    --instances www1,www2,www3
```

### 방화벽 추가 
```
gcloud compute forwarding-rules create www-rule \
    --region us-central1 \
    --ports 80 \
    --address network-lb-ip-1 \
    --target-pool www-pool
```

# 4: Sending traffic to your instances
```
gcloud compute forwarding-rules describe www-rule --region us-central1
```

(OutPut)
```
IPAddress: 
IPProtocol: TCP
creationTimestamp: '2022-02-03T20:21:03.427-08:00'
description: ''
fingerprint: AiheMBl5-KE=
id: '634970601065355072'
kind: compute#forwardingRule
labelFingerprint: 42WmSpB8rSM=
loadBalancingScheme: EXTERNAL
name: www-rule
networkTier: PREMIUM
portRange: 80-80
region: https://www.googleapis.com/compute/v1/projects/xxxxxx/regions/us-central1
selfLink: https://www.googleapis.com/compute/v1/projects/xxxxx/regions/us-central1/forwardingRules/www-rule
target: https://www.googleapis.com/compute/v1/projects/xxxxx5/regions/us-central1/targetPools/www-pool

```

# gp

```
while true; do curl -m1 IP_ADDRESS; done
```


# 5: Create an HTTP load balancer
## 5.1 First, create the load balancer template:
```
gcloud compute instance-templates create lb-backend-template \
   --region=us-central1 \
   --network=default \
   --subnet=default \
   --tags=allow-health-check \
   --image-family=debian-9 \
   --image-project=debian-cloud \
   --metadata=startup-script='#! /bin/bash
     apt-get update
     apt-get install apache2 -y
     a2ensite default-ssl
     a2enmod ssl
     vm_hostname="$(curl -H "Metadata-Flavor:Google" \
     http://169.254.169.254/computeMetadata/v1/instance/name)"
     echo "Page served from: $vm_hostname" | \
     tee /var/www/html/index.html
     systemctl restart apache2'
```
## 5.2 Create a managed instance group based on the template:

```
gcloud compute instance-groups managed create lb-backend-group \
   --template=lb-backend-template --size=2 --zone=us-central1-a
```

## 5.3 Create the fw-allow-health-check firewall rule.

```
gcloud compute firewall-rules create fw-allow-health-check \
    --network=default \
    --action=allow \
    --direction=ingress \
    --source-ranges=130.211.0.0/22,35.191.0.0/16 \
    --target-tags=allow-health-check \
    --rules=tcp:80
```

## 5.4 set up a global static external IP
```
gcloud compute addresses create lb-ipv4-1 \
    --ip-version=IPV4 \
    --global
```

```
gcloud compute addresses describe lb-ipv4-1 \
    --format="get(address)" \
    --global
```

## 5.5 Create a health check for the load balancer:

```
gcloud compute health-checks create http http-basic-check \
    --port 80
```

## 5.6 Create a backend service
```
gcloud compute backend-services create web-backend-service \
    --protocol=HTTP \
    --port-name=http \
    --health-checks=http-basic-check \
    --global
```

## 5.7 Add your instance group as the backend to the backend service:

```
gcloud compute backend-services add-backend web-backend-service \
    --instance-group=lb-backend-group \
    --instance-group-zone=us-central1-a \
    --global
```

## 5.8 Create a URL map to route the incoming requests to the default backend service

```
gcloud compute url-maps create web-map-http \
    --default-service web-backend-service
```

## 5.9 Create a target HTTP proxy to route requests to your URL map:
```
gcloud compute target-http-proxies create http-lb-proxy \
    --url-map web-map-http
```

## 5.10 Create a global forwarding rule to route incoming requests to the proxy:
```
gcloud compute forwarding-rules create http-content-rule \
    --address=lb-ipv4-1\
    --global \
    --target-http-proxy=http-lb-proxy \
    --ports=80
```
![image](https://user-images.githubusercontent.com/16316626/152472395-57a88b4d-bbe9-4c43-84b7-a9b7e070cf70.png)


https://partner.cloudskillsboost.google/focuses/11606?parent=catalog

