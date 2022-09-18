# TrustPOAP

Currently reviews are vulnerable to sybil attacks and untrustworthiness, they can be abused to aritificially manipulate ratings and make brands/products/events more attractive. People are more interested in reviews of users who actually watched/purchased/went to an event.

We all know how POAPs are loved within the ethereum community, and obvisously, we are not an exception. They are a great use case of NFTs for non-financial applications.

With that in mind, we believe they are the perfect primitive to benefit from Anonymous Verified Reviews. Why:

POAPs ensures proof of attendance, therefore -> reviewer = attendee => actual valuable review
To mitigate Sybil Attacks, we chose to use humanbound.xyz, which provides a unique proof of humanhood, enabling TrustPOAP to:

Ensure a review is made by an actual human
Therefore, with POAPs + humanbound.xyz, trustPOAP can make sure a reviewer:

✅ Is an actual attendee
✅ Is a unique human
✅ Can write only one review
✅ Preserves user anonymity
✅ Is censorship resistent
Review content is saved on IPFS 🌐
Review Hashes are immutable and submitted on the Blockchain 🔒

To create a review a user needs to:
1 - Participate at an event 💃
2 - Receive a POAP from it
3 - Be a Human ❌👽 (have a humanbound token from humanbound.xyz)
4 - Cannot have previously submitted a review for this event (the transaction will fail 😉)
5 - That's it 🎉

## Deployments

Currently deployed to Polygon mainnet at `0x92d138b4994820fde926a03961d6d447ea64354a`.

The website is live at https://trustpoap.com.

## Running the Project

Navigate to the `frontend` directory of the project and run:

```sh
$ yarn install
```
 to install all dependencies.
 
 Then:
 
 ```sh
 $ yarn dev
 ```

to run a local version of the website which interacts with the real mainnet contracts.
