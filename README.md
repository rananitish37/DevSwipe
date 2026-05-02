# DevSwipe
DevSwipe is a Tinder-inspired platform for developers to discover, connect, and collaborate on projects. Users can create profiles showcasing their tech stack, experience, and interests, and swipe to find like-minded developers for collaboration, networking, or learning.


**Waterfall Model**
**(SOLC)**

Requirements → PM + Designers
	→ Design → Senior Engineer /EM
		Development → SDE1 SDE2
			 Testing → SDET
				→ Deployment → Dev
					→ Maintenance


So very simple strategy we already know how production works from taking a project to delivering them to the client

1. Requirement gathering : in this the main hero is project manager or EM who gathers all the requirements for the required development also they decide the tech stack we should use in this particular project.
2. Design: There are some senior engineer who decides the actual designing of the project with the help of EM.
3. Development : Then comes the main development part where actual development happened and done by the developer of the team in some of the company(better say start-ups) of may be 10 people these fields becomes different for them as developer only does the various task of designing developing and testing of the project.
4. Testing: Now comes the testing part where we check the development whether the requirement given by the client is working properly or not which is developed by the developer.
5. Deployment: Then comes the deployment part where devOps comes into picture who is responsible for deploying the project. In startups that is also done by developer sometimes.
6. Maintenance: Then comes maintenance part where if any kind of requirement. comes or any change request is there then the whole cycle will be repeated.




# Requirement Gathering:
1. Craete an account
2. Login
3. Update your profile
4. Feed/ page explorer
5. Send connection request
6. See our match
7. See the request we have send/ review
8. etc will be aded later



# Tech Planning: (HLD - High level designing)
2 Microservices
1. Frontend -> Using react
2. Backend -> Using Nodejs/MongoDb



# Before writing code there comes a LLD (Low level design)
1. # DB Design:
	For user we need a User collection(if sql then user table)
	- 1. fisrtname, lastname, emailid, password, age, gender etc..

	Another for keeping track of how we will store when someone share request to any developers/ view their profile so we need to store that also
	Inshot we need another collection for relationship 

	ConnectionRequest: (fromUserId, toUserId, Status)


	There can be multiple status if a user sends request to other then 
		it will be first 
			1. Pending 
			then there will be two possiblities
				either 2. accept or 3. reject 
			if someone ignore the person comes in feed that status can be 
			4. ignored may be
			etc.

2. # API Design:
	POST - /signup
	POST - /login
	POST - /profile  (to create)
	GET  - /profile
	PATCH - /profile (to update the profile)
	POST - /sendRequest (ignore/intrested)
	POST - /reviewRequest (accept/reject)
	GET - /requests (to see all the request that i have got)
	GET - /connection ( to get all the connections )


# Routes:
``const express = require("express")

const app = express()


//send this response even if url is different
/*app.use((req,res) =>{
    res.send("Response from server")
})*/


app.use("/home",(req,res)=>{
    res.send("This is home page")
});
app.use("/contact",(req,res)=>{
    res.send("This is contact page")
});
app.use("/",(req,res)=>{
    res.send("This is main page")
});
app.listen(7777,()=>{
    console.log("Server running on port no: 7777")
})``

Here in routing order matters a lot as we can see if i put / route on top then every requests will got to that only as it matches the /
example /home so as soon as it finds / it will simply executes it and it will not go to others but when we change the order and now
if /home will come it routes it to /home 