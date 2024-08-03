# Anonymous Crime-Tip System PROJECT

## Features

- #### User
   - Can **anonymously** report the crime tip
   - Can view the **status** of submitted crime tip
   - Can make **conversation** with police authorities anonymously
   - Can submit **feedback** on other people's submitted crime tips
   - Can give the exact location of the crime location using **Google Map** functionality
   - Can post media if any regarding criminal activity
 
- #### Admin
    - Can **update the status of reported crime**
    - Can make conversation directly with the person who submitted the crime tip (user id is anonymous)
 


### Prerequisites to setup the project

Ensure you have installed the "metamask" in the browser and "ganache" in the system. 

"metamask" is used to make the transactions (it is a wallet for decentralized transactions)
"ganache" is a personal blockchain environment for distributed application development 
(here we're using ganache to develop and test our dApp)


### To start the project

start the frontend server using -> "npm start" inside the frontend folder 
start the backend server using -> "node index.js" inside the backend folder


### To update the smart contract

after updating the smart contract
compile the smart contract suing -> "truffle compile" command
open the truffle dashboard in a separate cmd prompt using -> "truffle dashboard" command
deploy the contract using command -> "truffle migrate --network dashboard"

after deploy 

copy the contract address given in deployed command prompt and replace it with the previous contract address
replace the CrimeReport.json file of frontend with the CrimeReport.json file of dnetwork/build/contract and you are good to go





### Project IMP Commands

npm install truffle -g
truffle dashboard
truffle migrate --network dashboard
truffle compile (to compile the smart contract)





