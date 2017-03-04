image = dusty-node

# ---
# ---
# ---

docker-clean:
	docker rmi -f $(image)

docker-build:
	docker build -t $(image) .

docker-sh:
	docker run -i -t $(image) /bin/bash -l

docker-run:
	docker run -p 1337:1337 -t $(image)

# ---

mongod-run:
	mkdir -p /data/mongodb && mongod --fork --dbpath /data/mongodb --logpath /var/log/mongod.log

node-run:
	forever /opt/dusty-project/bin/www

# ---

_dbr: docker-build docker-run

# ---

_mn: mongod-run node-run

# ---
