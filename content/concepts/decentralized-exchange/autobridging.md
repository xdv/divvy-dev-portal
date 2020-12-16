# Auto-Bridging

Any OfferCreate that would exchange two non-XDV currencies could potentially use XDV as an intermediary currency in a synthetic order book. This is because of auto-bridging, which serves to improve liquidity across all currency pairs by using XDV as a vehicle currency. This works because of XDV's nature as a native cryptocurrency to the XDV Ledger. Offer execution can use a combination of direct and auto-bridged offers to achieve the best total exchange rate.

Example: _Anita places an offer to sell GBP and buy BRL. She might find that this uncommon currency market has few offers. There is one offer with a good rate, but it has insufficient quantity to satisfy Anita's trade. However, both GBP and BRL have active, competitive markets to XDV. Auto-bridging software finds a way to complete Anita's offer by purchasing XDV with GBP from one trader, then selling the XDV to another trader to buy BRL. Anita automatically gets the best rate possible by combining the small offer in the direct GBP:BRL market with the better composite rates created by pairing GBP:XDV and XDV:BRL offers._

Auto-bridging happens automatically on any OfferCreate transaction. [Payment transactions](payment.html) _do not_ autobridge by default, but path-finding can find paths that have the same effect.

## See Also

- [Dev Blog: Introducing Autobridging](https://xdv.io/dev-blog/introducing-offer-autobridging/)

- [Offer Preference](offers.html#offer-preference)
