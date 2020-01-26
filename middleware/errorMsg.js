const sortByOptions = ['id','reads','likes','popularity'];
const directionOptions = ['asc', 'desc'];

// Middleware to handle bad params
const errorMsg = (req, res, next) => {
  const tags = req.query.tags;
  const sortBy = req.query.sortBy || 'id'; // sortBy or default if undefined id
  const direction = req.query.direction || 'asc'; // direction or default if undefined direction
  if (!tags) {
    res.status(400).send(
      {
        "error": "Tag parameter is required"
      }
    );
  } else if (!sortByOptions.find(s => s === sortBy)) {
    res.status(400).send(
      {
        "error": "sortBy parameter is invalid"
      }
    );
  } else if (!directionOptions.find(d => d === direction)) {
    res.status(400).send(
      {
        "error": "direction parameter is invalid"
      }
    );
  } else {
    next();
  }
}

module.exports = errorMsg;