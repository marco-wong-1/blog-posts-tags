const express = require('express');
const axios = require('axios');
const router = express.Router();
const errorMsg = require('../../middleware/errorMsg');

const dataURL = 'https://blog-posts-fake-api.herokuapp.com/'

router.use(errorMsg);

router.get('/', async (req, res) => {
  const tags = req.query.tags;
  const sortBy = req.query.sortBy || 'id'; // sortBy or default id
  const direction = req.query.direction || 'asc'; // direction or default direction
  const tagsArray = tags.split(','); // split the tags into an array
  let postsObj = {};
  for (const i in tagsArray) {
    tag = tagsArray[i]
    try { // try to fetch api 
      const response = await callExternalApi(tag);
      response.map(p => {
        if (!postsObj[p.id]) {
          postsObj[p.id]=p;
        }
      });
      // const sortedRes = sortPosts(response, sortBy, direction); // sort the response
      // const sortedRes = response.sort((a,b) => {
      //   return sortingFn(a[sortBy],b[sortBy],direction);
      // });
      // if (posts.length > 0) { // sort and push the new posts in 
      //   posts = mergeSort(posts, sortedRes, sortBy, direction); // merge the two arrays
      // } else { // if its the first array of posts we fetched
      //   posts = sortedRes// sort the first arrays with directions
      // }
    } catch (err) { // handle errors
      // Some server error
      res.status(500).send({
        "msg": "Problems reaching external API",
        "error": `Server Error: ${err.code}`
      });
    }
  }
  const unsorted = Object.values(postsObj);
  const posts = sortPosts(unsorted, sortBy, direction);
  res.send({posts});
});

const callExternalApi = async (t) => { // axios function to get data
  const response = await axios.get(`${dataURL}?tag=${t}`);
  return response.data.posts;
}

const sortPosts = (posts, sortBy, direction) => { // sort posts depending on direction
  if (direction === 'asc') { // asc order
    return posts.sort((a,b) => {
      return a[sortBy] - b[sortBy]
    });
  } else { // desc order
    return posts.sort((a,b) => {
      return b[sortBy] - a[sortBy]
    });
  }
}

module.exports = router;