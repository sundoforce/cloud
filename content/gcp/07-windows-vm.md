---
title: "Windows VM에 연결"
---

https://cloud.google.com/compute/docs/instances/connecting-to-windows


Chrome RDP for Google Cloud Platfrom 
https://chrome.google.com/webstore/detail/chrome-rdp-for-google-clo/mpbbnannobiobpnfblimoapbephgifkm?hl=en-US


## CMD (glcoud shell)

gcloud compute instances get-serial-port-output instance-1 

If prIf prompted, type n and press Enter.


```
Welcome to Cloud Shell! Type "help" to get started.
Your Cloud Platform project in this session is set to qwiklabs-gcp-04-284e3f71b6d8.
Use “gcloud config set project [PROJECT_ID]” to change to a different project.
student_00_35fc132b8cdc@cloudshell:~ (qwiklabs-gcp-04-284e3f71b6d8)$ gcloud auth list
Credentialed Accounts

ACTIVE: *
ACCOUNT:  
To set the active account, run:
    $ gcloud config set account `ACCOUNT`

2022/02/04 01:46:41 GCEGuestAgent: Adding route to metadata server on "Ethernet" (index: 12)
2022/02/04 01:47:30 GCEInstanceSetup: Enable google_osconfig_agent during the specialize configuration pass.
2022/02/04 01:47:30 GCEInstanceSetup: Starting sysprep specialize phase.
2022/02/04 01:47:31 GCEInstanceSetup: All networks set to DHCP.2022/02/04 01:47:32 GCEInstanceSetup: Running 'netsh' with arguments 'interface ipv4 set interface Ethernet mtu=1460'
2022/02/04 01:47:33 GCEInstanceSetup: --> Ok.
2022/02/04 01:47:33 GCEInstanceSetup: MTU set to 1460.
2022/02/04 01:47:33 GCEInstanceSetup: Running 'route' with arguments '/p add 169.254.169.254 mask 255.255.255.255 0.0.0.0 if 12 metric 1'
2022/02/04 01:47:33 GCEInstanceSetup: --> OK!
2022/02/04 01:47:33 GCEInstanceSetup: Added persistent route to metadata netblock via first netkvm adapter.
2022/02/04 01:47:34 GCEInstanceSetup: Getting hostname from metadata server.
2022/02/04 01:47:34 GCEInstanceSetup: Renamed from WIN-VFU4FRASCJK to instance-1.

Specify --start=2853 in the next get-serial-port-output invocation to get only the new output starting from here.
```


gcloud compute reset-windows-password [instance] --zone us-central1-a --user [username]

```
gcloud compute reset-windows-password instance-1  --zone us-central1-a --user 1234

This command creates an account and sets an initial password for the
user [1234] if the account does not already exist.
If the account already exists, resetting the password can cause the
LOSS OF ENCRYPTED DATA secured with the current password, including
files and stored passwords.

For more information, see:
https://cloud.google.com/compute/docs/operating-systems/windows#reset

Would you like to set or reset the password for [1234] (Y/n)?  Y

Resetting and retrieving password for [1234] on [instance-1]
Updated [https://www.googleapis.com/compute/v1/projects/xxx/zones/us-central1-a/instances/instance-1].
ip_address: xxx
password:   V(>KcX?&goW2#,+
username:   1234
```
![capture 2022-02-04 AM 10 51 24](https://user-images.githubusercontent.com/16316626/152459346-7b7c2ab3-fbef-4f9e-9400-b0652ba90dff.png)




