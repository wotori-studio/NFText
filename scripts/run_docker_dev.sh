sudo docker stop nftext;
sudo docker rm nftext;
sudo docker run -d --name nftext --publish 3000:3000 \
-v $(pwd):/app/ \
--restart always \
nftext