import requests


def get_nfts_at_address(address):

    url = f"https://api.covalenthq.com/v1/eth-mainnet/address/{address}/balances_nft/"

    payload = {}
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Basic Y2tleV8zMDJjMDJkODlhZjQ0ZjIzOGJlODBlMjNkZGI6",
    }

    response = requests.request("GET", url, headers=headers, data=payload)

    return response.text


def get_balances_at_address(address):

    url = f"https://api.covalenthq.com/v1/eth-mainnet/address/{address}/balances_v2/"

    payload = {}
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Basic Y2tleV8zMDJjMDJkODlhZjQ0ZjIzOGJlODBlMjNkZGI6",
    }

    response = requests.request("GET", url, headers=headers, data=payload)

    return response.text


def get_portfolio_value_at_address(address):

    url = f"https://api.covalenthq.com/v1/eth-mainnet/address/{address}/portfolio_v2/"

    payload = {}
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Basic Y2tleV8zMDJjMDJkODlhZjQ0ZjIzOGJlODBlMjNkZGI6",
    }

    response = requests.request("GET", url, headers=headers, data=payload)

    return response.text


def get_transactions(address):

    url = (
        f"https://api.covalenthq.com/v1/eth-mainnet/address/{address}/transactions_v2/"
    )

    payload = {}
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Basic Y2tleV8zMDJjMDJkODlhZjQ0ZjIzOGJlODBlMjNkZGI6",
    }

    response = requests.request("GET", url, headers=headers, data=payload)

    return response.text


def get_nft_traits(collectionContract):

    url = f"https://api.covalenthq.com/v1/eth-mainnet/nft/{collectionContract}/traits/"

    payload = {}
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Basic Y2tleV8zMDJjMDJkODlhZjQ0ZjIzOGJlODBlMjNkZGI6",
    }

    response = requests.request("GET", url, headers=headers, data=payload)

    return response.text


def get_nft_attribute_for_trait(collectionContract, trait):

    url = f"https://api.covalenthq.com/v1/eth-mainnet/nft/{collectionContract}/traits/{trait}/attributes/"

    payload = {}
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Basic Y2tleV8zMDJjMDJkODlhZjQ0ZjIzOGJlODBlMjNkZGI6",
    }

    response = requests.request("GET", url, headers=headers, data=payload)

    return response.text


def get_nft_summary(collectionContract):

    url = f"https://api.covalenthq.com/v1/eth-mainnet/nft/{collectionContract}/traits_summary/"

    payload = {}
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Basic Y2tleV8zMDJjMDJkODlhZjQ0ZjIzOGJlODBlMjNkZGI6",
    }

    response = requests.request("GET", url, headers=headers, data=payload)

    return response.text


def get_malicious_address(address):

    url = f"https://api.gopluslabs.io/api/v1/address_security/{address}?chain_id=1"

    payload = {}
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload)

    return response.text


def get_nft_holders(address):

    url = (
        f"https://api.gopluslabs.io/api/v1/nft_security/1?contract_addresses={address}"
    )

    payload = {}
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload)

    return response.json()


def get_pishing_site(url):

    url = f"https://api.gopluslabs.io/api/v1/phishing_site?url={url}"

    payload = {}
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload)

    return response.json()


def compute_financial_score(address):
    url = f"https://api.spectral.finance/api/v1/addresses/{address}/calculate_score"

    headers = {
        "Authorization": "Bearer SFMyNTY.g2gDbQAAACRhM2FmOGQ1NS1hMDA0LTRlNGItYWJmNC1iNTQ3Y2ZhZjg2YmFuBgB92c6lhgFiAAFRgA.pRPqpxbiBHI28pWeJnpYWFtcgubDo-h5tSzok89C2tA",
        "Content-Type": "text/plain",
    }

    response = requests.request("POST", url, headers=headers)

    return response.text


def get_financial_score(address):
    url = f"https://api.spectral.finance/api/v1/addresses/{address}"

    headers = {
        "Authorization": "Bearer SFMyNTY.g2gDbQAAACRhM2FmOGQ1NS1hMDA0LTRlNGItYWJmNC1iNTQ3Y2ZhZjg2YmFuBgB92c6lhgFiAAFRgA.pRPqpxbiBHI28pWeJnpYWFtcgubDo-h5tSzok89C2tA",
        "Content-Type": "text/plain",
    }

    response = requests.request("GET", url, headers=headers)

    return response.text


def get_eth_accounts():

    url0 = f"https://api.covalenthq.com/v1/eth-mainnet/block/latest/transactions_v3/page/0/"
    url1 = f"https://api.covalenthq.com/v1/eth-mainnet/block/latest/transactions_v3/page/1/"

    payload = {}
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Basic Y2tleV8zMDJjMDJkODlhZjQ0ZjIzOGJlODBlMjNkZGI6",
    }

    response0 = requests.request("GET", url0, headers=headers, data=payload)
    # response1 = requests.request("GET", url1, headers=headers, data=payload)

    return response0.text


address = "0x284602a06e6FF127acdCbD85B2ca610f2B101069"
nft_address = "0x23581767a106ae21c074b2276d25e5c3e136a68b"

print("NFT address\n", get_nft_holders(nft_address))

whale_address = "0xCFFAd3200574698b78f32232aa9D63eABD290703"

headers = {
    "Authorization": "Bearer SFMyNTY.g2gDbQAAACRhM2FmOGQ1NS1hMDA0LTRlNGItYWJmNC1iNTQ3Y2ZhZjg2YmFuBgB92c6lhgFiAAFRgA.pRPqpxbiBHI28pWeJnpYWFtcgubDo-h5tSzok89C2tA",
    "Content-Type": "text/plain",
}

url = f"https://api.spectral.finance/api/v1/addresses/{whale_address}"

response = requests.request("GET", url, headers=headers)


print("SSSS addsress", response.text)


# Get number of transactions
# https://docs.cloud.coinbase.com/node/docs/ethereum-api-reference#eth_gettransactioncount

# Get balance of the wallet
# https://docs.cloud.coinbase.com/node/docs/ethereum-api-reference#eth_getbalance

# Estimate gas paid
# https://docs.cloud.coinbase.com/node/docs/ethereum-api-reference#eth_estimategas

# Get ids and addresses and receive lots of data - for the mvp purposes need a list of 5-10 ids + addresses to make use of it
# https://apidocs.tally.xyz/#query-accounts

# Get governors - for the mvp purposes need a list of 5-10 ids + addresses to make use of it
# https://apidocs.tally.xyz/#query-governors

# APIs left: TheGraph
