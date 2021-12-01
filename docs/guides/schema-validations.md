# Schema Validation Rules


# Length

```
{
  "type": "string",
  "minLength": 2,
  "maxLength": 3
}
```

Valid: `hi`

# Regular expression

```
{
   "type": "string",
   "pattern": "^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$"
}
```

Valid: `555-1212`

# Date and time

```
{
   "type": "string",
   "format": "date-time"
}
```

Valid: `2018-11-13T20:20:39+00:00`

# Time (draft)

```
{
   "type": "string",
   "format": "time"
}
```

Valid: `20:20:39+00:00`

# Date (draft)

```
{
   "type": "string",
   "format": "date"
}
```

Valid: `2018-11-13`

# Email

```
{
   "type": "string",
   "format": "email"
}
```

Valid: `my@email.de`

# Hostname

```
{
   "type": "string",
   "format": "hostname"
}
```

Valid: `google.com`

# Uri

```
{
   "type": "string",
   "format": "uri"
}
```

Valid: `https://google.com`

# Required fields

```
{
  "type": "object",
  "properties": {
    "name":      { "type": "string" },
    "email":     { "type": "string" },
    "address":   { "type": "string" },
    "telephone": { "type": "string" }
  },
  "required": ["name", "email"]
}
```
