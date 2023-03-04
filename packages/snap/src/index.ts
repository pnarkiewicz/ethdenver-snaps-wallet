import { OnTransactionHandler } from '@metamask/snaps-types';
import { heading, panel, text } from '@metamask/snaps-ui';
import axios from 'axios';

// Handle outgoing transactions
export const onTransaction: OnTransactionHandler = async ({ transaction }) => {
  console.log('Transaction insights transaction', transaction);

  let val = transaction['to'];

  console.log(val);
  let botHuman;
  try {
    botHuman = await fetch(`http://localhost:5000/get_portfolio_value/${val}`);
    botHuman = await botHuman.json();
  }
  catch (e) {
    botHuman = e;
  }

  console.log(botHuman);
  let maliciousAddress;
  let explanation = '';
  try {
    maliciousAddress = await fetch(`http://localhost:5000/get_malicious_address/${val}`);
    maliciousAddress = await maliciousAddress.json();

    console.log(maliciousAddress);

    for (const val in maliciousAddress) {
      console.log(val, maliciousAddress[val]);
      if (maliciousAddress[val] || true) {
        if (explanation === '') {
          explanation = 'Be aware of the following facts about the wallet that you are intending to transfer funds to. The address was likely to be involved in: '
        }
        explanation = explanation + val + ", ";
        console.log(explanation);
      }
    }
    if (explanation != '') {
      explanation = explanation + '!';
    }
    else {
      explanation = 'The wallet seems not to have interacted with any malicious contract, participated in money laundering nor financial crime. Notice, however that this is beta version.'
    }
    console.log(explanation);
  }
  catch (e) {
    explanation = e;
  }

  let balances;

  try {
    balances = await fetch(`http://localhost:5000/get_balances/${val}`);
    balances = await balances.json();

    console.log(balances);

    let balancesInfo = '';

    for (const val in balances) {
      console.log(val, balances[val]);
      if (balances[val] || true) {
        if (balancesInfo === '') {
          balancesInfo = 'The wallet you are intending to transfer funds to has: ';
        }
        balancesInfo = balancesInfo + val + " of " + balances[val] + ', ';
        console.log(balancesInfo)
      }
      if (balancesInfo != '') {
        balancesInfo = balancesInfo + '.';
      }
    }
    console.log(balancesInfo);
  }
  catch (e) {
    balances = e;
  }

  const currentGasPrice: string | any = await ethereum.request({
    method: 'eth_gasPrice',
  });

  console.log('Current gas price', currentGasPrice);


  const transactionGas = parseInt(transaction.gas as string, 16);
  const currentGasPriceInWei = parseInt(currentGasPrice ?? '', 16);
  const maxFeePerGasInWei = parseInt(transaction.maxFeePerGas as string, 16);
  const maxPriorityFeePerGasInWei = parseInt(
    transaction.maxPriorityFeePerGas as string,
    16,
  );

  const gasFees = Math.min(
    maxFeePerGasInWei * transactionGas,
    (currentGasPriceInWei + maxPriorityFeePerGasInWei) * transactionGas,
  );

  console.log('Current gas price', currentGasPrice);


  return {
    content: panel([
      heading('Percent Snap'),
      text(
        `${botHuman['answer']}<br/>${explanation}<br/>${balances}`,
      ),
    ]),
  };
};