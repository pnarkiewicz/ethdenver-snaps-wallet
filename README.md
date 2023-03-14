# @metamask/template-snap-monorepo

This repository demonstrates how to develop a snap with TypeScript. For detailed instructions, see [the MetaMask documentation](https://docs.metamask.io/guide/snaps.html#serving-a-snap-to-your-local-environment).

MetaMask Snaps is a system that allows anyone to safely expand the capabilities of MetaMask. A _snap_ is a program that we run in an isolated environment that can customize the wallet experience.

## Snaps is pre-release software

To interact with (your) Snaps, you will need to install [MetaMask Flask](https://metamask.io/flask/), a canary distribution for developers that provides access to upcoming features.

## Getting Started

Create conda environment:
```shell
conda create --name patootoo python=3.10.8
conda activate patootoo
```

Execute the following command to run the website at localhost:8000
```shell
yarn install && yarn start
```

Open new terminal window and run the following commands to run backend
```shell
cd packages/backend
flask --app endpoints run --reload
```

Now, you can access all the features at ```localhost:8000```.
