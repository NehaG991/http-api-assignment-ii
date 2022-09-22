const query = require('querystring');

const users = {};

const respondJSON = (request, response, object, statusCode) => {
  response.writeHead(statusCode, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  if (request.method === 'GET') {
    return respondJSON(request, response, responseJSON, 200);
  }
  return respondJSONMeta(request, response, 200);
};

const notReal = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };

  if (request.method === 'GET') {
    return respondJSON(request, response, responseJSON, 404);
  }
  return respondJSONMeta(request, response, 404);
};

const addUser = (request, response) => {
  const oldBody = [];

  request.on('data', (chunk) => {
    oldBody.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(oldBody).toString();
    const body = query.parse(bodyString);

    const responseJSON = {
      message: 'Name and age are both required.',
    };

    // Checks if params are filled or not
    if (!body.name || !body.age) {
      responseJSON.id = 'addUserMissingParams';
      return respondJSON(request, response, responseJSON, 400);
    }

    let statusCode = 204;

    // Checks if the user exists
    if (!users[body.name]) {
      statusCode = 201;
      users[body.name] = {};
    }

    // Update/add fields to user
    users[body.name].name = body.name;
    users[body.name].age = body.age;

    if (statusCode === 201) {
      responseJSON.message = 'Created Successfully';
      return respondJSON(request, response, responseJSON, statusCode);
    }

    return respondJSONMeta(request, response, statusCode);
  });
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
  addUser,
  anythingElse,
};
