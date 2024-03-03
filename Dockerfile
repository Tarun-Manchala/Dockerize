FROM node:15
WORKDIR /app 
# technically no need to mention it, but it can be usefull.
COPY package.json . 
# since we are using relative directory '.' is enough or we can use '/app' 
# RUN npm install

RUN if [ "$NODE_ENV"="development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi


# buiding image
COPY . ./
# by splitting copy , ACtually docker execute in layeres form and it caches each layer data
ENV PORT 3000

EXPOSE $PORT
# documentation purpose
CMD ["npm", "run" ,"dev"]
# when we deploy image first starts by running index.js file 