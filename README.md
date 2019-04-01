<p align="center">
    <h1 align="center">ArcTouch Code Challenge</h1>
</p>

This is a repository, used to delivery a `code challenge` proposed by ArcTouch. In this README, contains all instructions to run the project in a development environment.

# Architecture
To develop this MVP, I chose to separate the problem in two small projects, the front-end and back-end.

In the back-end, was used Yii Framework, a PHP framework that use the design pattern MVC. I chose this framework, to simplify the development to this problem, once it abstract some tasks for the user, as database connection for example.

In the front-end, I used ReactJS and I chose one of the guideline sugested in official website site. I chose to use the structure [gouping by the file type](https://reactjs.org/docs/faq-structure.html#grouping-by-file-type). In this stratege, Is separeted the files according the types, like `compoents`, `pages`, `API access` etc.

# Assumptions
The assumption that I did, was that I could request the _[The Movie Database API](https://developers.themoviedb.org/3)_ directly by the front-end, instead of creating a back-end to consume the `API` and then, my front-end request the data for this back-end.

# Instructions to run the application

## _REQUIREMENTS_
The minimum requirement by this project:
- PHP 5.4.0 or higher
- Node JS 10.15.3 or higher

## Build
To build the project, you need to do some steps.

1. clone the project

To clone the project, use the command above
```
git clone git@github.com:lgmafra/at_code_challenge.git
```

The next step is run first the back-end app. Before this, make sure you have [Composer](http://getcomposer.org/) intalled, or you may install it by following the instructions
at [getcomposer.org](http://getcomposer.org/doc/00-intro.md#installation-nix).

2. Back-end app

To run the back-end, first go to root directory and enter in `backend` directory
```
cd backend/
```

Now update the app vendor packges
```
php composer update
```

Run the installation triggers (creating cookie validation code)
```
php composer install
```

Now you need to run the migrations, to create the database and the tables. To this, run:
```
php yii migrate
```

After clone the project, There are two aways to build the project, using [Docker](https://www.docker.com/get-started) or run manually.

### Building with Docker

To build with `Docker`, make sure you have [Docker](https://www.docker.com/get-started) installed.

After installed `Docker`, go to root directory and run above command:

```
docker-compose up
```

This will install the project that can be access by URL:

```
localhost:3000
```

### Building manually

After this, you can run the application using the command
```
php yii serve
```

You can then access the application through the following URL:
```
http://127.0.0.1:8080

or

http://localhost:8080
```


3. Front-end app

Before run front-end, is necessary install [NodeJs](https://nodejs.org/en/)

Once, the back-end is running and NodeJs is installed, now we can run the front-end app. For this, move to root directory, and then go to `frontend` directory
```
cd frontend/
```

In front-end directory, run a command to install all project dependencys
```
npm install
```

After install, run a command to run the application
```
npm start
```

You can then access the application through the following URL:
```
http://localhost:3000
```

# Third-party libraries

In this project, some third-party libraries were used.
## back-end
1. [yii2-httpclient](https://github.com/yiisoft/yii2-httpclient)
- This is a third-party library provides a HTTP client used to access _[The Movie Database API](https://developers.themoviedb.org/3)_, to provide the data to front-end

## front-end
1. [axios](https://github.com/axios/axios)
- Provides a HTTP client used to access the back-end project, that give the data to show to user.

2. [bootstrap](https://github.com/twbs/bootstrap)
- Used to make the front-end style.

3. [font-awesome](https://github.com/FortAwesome/Font-Awesome)
- Toolkit used to design icons from application.

4. [jquery](https://github.com/jquery/jquery)
- Needed to run some bootstrap resources.

5. [popper.js](https://github.com/pemrouz/popper)
- Dependency from Javascript in bootstrap 4.

6. [react-toastify](https://github.com/fkhadra/react-toastify)
- A library used to show some notifications for the user, after some actions that need a response.