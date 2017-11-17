# Tic Tac Toe

Tic Tac Toe built w/ Rivercut

## Developing

If you want to dev rivercut alongside tic tac toe:
* Clone [Rivercut](https://github.com/RiverCut/rivercut)
* `npm i && npm link`
* Clone this repository
* `npm i && npm link rivercut`

Otherwise:
* `npm i`
* Create a `.env` file with:
  * `DEEPSTREAM_URL` (You can get a deepstream free [here](https://deepstreamhub.com/))
  * `DEEPSTREAM_TOKEN` (You need a token for the server process to be authoritative)
* `npm start`

### `.env` Notes

If you're using the local deepstream and auth service, you can make this your `.env` file:

```
DEEPSTREAM_URL=ws://127.0.0.1:6020/deepstream
DEEPSTREAM_TOKEN=MdKTi3fEg99ZeOsgRIaVJr8D9fZq0XNT
```

The token is a hardcoded auth token.

## Permissions

See [the RiverCut permissions note](https://github.com/RiverCut/rivercut#permissions) to set up the correct permissions for this demo.
