import { useContext } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Checkbox, FormControlLabel, Grid, Slider, Typography } from '@mui/material';

import styled from 'styled-components';
import { MetamaskActions, MetaMaskContext } from '../hooks';
import {
  connectSnap,
  getSnap,
  sendHello,
  shouldDisplayReconnectButton,
} from '../utils';
import {
  ConnectButton,
  InstallFlaskButton,
  ReconnectButton,
  SendHelloButton,
  CheckBotHumanButton,
  GetWalletInformationButton,
  GetAccountsListButton,
  Card,
} from '../components';
import { InputField } from '../components/Inputs';
import { FilterComponent } from '../components/Filters';
import { GridComponent, MyTable } from '../components/Grid_info';
import { TextComponent, PaginatedListComponent } from '../components/Outputs';
import MetaMaskSDK from '@metamask/sdk';

const options = {
  injectProvider: false,
};

const MMSDK = new MetaMaskSDK(options);

const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-top: 7.6rem;
  margin-bottom: 7.6rem;
  ${({ theme }) => theme.mediaQueries.small} {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: auto;
  }
`;

const Heading = styled.h1`
  margin-top: 0;
  margin-bottom: 2.4rem;
  text-align: center;
`;

const Span = styled.span`
  color: ${(props) => props.theme.colors.primary.default};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 0;
  ${({ theme }) => theme.mediaQueries.small} {
    font-size: ${({ theme }) => theme.fontSizes.text};
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 64.8rem;
  width: 100%;
  height: 100%;
  margin-top: 1.5rem;
`;

const Notice = styled.div`
  background-color: ${({ theme }) => theme.colors.background.alternative};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  color: ${({ theme }) => theme.colors.text.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;

  & > * {
    margin: 0;
  }
  ${({ theme }) => theme.mediaQueries.small} {
    margin-top: 1.2rem;
    padding: 1.6rem;
  }
`;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.error.muted};
  border: 1px solid ${({ theme }) => theme.colors.error.default};
  color: ${({ theme }) => theme.colors.error.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-bottom: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.small} {
    padding: 1.6rem;
    margin-bottom: 1.2rem;
    margin-top: 1.2rem;
    max-width: 100%;
  }
`;

const Index = () => {

  const [state, dispatch] = useContext(MetaMaskContext);
  const [botHuman, setBotHuman] = useState('');
  const [accountInfo, setAccountInfo] = useState('');
  const [walletList, setWalletList] = useState([]);
  const [walletInfo, setWalletInfo] = useState({});

  const [filters, setFilters] = useState({
    hasImages: false,
    price: { min: 0, max: 10000 }
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: checked }));
  };

  const handlePriceChange = (_event: React.ChangeEvent<{}>, value: number | number[]) => {
    if (Array.isArray(value)) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        price: { ...prevFilters.price, min: value[0], max: value[1] }
      }));
    }
  };


  const handleConnectClick = async () => {
    try {
      await connectSnap();
      const installedSnap = await getSnap();

      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: installedSnap,
      });
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  const handleAccountInfoButton = async () => {
    try {
      let response = await axios.get(`http://localhost:5000/get_malicious_address/${accountInfo}`);
      response = response['data'];
      console.log(response);
      setWalletInfo(response);
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  // const handleCheckBotHuman = async () => {
  //   try {
  //     await sendHello();
  //   } catch (e) {
  //     console.error(e);
  //     dispatch({ type: MetamaskActions.SetError, payload: e });
  //   }
  // };

  const [address, setAddress] = useState("");
  const [filtersJS, setFiltersJS] = useState();
  const [result, setResult] = useState("");
  const [walletBotHuman, setWalletBotHuman] = useState("");

  const handleCheckBotHuman = async () => {
    try {
      let response = await axios.get(`http://localhost:5000/get_portfolio_value/${botHuman}`);
      response = response['data'];
      console.log(response);
      setWalletBotHuman(response['answer']);
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  const handleWalletInfoButton = async () => {
    try {
      let response = await axios.get(`http://localhost:5000/get_ethereum_accounts`);
      console.log(response);
      setWalletBotHuman(JSON.stringify(response));
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.get(`/get_nfts_at_address/${address}`);
      setResult(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };



  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBotHuman(event.target.value);
  };

  const handleAccountInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccountInfo(event.target.value);
  };

  const handleWalletListChangeButton = async () => {
    let response = await axios.get(`http://localhost:5000/get_ethereum_accounts`);
    // console.log(response['data']['data']['items']);
    let accountsList = [];
    for (var val of response['data']['data']['items']) {
      accountsList.push(val['from_address']);
      accountsList.push(val['to_address']);
    }

    let unique = accountsList.filter((item, i, ar) => ar.indexOf(item) === i);
    let filtered = [];
    console.log('Unique passed ######');
    for (var val of unique) {
      try {
        let balances = await axios.get(`http://localhost:5000/get_balances/${val}`);

        if (balances['data']['Ether'] >= filtersJS.amountEth.min && balances['data']['Ether'] <= filtersJS.amountEth.max) {

          let transactions = await axios.get(`http://localhost:5000/get_transactions/${val}`);

          if (transactions['data']['number_of_transactions'] >= filtersJS.numTrasactions.min && transactions['data']['number_of_transactions'] <= filtersJS.numTrasactions.max) {

            let tornado = true;

            if (filtersJS.hasTornadoCash) {

              if (transactions['data']['tornado_cash']) {
                tornado = false;
              }

            }

            let malicious = true;
            if (filtersJS.hasMaliciousContract) {
              let malicious_address = await axios.get(`http://localhost:5000/get_malicious_address/${val}`);
              malicious_address = malicious_address['data'];
              console.log(malicious_address);
              for (const item in malicious_address) {
                console.log(item, malicious_address[item]);
                if (malicious_address[item] != 0 && item != 'contract_address') {
                  console.log(malicious_address);
                  malicious = false;
                  break;
                }
              }
            }
            if (tornado && malicious) {
              filtered.push(val);
            }
          }
        }
      }
      catch (e) {
        console.log(e);
      }

    }
    try {
      setWalletList(filtered);
    }
    catch (e) {
      console.log(e);
      setWalletList(unique);
    }

  };

  const onFiltersChange = (filters: any) => {
    console.log("Filters updated:", filters);
    setFiltersJS(filters);
  };


  return (
    <Container>
      <Heading>
        Welcome to <Span>template-snap</Span>
      </Heading>
      <Subtitle>
        Get started by editing <code>src/index.ts</code>
      </Subtitle>
      <CardContainer>
        {state.error && (
          <ErrorMessage>
            <b>An error happened:</b> {state.error.message}
          </ErrorMessage>
        )}
        {!state.isFlask && (
          <Card
            content={{
              title: 'Install',
              description:
                'Snaps is pre-release software only available in MetaMask Flask, a canary distribution for developers with access to upcoming features.',
              button: <InstallFlaskButton />,
            }}
            fullWidth
          />
        )}
        {!state.installedSnap && (
          <Card
            content={{
              title: 'Connect',
              description:
                `Get started by connecting to and installing the example snap.`,
              button: (
                <ConnectButton
                  onClick={handleConnectClick}
                  disabled={!state.isFlask}
                />
              ),
            }}
            disabled={!state.isFlask}
          />
        )}
        {shouldDisplayReconnectButton(state.installedSnap) && (
          <Card
            content={{
              title: 'Reconnect',
              description:
                'While connected to a local running snap this button will always be displayed in order to update the snap if a change is made.',
              button: (
                <ReconnectButton
                  onClick={handleConnectClick}
                  disabled={!state.installedSnap}
                />
              ),
            }}
            disabled={!state.installedSnap}
          />
        )}
        <Card
          content={{
            title: 'Tell me if the wallet is managed by a bot or a human!',
            description:
              `Enter the adress: ${address}`,
            button: (
              <CheckBotHumanButton
                onClick={handleCheckBotHuman}
                disabled={!state.installedSnap}
              />
            ),
            input: <InputField
              label="Wallet Address"
              value={botHuman}
              onChange={handleNameChange}
            />,
            output: <TextComponent text={walletBotHuman} />,
            intro: 'Answer:\n'
          }}
          disabled={!state.installedSnap}
          fullWidth={
            state.isFlask &&
            Boolean(state.installedSnap) &&
            !shouldDisplayReconnectButton(state.installedSnap)
          }
        />
        <Card
          content={{
            title: 'I want more information about the account!',
            description:
              'Enter the address to get the information:',
            button: (
              <GetWalletInformationButton
                onClick={handleAccountInfoButton}
                disabled={!state.installedSnap}
              />
            ),
            input: <InputField
              label="Wallet Address"
              value={accountInfo}
              onChange={handleAccountInfoChange}
            />,
            output: <MyTable data={walletInfo} />,
          }}
          disabled={!state.installedSnap}
          fullWidth={
            state.isFlask &&
            Boolean(state.installedSnap) &&
            !shouldDisplayReconnectButton(state.installedSnap)
          }
        />

        <Card
          content={{
            title: 'I want a list of accounts satisfying my needs!',
            description:
              'Fill in the information below',
            button: (
              <GetAccountsListButton
                onClick={handleWalletListChangeButton}
                disabled={!state.installedSnap}
              />
            ),
            input: <FilterComponent onFiltersChange={onFiltersChange} />,
            output: <PaginatedListComponent items={walletList} />,
          }}
          disabled={!state.installedSnap}
          fullWidth={
            state.isFlask &&
            Boolean(state.installedSnap) &&
            !shouldDisplayReconnectButton(state.installedSnap)
          }
        />
        <Notice>
          <p>
            Please note that the <b>snap.manifest.json</b> and{' '}
            <b>package.json</b> must be located in the server root directory and
            the bundle must be hosted at the location specified by the location
            field.
          </p>
        </Notice>
      </CardContainer>
    </Container>
  );
};

export default Index;
