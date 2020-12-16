The prerequisites for cashing a check are the same whether you are cashing it for an exact amount or a flexible amount.

- You need the ID of a Check object currently in the ledger.
    - For example, the ID of one Check in these examples is `838766BA2B995C00744175F69A1B11E32C3DBC40E64801A4056FCBD657F57334`, although you must use a different ID to go through these steps yourself.
- The **address** and **secret key** of the Check's stated recipient. The address must match the `Destination` address in the Check object.
- If the Check is for an issued currency, you (the recipient) must have a trust line to the issuer. Your limit on that trust line must be enough higher than the balance to add the amount you would receive.
    - For more information on trust lines and limits, see [Issued Currencies](issued-currencies.html) and [Trust Lines and Issuing](trust-lines-and-issuing.html).
- A secure way to sign transactions, such as [DivvyAPI][] or your own [`divvyd` server](install-divvyd.html).
- A client library that can connect to a `divvyd` server, such as [DivvyAPI][] or any HTTP or WebSocket library.
    - For more information, see [Get Started with the `divvyd` API](get-started-with-the-divvyd-api.html).
