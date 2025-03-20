# Simulations of geometric flows

https://flow.stevenbuchanan.net

## Curve shortening flow:
See information about this flow [here](https://en.wikipedia.org/wiki/Curve-shortening_flow).
The short version is that this flow moves every point in the direction of the curvature vector at that point.
It is the "most efficient" way to decrease the length of a curve, and perhaps the most interesting feature of this flow is that every curve that doesn't intersect itself to start with will never cross over itself under the flow, but will gradually shrink to a point while approaching a circle.
See also https://a.carapetis.com/csf/ for a nice demonstration of this with some information.

## Network flow:
My plan is to add some customization options to the page linked above, but for now you can find a simulation of network flow [here](https://stevenbuchanan.net/cool-stuff/).

## Discrete curve shortening flow:
Same as for network flow; there is a temporary version of this on my personal site.
If this is defined appropriately, we can use it to approximate smooth curve shortening flow by approximating a smooth curve by a polygonal segment (of course a computer has to use this philosophy on some level).

# To do list:
- Curve shortening flow in hyperbolic geometry
- Various discrete flows
