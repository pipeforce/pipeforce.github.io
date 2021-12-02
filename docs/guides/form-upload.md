# Upload

In order to do a file upload using forms, this is a two step process:

# Step 1

Add the properties required for files in your forms schema. For example:

```
{  ...
  "myInvoice": {
    "type": "object",
    "properties": {
      "filename": {"type": "string"},
      "contentLength": {"type": "integer"},
      "contentType": {"type": "string"},
      "contentEncoding": {"type": "string"},
      "content": {"type": "string"}
    }  
  }
}
```

# Step 2

“Tell” the form configuration to “draw” the field as a `filepicker` field using the `render` attribute. For example:

```
{
  "title": "Invoice",
  "description": "An invoice form",  
  ...
  "layout": {
    "items": [
      {
        "field": "myInvoice", 
        "render": "filepicker"
      }
    ]
  }
}
```

Instead of `filepicker` you can set the render attribute also to `pdfviewer` in order to show an embedded preview of an uploaded PDF.