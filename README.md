# A simple Twitter Clone built with Django Rest Framework, React, and Tailwind CSS.

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

---

## React Components

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

### Testing Registration & Authentication.

To ensure the best user experience, I had to carry out tests on user registration and authentication. 

### Registration (SignUpForm.js)

The **first manual test** I carried out on the signup form was submitting the form with all fields empty. 

![Screenshot 2023-12-04 at 01.37.17.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/b47453e4-0839-4054-ae10-4c20943e9f08/b487273d-8816-43c7-ba31-57d97a81235b/Screenshot_2023-12-04_at_01.37.17.png)

as seen above, this will not register an account. This test shows that all fields are required to be filled or they will return an error. 

---

The **************second************** manual test I carried was entering a single letter for the name and a short yet matching password. 

Here are the errors: 

![Screenshot 2023-12-04 at 01.59.11.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/b47453e4-0839-4054-ae10-4c20943e9f08/0d33f998-8c92-4e63-bba4-7ce4b3d97e38/Screenshot_2023-12-04_at_01.59.11.png)

This test shows: 

- The password must be at least 8 characters in length.
- Must not be **********too common**********
- Can not contain only numerical values.

---

### Authentication (SignInForm.js)

The ********************first******************** manual test I carried out on the sign-in form was entering credentials that did not count. 

Here is the result: 

![Screenshot 2023-12-04 at 02.09.15.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/b47453e4-0839-4054-ae10-4c20943e9f08/8d1204c8-3ce6-4b87-a49a-7ac6e852cabd/Screenshot_2023-12-04_at_02.09.15.png)

This test result at least showed that entering in random user credentials will not log you into an account. 

---

The **second manual test** that I carried out on the form, was submission without any credentials. Here are the results. 

![Screenshot 2023-12-04 at 02.14.10.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/b47453e4-0839-4054-ae10-4c20943e9f08/47949808-d203-4f76-b50d-5eb600ea8d79/Screenshot_2023-12-04_at_02.14.10.png)

---

      This test showed that the form will not sign you in without submitting some credentials.  

## Deployment (Heroku)

This application is hosted on Heroku.

The Heroku app was connected to my GitHub repository, (found [here](https://github.com/GavPri/twitter_front_end/tree/main)). 

### In the settings tab…

![Screenshot 2023-12-04 at 01.27.48.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/b47453e4-0839-4054-ae10-4c20943e9f08/4c2bffab-e0bc-4052-a6a4-7c0d1b77dd07/Screenshot_2023-12-04_at_01.27.48.png)

- Add any necessary configuration variables that are required for the project to function.

![Screenshot 2023-12-04 at 01.29.13.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/b47453e4-0839-4054-ae10-4c20943e9f08/b14f0deb-0ee9-43cf-843c-19ba7e515816/Screenshot_2023-12-04_at_01.29.13.png)

### In the deployment tab…

- Connect your GitHub repository.

![Screenshot 2023-12-04 at 01.22.55.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/b47453e4-0839-4054-ae10-4c20943e9f08/23040873-10f7-4663-bd1b-7eac9ae601e3/Screenshot_2023-12-04_at_01.22.55.png)

- Scroll down the page to the deployment section and click ‘deploy branch’

![Screenshot 2023-12-04 at 01.26.00.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/b47453e4-0839-4054-ae10-4c20943e9f08/01f26699-df28-43a5-aa5f-36698a13ef34/Screenshot_2023-12-04_at_01.26.00.png)