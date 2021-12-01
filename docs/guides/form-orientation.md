# Orientation

By default in a form, all fields from the JSON schema are displayed vertically each in a row.

![](https://logabit.atlassian.net/wiki/download/attachments/2151288104/grafik-20201023-084022.png?api=v2)

# Vertical orientation

You can change this default by configuring `orientation` of the layout in the form configuration.

To do so, at first you need to add the element `layout` to the form configuration as shown in this example:

```
{
  "title": "Person",
  "description": "The person form",  
  ...
  
  "layout": {
    "orientation": "vertical",
    "items": [
      {"field": "firstName"},
      {"field": "lastName"},
      {"field": "age"},
      {"field": "gender"}
    ]
  }
}
```

This example layout configuration would create exactly the default layout:

![](https://logabit.atlassian.net/wiki/download/attachments/2151288104/grafik-20201023-100242.png?api=v2)

# Horizontal orientation

You can then change the `orientation`, `width` and `height` of a layout item like this:

```
{
  "title": "Person",
  "description": "The person form",  
  ...
  
  "layout": {
    "orientation": "horizontal",
    "height": "100",
    "width": "900",
    "items": [
      {"field": "firstName"},
      {"field": "lastName"},
      {"field": "age", "width": "150"},
      {"field": "gender"}
    ]
  }
}
```

`width` and `height` can be also specified to individual fields.

This would result in this form layout afterwards, where all fields are displayed in a single row (horizontally):

![](https://logabit.atlassian.net/wiki/download/attachments/2151288104/image-20210319-064428.png?api=v2)

Width of 900 of horizonal layout item prevents fields to cover all available space.

Layout items and fields in horizontal orientation by default try to span as much width as possible, but with respect to similar need of neighbouring fields - behave responsively.

Both `min-width` and `max-width` can be also used in place of `width` to reach responsiveness within defined limits.

# Nesting layouts and orientations

Layouts and its orientations can be nested in order to also create quite complex form structures. Here’s an example:

```
{
  "title": "Person Form",
  "description": "A simple person form.",  
  ...
  
  "layout": {
    "orientation": "horizontal",
    "items": [
      {
        "orientation": "vertical",
        "items": [
          {"field": "firstName"},
          {"field": "age"}
        ]
      },
      {
        "orientation": "vertical",
        "items": [
          {"field": "lastName"},
          {"field": "gender"}
        ]
      }
    ]
  } 
}
```

This example would produce a form like this with nested orientation:

![](https://logabit.atlassian.net/wiki/download/attachments/2151288104/grafik-20201023-101109.png?api=v2)
