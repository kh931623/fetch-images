Fetch Images
===

## How to run

### Prerequisite
- node.js >= 18
- docker
- docker-compose 3

### Steps
Install deps
```
npm i
```

Start up docker services
```
docker-compose up -d 
```

Generate `.env`
```
cp .env.example .env
```

Note: You have to provide those API_KEY and `JWT_SECRET` in the `.env` file.

Also, you can set `DISABLE_AUTH` to arbitrary value to disable authentication, so you dont have to provide auth token anymore.


Start the app
```
npm run start
```

## Usage

### Graphql
Once the app is started, can goto `http://localhost:3000/graphql-ide`

There is a web-GUI for testing graphql query.

#### Example query

Feel free to replace `"cat"` to any keyword
```
{
  images(key: "cat") {
    image_ID
    thumbnails
    preview
    title
    source
    tags
  }
}
```

### HTTP APIs

For playing with HTTP APIs, here are some good tools:
- `curl` 
- `postman` (recommended)


## API Endpoints
host: `http://localhost:3000`

### POST `/users`
This API is for signing up.

Body
- username `string` `required`
- password `string` `required`


### POST `/users/login`
This API is for logging in.

Body
- username `string` `required`
- password `string` `required`

Returns
- access_token `string`
  - a token for accessing `/images` API, expires in 10 mins


### GET `/images`
This is the main API which is providing images from various 3rd party image lib.

Headers
- Authorization `string` `required`
  - plz send token in this format `Authorization: Bearer YOUR_TOKEN_HERE`
  - you can however, disable the auth by setting `DISABLE_AUTH` in `.env`, so you dont have to provide access token to use this API.

Query String
- key `string` `required`
  - a term for searching related images. e.g. `cat`

Returns
- images `object[]`
  - object props
    - image_ID `string`
    - thumbnails `string` - thumbnail URL
    - preview `string` - Image URL
    - title `string`
    - source `string` - which lib is this image from
    - tags `string[]` - associated tags 