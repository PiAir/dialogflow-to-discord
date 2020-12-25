## Docker development versus production
When using Docker, I use 2 different set of commands for development versus production

## Development
`$ sudo docker run --rm -it --name node-discord-dev -v $PWD:/usr/src/app -v $PWD/google:/usr/data/ -w /usr/src/app  node:10 /bin/bash`

This creates a node:10 docker container named node-discord-dev. It will be removed automatically when I exit it. I can easily run the server, stop it, edit the files etc.

## Production
`$ sudo docker build --tag node-discord:1.1 .`

`$ sudo docker run -d --name node-discord -v $PWD/google:/usr/data/ -u node node-discord:1.1`

These two commands first builds the `node-discord:1.1` image and then start a container based on that. This will keep running.
