FROM node:7.2-onbuild
ADD . /notesservice
WORKDIR /notesservice
RUN npm install
ENV NODE_ENV docker
CMD ./bin/www