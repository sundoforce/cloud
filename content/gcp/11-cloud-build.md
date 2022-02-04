---
title: "Working with Cloud build"
---

# 1: Confirm that needed APIs are enabled
 APIs & Services. -> Enable Apis and Services 
 **Enable**  
* Cloud Build  
* Container Registry 

# 2. Building Containers with DockerFile and Cloud Build


## quickstart.sh 
```
#!/bin/sh
echo "Hello, world! The time is $(date)."
```
## Dockerfile
```
FROM alpine
COPY quickstart.sh /
CMD ["/quickstart.sh"]
```
## permission
```
chmod +x quickstart.sh
```
## build 
```

```
gcloud builds submit --tag gcr.io/${GOOGLE_CLOUD_PROJECT}/quickstart-image .

```
gcloud builds submit --tag gcr.io/${GOOGLE_CLOUD_PROJECT}/quickstart-image .
Creating temporary tarball archive of 8 file(s) totalling 3.2 KiB before compression.
Uploading tarball of [.] to [gs://qwiklabs-gcp-04-3647116fc108_cloudbuild/source/1643982885.414919-86f43abd931d41adb3f397b40f9523bf.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/qwiklabs-gcp-04-3647116fc108/locations/global/builds/e2fb6c01-35cc-4323-ae06-f0e6edf458bd].
Logs are available at [https://console.cloud.google.com/cloud-build/builds/e2fb6c01-35cc-4323-ae06-f0e6edf458bd?project=689277352974].
--------------------------------------------------------------------- REMOTE BUILD OUTPUT ----------------------------------------------------------------------
starting build d"

FETCHSOURCE
Fetching storage object: gs://qwiklabs-gcp-04-3647116fc108_cloudbuild/source/1643982885.414919-86f43abd931d41adb3f397b40f9523bf.tgz#1643982887234964
Copying gs://qwiklabs-gcp-04-3647116fc108_cloudbuild/source/1643982885.414919-86f43abd931d41adb3f397b40f9523bf.tgz#1643982887234964...
/ [1 files][  1.6 KiB/  1.6 KiB]
Operation completed over 1 objects/1.6 KiB.
BUILD
Already have image (with digest): gcr.io/cloud-builders/docker
Sending build context to Docker daemon  11.78kB
Step 1/3 : From alpine
latest: Pulling from library/alpine
Digest: sha256:21a3deaa0d32a8057914f36584b5288d2e5ecc984380bc0118285c70fa8c9300
Status: Downloaded newer image for alpine:latest
 c059bfaa849c
Step 2/3 : COPY quickstart.sh /
 8144e061f93c
Step 3/3 : CMD ["/quickstart.sh"]
 Running in a6843618321b
Removing intermediate container a6843618321b
 4950f529bff5
Successfully built 4950f529bff5
Successfully tagged gcr.io/xxxx/quickstart-image:latest
PUSH
Pushing gcr.io/xxx/quickstart-image
The push refers to repository [gcr.io/xxxx/quickstart-image]
45bbd77a8b41: Preparing
8d3ac3489996: Preparing
8d3ac3489996: Layer already exists
45bbd77a8b41: Pushed
latest: digest: sha256:6da564dea65ff009461020a1c882b8c3224c7ad758a3b38c5024c55dbc7c0d2d size: 735
DONE
--------------------------------------------------------------------------------------------------------------------------
ID: e
CREATE_TIME: 2022-02-04T13:54:47+00:00
DURATION: 15S
SOURCE: gs://qwiklabs-gcp-04-3647116fc108_cloudbuild/source/1643982885.414919-86f43abd931d41adb3f397b40f9523bf.tgz
IMAGES: gcr.io/xxxx/quickstart-image (+1 more)
STATUS: SUCCESS
```


Container Registry 
![image](https://user-images.githubusercontent.com/16316626/152543439-6a4b2b3c-5d51-4c51-a581-ef733f87a162.png)


# 3. Building Containers with a build configuration file and Cloud Build

git clone https://github.com/GoogleCloudPlatform/training-data-analyst
ln -s ~/training-data-analyst/courses/ak8s/v1.1 ~/ak8s
cd ~/ak8s/Cloud_Build/a
gcloud builds submit --config cloudbuild.yaml .

## history 
![image](https://user-images.githubusercontent.com/16316626/152543268-19ae43c9-06c9-4bf8-b00d-1e8b7dbf4f05.png)


# 4. Building and Testing Containers with a build configuration file and Cloud Build 
cloudbuild.yaml 
```
steps:
- name: 'gcr.io/cloud-builders/docker'
  args: [ 'build', '-t', 'gcr.io/$PROJECT_ID/quickstart-image', '.' ]
- name: 'gcr.io/$PROJECT_ID/quickstart-image'
  args: ['fail']
images:
- 'gcr.io/$PROJECT_ID/quickstart-image
```

gcloud builds submit --config cloudbuild.yaml .




