const distributeTask = (req, res) => {
  try {
    const { task } = req.body;
    if (!task)
      return res.status(400).json({ error: 'Task not found. Bad request' });
    process.send({ 
      signal: 'sendTask', 
      payload: {
        task,
        userId: req.user.id
      }
    });
    return res.status(200).json({ message: 'Task has sent to workers' });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

module.exports = {
  distributeTask
}