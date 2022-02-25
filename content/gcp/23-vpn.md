---
title: "Virtual Private Networks (VPN)"
metaTitle: "Virtual Private Networks (VPN)"
metaDescription: "Virtual Private Networks (VPN)"
---

> 이 실습은 subnet-a 와 subnet-b 가 외부 통신은 되지만
> 내부 internal ip가 통신이 되지 않습니다.


# Create the VPN gateways and tunnels

Reserve two static IP addresses
Reserve one static IP address for each VPN gateway.

In the Cloud Console, on the Navigation menu (Navigation menu), click VPC network > External IP addresses.

Click Reserve static address.


![img.png](img.png)

![img_1.png](img_1.png)


![img_2.png](img_2.png)

각 각 역방향 reverse VPN 을 예약 해 준 뒤 ,
External IP를 삭제 합니디다.

시간이 좀 걸립니다.
