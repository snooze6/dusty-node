FROM ubuntu:14.04

# ---

RUN apt-get update

# ---

RUN apt-get install -y -q build-essential
RUN apt-get install -y -q mongodb
RUN apt-get install -y -q nodejs
RUN apt-get install -y -q npm
RUN apt-get install -y -q git
RUN npm install -g bower
RUN npm install -g forever
RUN ln -s /usr/bin/nodejs /usr/bin/node

# ---

ADD dusty-project /opt/dusty-project
ADD Makefile /opt/dusty-project/

#RUN mkdir /opt/dusty-project
#ADD dusty-project/bin /opt/dusty-project/bin
#ADD dusty-project/public /opt/dusty-project/public
#ADD dusty-project/routes /opt/dusty-project/routes
#ADD dusty-project/views /opt/dusty-project/views
#ADD dusty-project/app.js /opt/dusty-project/
#ADD dusty-project/config.js /opt/dusty-project/
#ADD dusty-project/package.json /opt/dusty-project/

# ---

RUN cd /opt/dusty-project && npm install
RUN cd /opt/dusty-project/public && bower install --allow-root

# ---

EXPOSE 1337
ENTRYPOINT /bin/sh -c 'make -f /opt/dusty-project/Makefile _mn' 
