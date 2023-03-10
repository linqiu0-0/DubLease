# UserManual

## Application Description
DubLease is a web application that lets you find or post a sublease near the University of Washington. Currently, most related sublease information is published on social media like Facebook and Reddit, but those information is scattered around and hard to use. DubLease is such an application that aims to provide a more accessible platform for sublease.
Have you ever tried to find a suitable short-term lease that satisfied your needs during the summer quarter? Have you ever had to move out and are concerned about the remaining leasing term? Try our application, DubLease, which helps you solve all these problems related to subleasing.
## How To Visit DubLease
First, visit our backend service link in Chrome browser to accept our certificate. 
You will encounter a risk warning like this about this connection because we use a self-sign certificate in backend. 
<img width="692" alt="Screen Shot 2023-03-09 at 10 08 31 PM" src="https://user-images.githubusercontent.com/73025661/224237032-7c96e781-a461-4fce-8236-fe1487d7ae0b.png">

1. Click on the `advance` button
2. Click on `Proceed to 54.188.22.87 (unsafe)`
3. See hello world on the page 

Then, you can visit our deployed version at [Dublease](https://linqiu0-0.github.io/DubLease/).

## How To Install DubLease Locally
If the depolyed link not works, there are two ways to install Dublease and get the application running.

### Prerequisites
Clone the repository or download the source code
Download [NodeJS and NPM](https://nodejs.org/en/download/)

### Installing With Docker
Download Docker from https://www.docker.com/
Open a terminal on your local computer, navigate to the root directory of the project and run
```
docker compose build
docker compose up
```
Please allow a few minutes for the docker container to build. You will see server logs once the application is successfully launched.

### Installing Mannually With NPM
Open a terminal on your local computer, navigate to the `/client` directory with the command `cd client`.
Run `npm install && npm start`

Open a new terminal, navigate to the `/server` directory via `cd server`.
Run `npm install && npm start`


## How To Use DubLease 
As a sub-lease website, you can be either a sub-leaser or a renter. To visit this website, you have to first create an account to sign in. 

### As a sub-leaser (work in progress)
You can log in to the website, which will direct you to the home page. On the home page, there is a bar on the top of the page. You can click the `Add Lease` button to navigate to the lease posting page. 

```
(Work in Progress)
On the post-listing page, you can 
- Upload a picture of your apartment 
- Add the address for your apartment
- Add other tags and descriptions

Then you can submit it!
Once it is submitted, this apartment will be posted on the homepage,
and others could search for it.
```


### As a renter
You can log in to the website, which will direct you to the home page. The posted sublease information will be listed on the right, with the addresses marked on the map on the left. Hovering on these marks will display the basic information of the sublease, and the map also allows users to drag around, zoom in/out, or check out the street view.
There is also a search bar on top of the page that allows users to narrow down the options by applying various filters. Clicking the 'Apply filters' or hitting enter from the search bar will apply the filters and display the filtered results.
```
(Work in Progress)
Renters could click on each individual sublease tabs to view the details, including:
- Detailed information (price, address, size, etc.) of the property
- Pictures uploaded by the subleaser
- Contact information of the subleaser
```


## Something Not Working?
Feel free to report a bug by creating a new issue in [our Github issues](https://github.com/linqiu0-0/DubLease/issues) with the bug report template we provided.
Please provide a detailed description of the bug and how to reproduce it. Please include what browser you used, your docker, npm, and node versions, and your operating system.
You are also encouraged to include photos and screenshots to further illustrate the problem. 


## Known Issues
1. For multiple subleases that share the exact same address, there will be only one marker corresponding to one sublease displayed on the map in the hompage.

Note: For detailed issues description, please check the [Github Issues](https://github.com/linqiu0-0/DubLease/issues) tab.

