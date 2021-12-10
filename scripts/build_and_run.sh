echo "____Building image..."
sudo docker build . --tag nftext
echo "____Stopping old container..."
sudo docker stop nftext
echo "____Removing old container..."
sudo docker rm nftext
echo "____Starting service as a new container..."
sudo docker run -d --name nftext --publish 3000:3000 --restart always nftext
