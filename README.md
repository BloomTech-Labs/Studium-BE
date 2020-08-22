# Studium App Backend

Deployed at: https://studium-be.herokuapp.com/

## Badges

![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)
![node](https://img.shields.io/node/v/11)
![Coverage Test](https://github.com/Lambda-School-Labs/Studium-BE/workflows/Coverage%20Test/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/84916601dc72e75bc4d2/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/Studium-BE/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/84916601dc72e75bc4d2/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/Studium-BE/test_coverage)

---

## POST to Register User
### api/auth/register

```
{
    "username": "string",       required unique
    "first_name": "string",     required
    "last_name": "string",      required
    "email": "string",          required unique
    "password": "string"        required
}
```

## POST Login
### api/auth/login
```
{
    "username": "user's username",       required
    "password": "user's password"        required
}
```

## GET all decks
### api/decks

Returns array of all decks.

## GET deck by ID
### api/decks/:id

Returns the specific deck object with the ID.

## POST new deck
### api/decks

```
{
    "user_id": uuid,         required
    "deck_name": "string",      required
    "category": "string",
    "description": "string",
    "public": boolean,          false
    "deck_img": "string"
}
```

## GET cards by deck ID
### api/decks/:id/cards
Gets all cards within a certain deck.

## PUT update existing deck by ID
### api/decks/:id

```
{
    "user_id": uuid,         edit any of these fields
    "deck_name": "string",      
    "category": "string",
    "description": "string",
    "public": boolean,          
    "deck_img": "string"
}
```

## DELETE an existing deck by ID
### api/decks/:id

Returns a successful response.

## GET all cards
### api/cards

Returns array of all cards, no matter the deck.

## GET specific card
### api/cards/:id

Returns a specific card, no matter the deck, based on the ID.

## POST new card
### api/cards

```
{
    "deck_id": uuid,         required
    "card_front": "string",     required
    "card_back": "string",      required
    "notes": "string",
	"created_at": bigint,
	"updated_at": bigint,
	"comfort_level": integer, 			0, required
	"is_starred": boolean,			false
	"next_due": bigint,
	"card_img": "string"
}
```

## PUT update existing card by ID
### api/cards/:id

```
{
    "deck_id": uuid,         edit any of these fields
    "card_front": "string",     
    "card_back": "string",      
    "notes": "string",
	"created_at": bigint,
	"updated_at": bigint,
	"comfort_level": integer, 
	"is_starred": boolean,
	"next_due": bigint,
	"card_img": "string"
}
```

## DELETE an existing card by ID
### api/cards/:id

Returns a successful response.

## GET all sessions
### api/sessions

Returns an array of sessions.

## GET existing session by ID
### api/sessions/:id

Returns a specific session by ID.

## POST new session
### api/sessions

```
{
	"deck_id": uuid,			required
	"user_id": uuid,			required
	"total_looked_at": integer,			0, required
	"session_start": bigint,				required
	"session_end": bigint
}
```

## PUT an existing session
### api/session/:id

```
{
	"id": uuid			edit any of these fields
	"deck_id": uuid,
	"user_id": uuid,
	"total_looked_at": integer,
	"session_start": bigint,
	"session_end": bigint
}
```

## DELETE an existing session
### api/session/:id

Returns a successful response.