# Blog Posts API

For a fake external API that fetches all posts with a certain tag. This API allows the user to search for multiple tags in one call, as well as being able to specify what to sort the result by and in what order. 

## API

Route: `http://blog-posts-tags.herokuapp.com/api/ping` <br />
Method: GET <br />
Response body (JSON): { "success": true } <br />
Reponse status code: 200 <br />
<br />

Route: `http://blog-posts-tags.herokuapp.com/api/posts` <br />
Method: GET <br />
Query Parameters: <br />
<p>

**tags** - required string, comma seperated list of tags <br />
example: `http://blog-posts-tags.herokuapp.com/api/posts?tags=tech,science` <br />
</p>
<p>

**sortBy** - optional string, field to sort the posts by
- id (default)
- reads
- likes
- popularity <br />
example: `http://blog-posts-tags.herokuapp.com/api/posts?tags=health&sortBy=likes` 
</p>
<p>

**direction** - optional string, direction for sorting
- asc (default) 
- desc <br />
example: `http://blog-posts-tags.herokuapp.com/api/posts?tags=history&direction=desc`
</p>

## Language & Tools

### Node & Express
I built this app node and express.
