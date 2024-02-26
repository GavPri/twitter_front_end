# Twitter Clone

A simple Twitter Clone built with Django Rest Framework, React, and Tailwind CSS, hosted on Heroku.

## Features

- User registration and authentication.
- Full CRUD functionality.
    - Create posts
    - Read posts
    - Update posts
    - Delete posts
- Responsive design for use across all devices.
- The ability to follow/unfollow users.
- The ability to view posts by accounts you follow
- The ability to like/unlike posts.
- The ability to view all liked posts.

### Features to add.

- Edit profile.
    - currently, users are unable to edit their current profile pictures or bio (content)

---

## User Stories.

| as a | I want to | so that I can | components |
| --- | --- | --- | --- |
| user | sign up for an account | start sharing my thoughts and follow others | SignUpForm.js, PopularAccounts.js, AccountPage.js. |
| user | navigate through all pages quickly | I can browse seamlessly without page refresh | NavBar.js, DropDownMenu.js. |
| user |  post a comment under a tweet   | I can share my opinion under tweets | Replies.js, ReplyForm.js |
| user | follow and unfollow users | and remove tweets from my feed. | Utils.js, PopularAccounts.js, AccountPage.js. |
| user | edit and delete my replies | if I want to edit or remove replies, I can | EditDeleteDropDown.js, ReplyEditForm.js |
|  registered user  | log in and out | I can access my account securely | NavBar.js, SignInForm.js |
| user  | edit my tweet | I can correct any errors and change the content | EditTweetForm.js, TweetPage.js |
| user   | View other users’ profiles | I can learn more about them | AccountPage.js |
| user  | maintain my logged-in status until I choose to log out  | my user experience is not compromised | Navbar.js |
| user   |  post tweets & images |  I can share content with everyone on the platform | TweetCreateFrom.js, Tweet.js, FeedPage.js |
| user  |  I can like and unlike posts | I can view all my favorite posts | Tweet.js, FeedPage.js |
| user  | I can view the most recent posts | I can be up to date-on posts | FeedPage.js |
| user   | I can scroll indefinitely as posts are loaded | so that I do not have to click on 'next page' | FeedPage.js,  |
| user  I can learn more about it | I can view individual posts | I can learn more about it | TweetPage.js |
|  user  |  I can view a list of the most popular profiles | I can check out the popular profiles | FeedPage.js |
| User | I can search for keywords | I can find posts that I'm interested in | FeedPage.js |

---

## Front End Libraries.

### Tailwind CSS.

Tailwind CSS allowed me to code the front end quickly and efficiently. Making the design responsive was easy with Tailwind's responsive utility classes. 

Tailwind allows for faster design of the front end, essentially nullifying the need for creating vanilla CSS files. 

- The documentation for Tailwind CSS can be found [here](https://tailwindcss.com/)

### React Icons

The React Icons library was used during the development of this project. 

React Icons offers a wide range of free icons that can be styled and manipulated in the front end. 

- The documentation for React Icons can be found [here](https://react-icons.github.io/react-icons/)

### React Router

This Twitter clone leverages React Router to handle navigation and routing within our application. React Router enables the creation of a single-page application experience, offering a smooth user journey without the need for full-page reloads.

- The documentation for react-router can be found [here](https://reactrouter.com/en/main)

### React Infinite Scroll Component

The use of infinite scroll in this project was to allow users to view content without pagination. This makes the app more modern & engaging. 

- The documentation for react-infinite-scroll-component can be found [here.](https://www.npmjs.com/package/react-infinite-scroll-component)

### React Bootstrap.

React Bootstrap was used in some sections of this project. Particularly relating to forms. 

- The documentation for React Bootstrap can be found [here](https://react-bootstrap.netlify.app/)

---

## Reusable React Components

### NavBar.js

The navigation bar is a key component of any good website. The navigation bar appears on every page of the website. Users can navigate easily from page to page.

This component is stateful which allows the contents of the navigation bar to be manipulated based on whether the user is currently logged in or if they have logged out. 

The navigation bar is responsive. When the screen reaches the Tailwind’s medium (md) breakpoint, the links are displayed horizontally across the header. 

When it is below the medium breakpoint, they are displayed in a ‘drop-down’ menu that slides in from the right of the screen. 

### DropDownMenu.js

Instead of having a conditional render method within the NavBar.js file, I decided to take the hardcode of the dropdown out of the NavBar.js file. This made both elements easier to style while increasing the readability of the code.

The dropdown menu allows users to navigate through each page of the website while on smaller devices. 

### Avatar.js

The avatar component allows me to render the user profile picture in the link to said user's profile. It allows for customisation by accepting source, height, and optional text.

This is an ideal component for this app but could be taken and used in any application that needs to display user profile pictures.

---

## Manual Testing (Front-End)

---

Manual testing showed that users can:

# Create an account.
The tests ran for registering an account showed:
    - A user with a unique username and password could create an account as long as it meets the password criteria. 

    - The username must be unique. If a user tries to create an account using the name 'Tom', and creates a password that matches the criteria, they will recieve a notfication saying 'A user with that username already exists.'

    - The passwords must match.

- Login/logout
- had a sustained login period
- follow/unfollow users
- like/unlike tweets
- create tweets
- edit/delete tweets
- reply to tweets
- edit/delete reply
- filter liked posts
- search for keywords/users

## Deployment (Heroku)

This application is hosted on Heroku.

The Heroku app was connected to my GitHub repository, (found [here](https://github.com/GavPri/twitter_front_end/tree/main)). 

### In the settings tab…

- Add any necessary configuration variables that are required for the project to function.


### In the deployment tab…

- Connect your GitHub repository.

- Scroll down the page to the deployment section and click ‘deploy branch’
---

### Credits.

The code in this project was created by closely following the course content of Code Institute. In particular, the moments repository, which can be found [here](https://github.com/mr-fibonacci/moments)