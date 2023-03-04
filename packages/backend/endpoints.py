from flask import Flask, request, jsonify
from walletDataFetch import *
import json
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)


@app.route("/get_nfts_at_address/<address>")
def api_get_nfts_at_address(address):
    result = json.loads(get_nfts_at_address(address))["data"]["items"]
    num_nfts = len(result)
    return {"num_nfts": num_nfts}


@app.route("/get_transactions/<address>")
def api_get_transactions(address):
    result = json.loads(get_transactions(address))["data"]["items"]

    tornado_cash = "0x910Cbd523D972eb0a6f4cAe4618aD62622b39DbF" in result
    number_of_transactions = len(result)
    return {
        "tornado_cash": tornado_cash,
        "number_of_transactions": number_of_transactions,
    }


@app.route("/get_bot_human/<address>")
def api_get_bot_human(address):
    result = json.loads(get_transactions(address))["data"]["items"]

    tornado_cash = "0x910Cbd523D972eb0a6f4cAe4618aD62622b39DbF" in result
    number_of_transactions = len(result["data"]["items"])
    return {
        "tornado_cash": tornado_cash,
        "number_of_transactions": number_of_transactions,
    }


@app.route("/get_portfolio_value/<address>")
def api_get_portfolio_value_at_address(address):
    result = json.loads(get_portfolio_value_at_address(address))["data"]["items"][0][
        "holdings"
    ]
    print(result[0])
    mean = float(0)
    time_differece = datetime.now() - datetime.now()
    time_differece = time_differece.seconds
    prev_time = 0

    for idx, value in enumerate(result):
        mean += float(value["close"]["balance"])
        if idx > 0:
            diff = (
                datetime.strptime(value["timestamp"], "%Y-%m-%dT%H:%M:%SZ") - prev_time
            )
            time_differece += diff.seconds

        prev_time = datetime.strptime(value["timestamp"], "%Y-%m-%dT%H:%M:%SZ")

    mean /= len(result)
    time_differece /= len(result)

    var = float(0)

    for value in result:
        var += (float(value["close"]["balance"]) - mean) ** 2

    var /= len(result)

    prob = 0.1

    bot = f"The wallet is likely to be managed by a bot with {prob*100}% probability"
    human = f"The wallets behaviour is likely to be managed by a real human-being with {100 - 100*prob}% probability"
    explanation = f", because we observed that the variation of wallet balance equals {var/mean} and the average time between consequitve transactions is approximately {str(time_differece)} seconds."

    answer = bot + explanation

    if var / mean > 0.001 or time_differece > 200:
        answer = human + explanation

    return {
        "mean": mean,
        "variance": var,
        "relative_var": var / mean,
        "time_differece": str(time_differece),
        "answer": answer,
    }


@app.route("/get_balances/<address>")
def api_get_balances_at_address(address):
    result = json.loads(get_balances_at_address(address))["data"]["items"]
    new_result = {}
    for crypto in result:
        new_result[crypto["contract_name"]] = float(crypto["balance"])
    return new_result


@app.route("/get_malicious_address/<address>")
def api_get_malicious_address(address):
    result = json.loads(get_malicious_address(address))["result"]
    return result


@app.route("/compute_score/<address>")
def api_get_compute_score(address):
    result = compute_financial_score(address)
    return {"result": result}


@app.route("/get_score/<address>")
def api_get_score(address):
    result = get_financial_score(address)
    return {"result": result}


@app.route("/get_ethereum_accounts")
def api_get_ethereum_accounts():
    result = get_eth_accounts()
    return result
