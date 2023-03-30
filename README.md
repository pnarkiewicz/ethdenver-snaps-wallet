# Patootoo - want more info about accounts?!

![image](https://user-images.githubusercontent.com/57833772/228804128-842ef716-b027-4acd-9ddf-425c89b73e8d.png)

Even though patootoo looks as it looks, I'm truly convinced that it will help you with one of the blockchain features below! It will also make sure that you know everything about the wallet that you intend to transfer some crypto to!

## Snaps is pre-release software

To interact with (your) Snaps, you will need to install [MetaMask Flask](https://metamask.io/flask/), a canary distribution for developers that provides access to upcoming features.

## Getting Started

Create conda environment:
```shell
conda create --name patootoo python=3.10.8
conda activate patootoo
pip install -r requirements.txt
```

Execute the following command to run the website at localhost:8000
```shell
yarn install && yarn start
```

Open new terminal window and run the following commands to run backend
```shell
conda activate patootoo
cd packages/backend
flask --app endpoints run --reload
```

Now, connect your metamask wallet and you can access all the features at ```localhost:8000```!

## Blockchain feature #1

Patootoo (prototype) Wallet Classification - here you simply paste your desired wallet address. Based on on-chain activity the tool simply classifies wallet addresses into wallets managed by:
- humans
- bots/computers

TODO #1: binary classifications using logistic regression and neural networks.
TODO #2: extend the tool for classification of more in-depth classes advertisement-targeting clusters.

<img width="339" alt="" src="https://user-images.githubusercontent.com/57833772/228801167-ea9d59bc-8bc2-4fb4-956d-acfb60668f6a.png">

## Blockchain feature #2

Patootoo (prototype) Wallet Information - here you simply paste your desired wallet address. Based on on-chain activity the tool yields information about malicious behaviour based on on-chain data such as fraud, money laundering or cybercrimes.

TODO #1: improve the UX.
TODO #2: add button with function downloading the data.

<img width="300" alt="" src="https://user-images.githubusercontent.com/57833772/228802518-63d008ec-1970-4a34-9519-db40de913a0d.png">

## Blockchain feature #3

Patootoo (prototype) Wallet Database - select desired filters, click 'Get a list of accounts!' and wait 2-4 minutes to get the list satisyfing your needs!

TODO #1: improve the UX.
TODO #2: add button with function downloading the data.
TODO #3: add more filters.

<img width="323" alt="Zrzut ekranu 2023-03-30 o 11 54 59" src="https://user-images.githubusercontent.com/57833772/228803403-f2ba4e70-e490-4640-ae69-4547717c7a2c.png">

## Blockchain feature #4

Just before the final approval of the transaction Patootoo will tell you everything it knows about the wallet (and it knows a lot!).


