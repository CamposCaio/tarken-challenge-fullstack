# Moovy: Tarken Challenge Fullstack

(05/05/2022) Livre preview: [https://moovy-8f2tq.ondigitalocean.app/library](https://moovy-8f2tq.ondigitalocean.app/library)

<img src="https://i.ibb.co/4g5tX19/Screenshot-from-2022-05-05-17-25-25.png" alt="Screenshot" />

# 1. Description

This project was developed in 1 week as a response to the challenge proposed by _Tarken_.
It consists of a movie platform where the user can search and add movies to your library. Then, using the application (developed in react-native and also part of the challenge), the user can record an audio review for each book in your library.

# 2. Dependencies

You can use **docker** with **docker compose** to run the entire project. But, if you prefer to run directly on your local machine, make sure you have:

- Yarn (I’m using v1.22.18)
- Node.js (I’m using v16.15.0)

# 3. Running with Docker

Run the docker compose file _(/tarken-challenge-fullstack/docker-compose.yaml)_, it will up the _front-end, back-end_ and _postgres database:_

```docker
$ docker compose up -d --build
```

You can already access the application on your port 3333: [http://localhost:3333](http://localhost:3333).

# 4. Running with Yarn

1. In the root folder, **install the dependencies** using the command:

```docker
$ yarn
```

2. You will need a **postgres database** to connect to the back-end. You can use the _docker compose_ for it (or up another _postgres database,_ seed it with _init.sql_ and configure the connection on _/tarken-challenge-fullstack/packages/back/src/common/envs/development.env_).

   To run only the _postgres database_ from _docker compose_ execute:

```docker
$ docker compose up -d --build postgres
```

3. **Start the back-end** using the following command:

```docker
$ yarn back
or in --watch mode:
$ yarn back:dev
```

<aside style="padding: 2rem;">
❗ Error: Cannot find module 'typeorm’

You might get this error. Basically, _Nest.js_ is looking for the module in the root _/node_modules_, but it was only installed in _/packages/back/node_modules_.

I still haven't figured out a better way to solve this, but you can do the following: copy the _/tarken-challenge-fullstack/packages/back/node_modules/typeorm_ folder and paste it in _/tarken-challenge-fullstack/node_modules_.

Now you can start the back-end application.

Note: this doesn't happen if you build the back-end as an isolated repository.

</aside>

4. **Start the front-end** using the following command (in another terminal):

```docker
$ yarn front
```
