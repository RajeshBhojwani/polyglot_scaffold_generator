# Install yeoman
npm install -g yo

# This will run default generator under app folder
yo scaffold-service
## Pass service name as parameter
yo scaffold-service --service-name=spring-microservice

# This is for running other generators in same code.
yo scaffold-service:nodejs 

#That will install your project dependencies and symlink a global module to your local file. 

npm link