# EMS
## expense management system as nodeJs backend developer technical test

### Clone Repo
```
git clone https://github.com/ythoumaOfficial/EMS.git
```
### Install Packages
```
npm install
```
### Configuration
Create .env file and set the needed values:
```
HOST=
PORT=
NODE_ENV=development

#DATABASE
DB_CONN_STRING=mongodb+srv://{username}:{password}@{server}/{dbname}?retryWrites=true&w=majority
DB_NAME=
EXPENSES_COLLECTION_NAME=
```
### run test
```
npm run jtest
```
### run server
```
npm run dev
```
### Swagger URL
```
http://localhost:{PORT}/doc/#/
```
### Development Assemption:
* HTTPS: out of scope.
* All fields are required.
* Logging: out of scope.
* For Testing Purposes only, ENV File included (Security: High Risk).
* Supposed to have two Databases, one for development and one for Testing. we consider the Current Db is for both.

<br>

### Expected delivery Date: March, 24th, EOD
### Timeline (11 hours):
Monday: from 4:30 PM till 7:30 PM
Tuseday: from 5:30 PM till 8:00 PM
wednesday: from 5:30 PM till 7:30 PM
wednesday: from 5:30 PM till 8:00 PM


