# Schema Validation Rules


# Length

```json
{
  "type": "string",
  "minLength": 2,
  "maxLength": 3
}
```

Valid: `hi`

# Regular expression

```json
{
   "type": "string",
   "pattern": "^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$"
}
```

Valid: `555-1212`

# Date and time

```json
{
   "type": "string",
   "format": "date-time"
}
```

Valid: `2018-11-13T20:20:39+00:00`

# Time (draft)

```json
{
   "type": "string",
   "format": "time"
}
```

Valid: `20:20:39+00:00`

# Date (draft)

```json
{
   "type": "string",
   "format": "date"
}
```

Valid: `2018-11-13`

# Email

```json
{
   "type": "string",
   "format": "email"
}
```

Valid: `my@email.de`

# Hostname

```json
{
   "type": "string",
   "format": "hostname"
}
```

Valid: `google.com`

# Uri

```json
{
   "type": "string",
   "format": "uri"
}
```

Valid: `https://google.com`

# Required fields

```json
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
