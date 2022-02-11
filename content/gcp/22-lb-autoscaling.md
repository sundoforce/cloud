---
title: "Configuring an HTTP Load Balancer with Autoscaling"
metaTitle: "Configuring an HTTP Load Balancer with Autoscaling"
metaDescription: "Configuring an HTTP Load Balancer with Autoscaling"
---

> 퀵랩의 내용을 정리한 것 입니다.  
> 잊어버리지 않기 위해서요...


![image](https://user-images.githubusercontent.com/16316626/153608582-fa715224-0b62-41fc-b2f6-ef6720672c10.png)


In this lab, you learn how to perform the following tasks:

* Create a health check firewall rule  
* Create a NAT configuration using Cloud Router  
* Create a custom image for a web server  
* Create an instance template based on the custom image  
* Create two managed instance groups  
* Configure an HTTP load balancer with IPv4 and IPv6  
* Stress test an HTTP load balancer  

# Task 1. Configure a health check firewall rule  
방화벽 규칙을 만듭니다. 

[Create Firewall Rule]   
fw-allow-health-checks
 ![image](https://user-images.githubusercontent.com/16316626/153610397-9e3d605a-fac9-45e6-95a0-6491999b6933.png)

# Task 2: Create a NAT configuration using Cloud Router  

Network services > Cloud NAT.  
![image](https://user-images.githubusercontent.com/16316626/153610799-55bd13c9-50f2-4aa9-9d8c-2976b3d4608d.png)
]
![image](https://user-images.githubusercontent.com/16316626/153610779-a506d45b-9909-48ec-912c-a5faa2a9d3a3.png)

# Task 3: Create a custom image for a web server  

ompute Engine > VM instances  

![image](https://user-images.githubusercontent.com/16316626/153610997-d8305bee-aaca-4244-9157-5917840bc16f.png)
![image](https://user-images.githubusercontent.com/16316626/153611229-51f903da-782b-4e9d-83be-15ab6798a909.png)


```
sudo apt-get update
sudo apt-get install -y apache2
sudo service apache2 start
curl localhost


# 부팅후에도 서비스 등록 합니다.
sudo update-rc.d apache2 enable


```

![image](https://user-images.githubusercontent.com/16316626/153611868-e5c23149-e186-4805-ae3b-07fcc9e7e03a.png)


`sudo service apache2 status`

## Prepare the disk to create a custom image
디스크가 지워져도 Keep disk인지 확인합니다.  
![image](https://user-images.githubusercontent.com/16316626/153612366-365830ae-bdd4-423c-8fb9-8b8fb97d2b85.png)

인스턴스를 삭제 합니다. 
![image](https://user-images.githubusercontent.com/16316626/153612452-15eba8a4-cdf2-4bea-99c8-916fb72ec643.png)

## Create the custom image  
![image](https://user-images.githubusercontent.com/16316626/153612664-ed44387b-153e-46ff-a71d-697559ce54c0.png)

생성합니다. ![image](https://user-images.githubusercontent.com/16316626/153612755-81ad8120-166d-4c66-9911-d5676b1663e4.png)
![image](https://user-images.githubusercontent.com/16316626/153612850-554c1c9b-4267-47ae-a86b-74066c122597.png)


# Task 4. Configure an instance template and create instance groups  

## Configure the instance template 
![image](https://user-images.githubusercontent.com/16316626/153613068-ab7b7380-9190-4710-a21e-c4e20d629570.png)  
![image](https://user-images.githubusercontent.com/16316626/153613088-bd8280b9-d77b-483f-811a-711a7ddea1ee.png)

![image](https://user-images.githubusercontent.com/16316626/153613267-50bc6dc0-480d-4df5-94b4-6a1c1495f0d5.png)  


![image](https://user-images.githubusercontent.com/16316626/153613470-25815b39-123e-4a76-8c6a-956f2add1ab1.png)
 
 
 ## Create the managed instance groups  
 ![image](https://user-images.githubusercontent.com/16316626/153613604-8dcd19be-c79f-4175-8bc6-d15d94425d62.png)
![image](https://user-images.githubusercontent.com/16316626/153613912-9bfc9f1a-0c82-4212-ae31-ddcec76d0c88.png)
![image](https://user-images.githubusercontent.com/16316626/153614225-20ebdc6d-a955-4b93-8825-3f7e6db36aa0.png)  
![image](https://user-images.githubusercontent.com/16316626/153614307-62b6bb2b-4083-4e6c-899a-05bf5e6911fd.png)  

![image](https://user-images.githubusercontent.com/16316626/153614354-75517bfd-9a70-4e1e-b815-a9907742670b.png)

![image](https://user-images.githubusercontent.com/16316626/153614402-60b30935-6f5d-4a93-be84-4d337c151e78.png)

![image](https://user-images.githubusercontent.com/16316626/153614467-8c6aa4d4-b98b-45f6-8cb1-cc493388cec5.png)  
![image](https://user-images.githubusercontent.com/16316626/153615177-3c5a7e7f-8b80-4cbf-9203-acfeecee5955.png)


##  Verify the backends
 
![image](https://user-images.githubusercontent.com/16316626/153615415-25dc0a43-6dd7-4f01-b3a1-6b671f40544e.png)



# Task 5. Configure the HTTP load balancer  
## Start the configuration
![image](https://user-images.githubusercontent.com/16316626/153615588-49cc3172-15b9-4c58-a104-2c1d1aa0e6df.png)


Network Services > Load balancing.
![image](https://user-images.githubusercontent.com/16316626/153615700-4b379da8-94ae-4d3e-bcc9-b2d1eb468127.png)
![image](https://user-images.githubusercontent.com/16316626/153615783-dab24165-08c3-4ff4-80d2-d370bd0920af.png)
## Configure the backend


![image](https://user-images.githubusercontent.com/16316626/153615843-865b6457-c4dd-4ab2-a777-bde3ac23b290.png)  


![image](https://user-images.githubusercontent.com/16316626/153615928-a9c2a4df-607f-4571-9c24-63affbe7994e.png)

![image](https://user-images.githubusercontent.com/16316626/153616138-6f1e1937-976b-4d52-bb50-6564741a6552.png)


![image](https://user-images.githubusercontent.com/16316626/153616247-ae767a2f-4f53-4482-8041-9eac2e8be24f.png)  
![image](https://user-images.githubusercontent.com/16316626/153616428-27159987-e453-4b77-80bf-bb3feb8ce377.png)

## Configure the frontend  
![image](https://user-images.githubusercontent.com/16316626/153616546-c0c6cf32-ff57-4d60-82b2-beedf1940728.png)
![image](https://user-images.githubusercontent.com/16316626/153617409-c6b07e43-6cce-48d8-a75c-869640e4c94e.png)
![image](https://user-images.githubusercontent.com/16316626/153617616-1a4aee42-0bb8-4c63-8b5d-a64c09583b18.png)



  
# Task 6. Stress test the HTTP load balancer
