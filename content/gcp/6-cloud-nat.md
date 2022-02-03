---
title: "Cloud NAT"
metaTitle: "Implement Private Google Access and Cloud NAT"
metaDescription: "Implement Private Google Access and Cloud NAT"
---


# Implement Private Google Access and Cloud NAT

[TCP 전달을 위한 IAP 사용](https://cloud.google.com/iap/docs/using-tcp-forwarding)

## VPC 생성

![image](https://user-images.githubusercontent.com/16316626/152290229-552cab72-6fa6-41f9-a515-e79b26958039.png)


## 방화벽 생성 (Friewall)

![image](https://user-images.githubusercontent.com/16316626/152290265-9598d520-5758-4d4d-8fe8-8ba5a93573ff.png)

## VM 생성

![image](https://user-images.githubusercontent.com/16316626/152290324-867a74c8-7d1b-42ca-89b5-a7bacc69c139.png)
![image](https://user-images.githubusercontent.com/16316626/152290341-c5d8f2a9-0a3c-475c-9835-6c4bcf283f66.png)
![image](https://user-images.githubusercontent.com/16316626/152290422-109de036-66f1-463f-a11f-69e3123b706d.png)

## Cloud Shell
`gcloud compute ssh vm-internal --zone us-central1-c --tunnel-through-iap`

### gcloud compute ssh vm-internal --zone us-central1-c --tunnel-through-iap

```

WARNING: The private SSH key file for gcloud does not exist.
WARNING: The public SSH key file for gcloud does not exist.
WARNING: You do not have an SSH key for gcloud.
WARNING: SSH keygen will be executed to generate a key.
This tool needs to create the directory [/home/student_00_9ba26ddd28ee/.ssh] before being able to generate SSH keys.

Do you want to continue (Y/n)?
Generating public/private rsa key pair.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Passphrases do not match.  Try again.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/student_00_9ba26ddd28ee/.ssh/google_compute_engine.
Your public key has been saved in /home/student_00_9ba26ddd28ee/.ssh/google_compute_engine.pub.
The key fingerprint is:
SHA256:VcAb54DLUQDLVmYvGaC89UHGOT5+fXnCTwtoKkzYmDg student_00_9ba26ddd28ee@cs-286852895825-default
The key's randomart image is:
+---[RSA 2048]----+
|      o+O*o..    |
|   . o B*++..    |
|    o =o++o*     |
|     + .=+. .    |
|    o =.S. ... . |
|   E + o. .o..= o|
|    . o  .o  ..=.|
|       o .     ..|
|        .        |
+----[SHA256]-----+
Warning: Permanently added 'compute.5961393491703942998' (ECDSA) to the list of known hosts.
Linux vm-internal 4.19.0-18-cloud-amd64 #1 SMP Debian 4.19.208-1 (2021-09-29) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Creating directory '/home/student-00-9ba26ddd28ee'.
```

## ping google 
```
ping -c 2 www.google.com
PING www.google.com (173.194.194.106) 56(84) bytes of data.

--- www.google.com ping statistics ---
2 packets transmitted, 0 received, 100% packet loss, time 13ms

```
[Cloud IAP enables context-aware access to VMs via SSH and RDP without bastion hosts](https://cloud.google.com/blog/products/identity-security/cloud-iap-enables-context-aware-access-to-vms-via-ssh-and-rdp-without-bastion-hosts)

![image](https://user-images.githubusercontent.com/16316626/152290974-ecdf083a-3e64-489e-9f0e-f019a45acadb.png)

# Bucket 생성   
멀티 리전으로   
## Copy an image file into your bucket  

```
gsutil cp gs://cloud-training/gcpnet/private/access.svg gs://[my_bucket]
```

## bucket에 복사 
```
gsutil cp gs://[my_bucket]/*.svg .
```

## vm-internal에 연결
```
gcloud compute ssh vm-internal --zone us-central1-c --tunnel-through-iap
```



gsutil cp gs://[my_bucket]/*.svg .


![image](https://user-images.githubusercontent.com/16316626/152291838-3bd5a901-4d81-43bd-a0d9-41145fa9da65.png)


VPC -> subnet -> Subnet detail 

# Configure a Cloud NAT gateway  

sudo apt-get update

gcloud compute ssh vm-internal --zone us-central1-c --tunnel-through-iap

sudo apt-get update


# Configure a Cloud NAT gateway
In the Cloud Console, on the Navigation menu (Navigation menu), click Network services > Cloud NAT.

![image](https://user-images.githubusercontent.com/16316626/152292313-a634921e-4de2-49da-ad20-2ee8565a87dd.png)
![image](https://user-images.githubusercontent.com/16316626/152292331-0bdc8ed3-531a-4270-8610-4502be498de4.png)

# Configure and view logs with Cloud NAT Logging

[로깅 및 모니터링 사용](https://cloud.google.com/nat/docs/monitoring) 

Cloudt Nat 에서 설정 
![image](https://user-images.githubusercontent.com/16316626/152292951-43389cd0-2092-4e13-b513-9335318077b4.png)



```
gcloud compute ssh vm-internal --zone us-central1-c --tunnel-through-iap
```
![image](https://user-images.githubusercontent.com/16316626/152293098-eec5ed8c-46a7-404a-86ea-76f0ec63c06e.png)



