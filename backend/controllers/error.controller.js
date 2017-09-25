const handle404NotFound = (req, res) => {
  res.status(404).render(process.cwd() + '/frontend/404');
}

module.exports = {
  handle404NotFound
}