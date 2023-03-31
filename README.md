# DubLease

[User Manual](./UserManual.md)

[Developer Guidelines](./DeveloperGuide.md)

Visit our tool on https://dublease.com

## Project Description
Most UW students decide to live near the school like the dorm, off-campus apartments and houses so that they can get on campus more conveniently. And depending on different leasing terms and personal needs, there are high demands of sublease throughout the year especially the summer. Currently, most of the related sublease information are posted on different social media like facebook and reddit, but they are not well organized and hard to use for UW students. Therefore, we propose the project of sublease web application, Dub Lease, that specifically targets UW students. With the Dub Lease, UW students can easily post and find the sublease that satisfies their needs.

**Team Members:**
| Name | Role | 
| --- | ----------- | 
| Ryan Li | Backend | 
| Lin Qiu | UI/UX Developer, Frontend Developer | 
| Tony Song | PM, Frontend Developer |
| Carlos Yu | Testing + Backend Developer | 
| Crystal Li | UI + Backend Developer| 

## Features
1. User Info Management (Major)
  - Account login/signup 
  - Edit personal information
  
2. Browsing subleasing (Major)
  - Filtering based on money / room type / apartment name
  - Searching available subleases based on apartment names
  - Viewing and selecting available subleases through an interactive map
  
3. Post/edit a sublease request (Major)
  - Allow subleasers to add photos / title / price / category / condition / description / sublease time / roommate /...
  
4. Posting history (Major)
5. Private messaging (Extend)
6. Apartment category (Extend)

## Prototype Use Case
**General Use Case:**
- Actors: Users looking for a sublease (renter) 
- Triggers: User loads the app’s web page
- Preconditions: User opens our website and wants to find a proper sublease
- Postconditions (success scenario): User successfully finds the sublease
- List of steps (success scenario):
  1. User register with email and password
  2. Enter the map view home page
  3. Interact with the map to locate apartments
  4. Search and filter proper sublease

**Operational Use Cases:**
- Use Case 1: Sign up/Login
  - Actors: Users looking for a sublease (renter) and users who posted a sublease (subleaser)
  - Triggers: User loads the app’s web page
  - Preconditions: User opens a browser & has available network connections
  - Postconditions (success scenario): User successfully signs up or logs in.
  - List of steps (success scenario):
  - Log in:
    1. The website automatically redirects to the log-in page
    2. User enters email & password
    3. User clicks the “login” button
    4. System confirms login information by checking if the email exists and if the entered password matches the password under the email
    5. System logs in and presents the home page
  - Sign up:
    1. The website automatically redirects to the log-in page
    2. User clicks the “sign up” text
    3. User enters email and password
    4. User clicks the “signup” button
    5. System checks if the email address is valid and if it's currently unoccupied
    6. System saves the email & password to its database
    7. System logs in and presents the home page
- Use Case 2: View and select apartments on map
  - Actors: Renters wish to interact with the map on our website to find available subleases
  - Triggers: Renter logs into system
  - Preconditions: The renter is at the login screen
  - Postconditions: Renters on the sublease details page about the selected apartment
  - List of steps:
    1. Renter enters account and password
    2. System verifies and logs the user in
    3. System presents a selectable map on the screen for view
    4. Renter click an apartment on map
    5. System present apartment sublease details page
    6. Extensions/variations of success scenario:
    7. User opened sublease details page by searching apartments by name & filters (See Use case 3)
- Use Case 3: Search apartments by name & filters
  - Actors: Renters who visit our website to find available subleases
  - Triggers: The renter search for apartment in the search bar by text or filter apartment by various kinds of conditions
  - Preconditions: User logged and is at the homepage
  - Postconditions: Search result is returned in the sub-lease details on page 
  - List of steps:
    1. System presents search bar and filter conditions with search screen in the sublease details page
    2. Renter enters the apartment name or selects filter conditions
    3. System finds matches and returns available sublease matches in the sublease details page
  - Extensions/variations of the success scenario:
    1. Renters search subleases via map (See Use case 2)
  - Exceptions: failure conditions and scenarios
    1. System cannot find an available sublease based on the searching condition, which will return “No available sublease” (Step c)


## Documentation

The more detailed development guide can be found in here [Developer Guidelines](./DeveloperGuide.md).
For technical documentation, please refer to our Google documents regarding [Backend APIs](https://docs.google.com/document/d/1Q48TTSTBrOSXKS06upeNwzYLw0O1lRpGk2PCigNLAS8/edit?usp=sharing) .


## Repository Layout
* `server/`: contains all server-side backend code in NodeJS
  - set up the server via `npm start`
* `client/`: contains all client-side frontend code written in ReactJS
* `reports/`: contains all reports and writeups related to this project
*  `.github/workflows`: contains all configs for the automated deployment and testings


