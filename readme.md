# Day 1

- Creating and setting up the projects. Client and server.
- Setup server side first. initialize the project with npm. Install core dependencies. Install dev dependencies.
- Initialize typescript configuration
- update package.json folder
- Setup server side folder structure. config, routes, controllers, models, utils, middleware, etc.
- Create a basic server in typescript. Had trouble with esmodules so reverted back to commonjs. It was causing a lot of issues.
- create a user schema in user models. Got stuck on jwt.sign(). Type errors we had to fix `expiresIn: parseInt(process.env.JWT_EXPIRE || "3600"),` and `  id: this._id.toString(),`
- Create Auth Middleware