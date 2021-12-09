### url-shortener
A Node.JS powered URL shortener

## External Application Requirements

- `Redis`, Mac Download Instructions: https://phoenixnap.com/kb/install-redis-on-mac
- `MongoDB`, Mac Download Instructions: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

## Application Setup
- Install Packages: `npm i`
- Setup .env folder: There is an example one provided in the repo, you can edit these defaults.

## API Documentation and usage

### `/api/create-short-link` type: `POST`

#### Example Request Body
- `redirect_link`: String: A valid webUrl
- `id_length`: Integer: The length of the hash ID for the short_link. Must be atleast 3.
```JSON
{
    "redirect_link" : "google.com",
    "id_length" : 5
}
```
#### Example Response Body
- `redirect_link`: String: A webUrl
- `short_link`: String: The short link that redirects to the redirect_link
- `clicks`: Integer: The amount of times the short_link has been clicked
- `_id`: String: MongoDB ID
- `__v`: String: MongoDB Version
```JSON
{
    "redirect_link": "http://google.com",
    "short_link": "http://localhost:3000/yFDOK",
    "clicks": 0,
    "_id": "61b14c8db5f6a51e1c496aa1",
    "__v": 0
}
```

### `/api/retrieve-short-link` type: `POST`

#### Example Request Body
- `short_link`: String: A valid short_link registered in the DB
```JSON
{
    "short_link" : "http://localhost:3000/yFDOK"
}
```
#### Example Response Body
- `redirect_link`: String: A webUrl
- `short_link`: String: The short link that redirects to the redirect_link
- `clicks`: Integer: The amount of times the short_link has been clicked
- `_id`: String: MongoDB ID
- `__v`: String: MongoDB Version
```JSON
{
    "redirect_link": "http://google.com",
    "short_link": "http://localhost:3000/yFDOK",
    "clicks": 0,
    "_id": "61b14c8db5f6a51e1c496aa1",
    "__v": 0
}
```

### `/:hash` type: `GET`
- Redirects a user from a short link to the redirect link registered.

#### Example
- https://short.link/my_hash --> https://www.google.com


