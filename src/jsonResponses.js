const respondJSON = (request, response, object, statusCode) => {
  response.writeHead(statusCode, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const getUsers = (request, response) => {

};

const notReal = (request, response) => {

};

const anythingElse = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };

  return respondJSON(request, response, responseJSON, 404);
};

module.exports = {
  getUsers,
  notReal,
  anythingElse,
};
