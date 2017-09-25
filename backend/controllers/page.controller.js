const { readJSON } = require('../tools/promisify');

const goToHomePage = (req, res) => {
  res.redirect('/signin');
}

const goToSignInPage = (req, res) => {
  if (!req.user)
    res.render(process.cwd() + '/frontend/signin');
  else 
    res.redirect('/addtask');
}

const goToAddTaskPage = (req, res) => {
  res.render(process.cwd() + '/frontend/addtask', { username: req.user.username });
}

const goToCompletedTaskPage = async (req, res) => {
  try {
    const data = await readJSON(__dirname + '/../data/tasks.json');
    res.render(process.cwd() + '/frontend/completed', { 
      username: req.user.username,
      tasks: data.tasks
    })
  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = {
  goToHomePage,
  goToSignInPage,
  goToAddTaskPage,
  goToCompletedTaskPage
}

