# Golang Chat App

## Routes

- POST `/api/messages`

## Environment Variables

Backend:
        PUSHER_APP_ID=id
        PUSHER_KEY=key
        PUSHER_SECRET=secret
        PUSHER_CLUSTER=cluster
Frontend:
        REACT_APP_PUSHER_KEY=key
        REACT_APP_PUSHER_CLUSTER=cluster
        REACT_APP_API=api

## Config

Frontend:

        ```bash
        npm install
        ```

## Run

Backend:

        ```bash
        go run main.go
        ```

Frontend:

        ```bash
        npm start
        ```
