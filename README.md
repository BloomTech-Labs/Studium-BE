# Studium App Backend

---

Deployed at: https://studium-be.herokuapp.com/

---

## Endpoint Summary Table

[ Table Here Once All Endpoints Are Completed ]

---

---

## Code Climate

[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/codeclimate/codeclimate/maintainability) 
[![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/codeclimate/codeclimate/test_coverage)

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

### returns...

```
{
    return here
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

### returns...

```
{
    return here
}
```

## GET all decks
### api/decks

Returns array of all decks.

```
[
    {
        return here
    }
]
```

## GET deck by ID
### api/decks/:id

Returns the specific deck object with the ID.
Will list cards within that deck.
Will list tags on that deck.

```
{
    return here
}
```

## POST new deck
### api/decks

```
{
    "user_id": integer,         required
    "deck_name": "string",      required
    "category": "string",
    "description": "string",
    "public": boolean,          false
    "deck_img": "string"
}
```

### returns ...

``` 
{
    return here
}
```

## PUT update existing deck by ID
### api/decks/:id

```
{
    "user_id": integer,         edit any of these fields
    "deck_name": "string",      
    "category": "string",
    "description": "string",
    "public": boolean,          
    "deck_img": "string"
}
```

### returns...

``` 
{
    return here
}
```

## DELETE an existing deck by ID
### api/decks/:id

Returns a successful response.
Deleting a deck will make the cards attached to that deck inaccessible to the user.

```
{
    return here
}
```

## GET all cards
### api/cards

Returns array of all cards, no matter the deck.
```
[
    {
        return here
    }
]
```

## GET specific card
### api/cards/:id

Returns a specific card, no matter the deck, based on the ID.
Will list tags on that card.

```
{
    retun here
}
```

## POST new card
### api/cards

```
{
    "deck_id": integer,         required
    "card_front": "string",     required
    "card_back": "string",      required
    "notes": "string"
}
```

### returns...

``` 
{
    return here
}
```

## PUT update existing card by ID
### api/cards/:id

```
{
    "deck_id": integer,         edit any of these fields
    "card_front": "string",     
    "card_back": "string",      
    "notes": "string",
    "comfort_level": decimal
    "next_due": timestamp
}
```

### returns...

``` 
{
    return here
}
```

## DELETE an existing card by ID
### api/cards/:id

Returns a successful response.

```
{
    return here
}
```

## GET all tags
### api/tags

Returns an array of all tags, no matter the card or deck.
```
[
    {
        return here
    }
]
```

## GET specific tag by ID
### api/tags/:id

Returns a specific tag by ID.

```
{
    return here
}
```

## POST new tag
### api/tags

```
{
    "tag_name": "string",       required
    "tag_description": "string"
}
```

### returns...

```
{
    return here
}
```

## PUT update existing tag by ID
### api/tags/:id

```
{
    "tag_name": "string",       edit any of these fields
    "tag_description": "string"
}
```

### returns...

```
{
    return here
}
```

## DELETE an existing tag by ID
### api/tags/:id

Returns a successful response.

```
{
    return here
}
```