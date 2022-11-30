# [WIP] Building with Polygon ID Platform APIs

by Steph [oceans404](https://twitter.com/0ceans404)

<img width="876" alt="Polygon ID org to claims relationship" src="https://user-images.githubusercontent.com/91382964/204704674-21c1d312-9d2a-4533-b980-7c8e6e66c8c8.png">

Polygon ID Platform APIs empower you to **programatically**

- 🚢 Onboard to Polygon ID by creating an organization and issuer
- 🏗️ Create reusable schema templates
- 🤗 Generate claims offers (links to QR codes) to issue to users
- 🚀 & so much more... check out the official [Polygon ID Platform API docs](https://0xpolygonid.github.io/tutorials/issuer/platform-api/introduction/) for the full list of APIs

## Repo setup

0. Pre-req: [Install Node.js](https://nodejs.org/en/download/) 
1. Star and clone repo `git clone https://github.com/oceans404/node-polygon-id-platform-apis`
2. cd into repo `cd node-polygon-id-platform-apis`
3. Create a .env file: `cp .env.example .env;`
  - Within the .env file, update `POLYGON_ID_EMAIL` to your email. You will only be able to create one org account per email. I used the [+ sign in my email](https://people.cs.rutgers.edu/~watrous/plus-signs-in-email-addresses.html) to run multiple tests. ex: myemail@gmail.com, myemail+test0@gmail.com, myemail+test1@gmail.com, myemail+test2@gmail.com
  - Within the .env file, update `POLYGON_ID_PASSWORD` with a strong password (needs lowercase, uppercase, numbers, and special chars).


## Polygon ID Onboarding (Create Org and Issuer)

Before you can create and issue claims, you must complete the onboarding flow. Onboard to Polygon ID by creating an Organization account either programatically or within the [Polygon ID Platform UI](https://platform-test.polygonid.com/sign-up).

### Option 1: Onboard within the Polygon ID Platform UI

#### 1. Sign up 

Visit https://platform-test.polygonid.com/sign-up to sign up for an organization account to match the email and password in your `.env` file.

#### 2. Verify your org account

Click the link sent to your email. You may have to copy paste the full link into your browser because it has a period in it.

#### 3. Create your org's "issuer" with a name and optional details.


### Option 2: Onboard Programatically

#### 1. Create An Organization Account

Run `node api/createOrg.js`

```js
// Status: 201
// Body:  {
//     createdAt: '2022-11-28T22:53:54.537388Z',
//     email: 'myemail+test@icloud.com',
//     id: 'a460c501-e936-41f6-8af9-a29035ecf2db',
//     modifiedAt: '2022-11-28T22:53:54.537388Z',
//     type: 'OWNER',
//     verified: false
// }
```

[Create Org endpoint docs](https://0xpolygonid.github.io/tutorials/issuer/platform-api/onboarding-api/apis/#create-org)

#### 2. Sign-in to an Organization Account

Run `node api/signinOrg.js`

After you run the orgs sign in script, your generated JWT token is written to `token.js`

[Sign In to Org endpoint docs](https://0xpolygonid.github.io/tutorials/issuer/platform-api/onboarding-api/apis/#sign-in)

#### 3. Activate Organization Account

Run `node api/ActivateAccount.js`

```js
  // generates a new token that is saved to the file
  // {
  //   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njk4Mjk1MDksImp0aSI6ImEwYmVmOGFlLWU3YTAtNDU2NC1hZDg2LTk5MzE0ZTE5YmY1YyIsImlhdCI6MTY2OTc0MzEwOSwibmJmIjoxNjY5NzQzMTA5LCJzdWIiOiIyNzJkNjE2Zi01YjIzLTQwMjQtOTFhNi01MzIyMGQ4NzIzNzEiLCJzY29wZSI6ImFwaSIsImFjY291bnQiOnsidmVyaWZpZWQiOnRydWUsIm9yZ2FuaXphdGlvbiI6bnVsbCwicm9sZSI6Ik9XTkVSIiwiZW1haWwiOiJzdGVwaGFuaWVvcnBpbGxhK3Rlc3QyQGljbG91ZC5jb20ifX0.Xyzci_oohDatcwBr1oxIvK_fJ_JGAiCABLHS98Yopzc'
  // }
```

Once you've activated your account, you generate a new token that is written to `token.js`

[Activate Account endpoint docs](https://0xpolygonid.github.io/tutorials/issuer/platform-api/onboarding-api/apis/#activate-account)


#### 4. Create an Issuer

Optional: Update the issuerInfo object in `yourData.js` to name your Issuer. You'll be able to update these fields later within the [Polygon ID Platform UI](https://platform-test.polygonid.com/).

Run `node api/createIssuer.js`

```js
  // Status: 201
  // Body: {
  //     createdAt: '2022-11-29T18:52:20.506164Z',
  //     did: '115p1w77jT4Hs8x7sx4eMmKdyb9tzMsqngmYtBLKUj',
  //     displayName: 'my super legit issuer',
  //     id: 'e68a824f-d493-42df-9022-5d5b9bdad548',
  //     legalName: 'gm inc.',
  //     logo: '',
  //     modifiedAt: '2022-11-29T18:52:20.506164Z',
  //     ownerEmail: 'myemail+test@icloud.com',
  //     region: 'USA',
  //     slug: 'my-super-legit-issuer'
  // }
```

[Create Issuer endpoint docs](https://0xpolygonid.github.io/tutorials/issuer/platform-api/issuer/apis/#create-issuer)

#### 5. Refresh Token

Run `node api/refreshToken.js`

[Refresh Token endpoint docs](https://0xpolygonid.github.io/tutorials/issuer/platform-api/onboarding-orgs/apis/#refresh-token)


## Create a Schema

A Schema is a reusable template that defines the structure of claims by typing attributes. You can either [create a schema within the Polygon Platform UI](https://platform-test.polygonid.com/claiming/create-schema) or programatically by following the instructions below. 


#### 1. Define your schema structure

Update schemaStructure within `yourData.js`. Schemas must have unique names and up to 2 named attributes of type boolean, date, or number. If you set mandatoryExpiration to true, you'll need to add an expiration date later while issuing claims. 

#### 2. Sign in if you onboarded through the UI 

Run `node api/signinOrg.js` to generate a token.js file

#### 3. Run `node api/createSchema.js`

Here's my result. I saved the schemaURL s3 file to `resultingS3SchemaURL.json` for reference

```js
  //   Status: 201
  //   Body: {
  //     active: true,
  //     attributes: [
  //         {
  //           description: 'Is pineapple an acceptable pizza topping, yes or no?',
  //           name: 'LikesPineappleOnPizza',
  //           type: 'boolean'
  //         },
  //         {
  //           description: 'Number of animal friends (cats, dogs, birds, etc.) you own.',
  //           name: 'PetCount',
  //           type: 'number'
  //         }
  //     ],
  //     createdAt: '2022-11-29T22:32:23.962388Z',
  //     id: '77e48fa2-37e6-4818-b767-71588f6c0b73',
  //     issuerID: 'e68a824f-d493-42df-9022-5d5b9bdad548',
  //     mandatoryExpiration: false,
  //     modifiedAt: '2022-11-29T22:32:23.962388Z',
  //     schema: 'AboutMe',
  //     schemaHash: '2f2b9f023991a4e3e8617f803118bf37',
  //     schemaURL: 'https://s3.eu-west-1.amazonaws.com/polygonid-schemas/eb973a75-0ee3-4418-8e6d-f29a3ad3f84d.json-ld',
  //     technicalName: '',
  //     version: '1.1'
  //   }
```

[Create Schema endpoint docs](https://0xpolygonid.github.io/tutorials/issuer/platform-api/schemas/apis/#create-schema)

#### 4. Store the console logged schema id (id: '77e48fa2-37e6-4818-b767-71588f6c0b73') in your notes. You'll need this id to create a claim.

## Create a Claim Offer

#### 1. Set the schema id.

Find the claimOffer object within `yourData.js`. Update the schemaId property to the id field returned when you created a schema. This claim will follow that schema's template.

#### 2. Create an array of attribute keys and values for your offer

Update the attributes array within the claimOffer object in `yourData.js` so that there is one attribute object per attribute from the schemaStructure you created. The attributeKey property should match the name from the schemaStructure. The attributeValue should be a number (0 falsy, 1 truthy for booleans).


#### 3. run `node api/createClaim.js` to print your claim link

Note: this calls both the create claim and create qr code of offer APIs

```js

// Status: 201
// Body: {
//   attributeValues: [
//     { attributeKey: 'LikesPineappleOnPizza', attributeValue: 1 },
//     { attributeKey: 'PetCount', attributeValue: 2 }
//   ],
//   attributes: [
//     {
//       description: 'Is pineapple an acceptable pizza topping, yes or no?',
//       name: 'LikesPineappleOnPizza',
//       type: 'boolean'
//     },
//     {
//       description: 'Number of animal friends (cats, dogs, birds, etc.) you own.',
//       name: 'PetCount',
//       type: 'number'
//     }
//   ],
//   claimLinkExpiration: null,
//   createdAt: '2022-11-30T03:09:12.63183Z',
//   expiresAt: null,
//   id: 'd38734b8-c66c-4de2-b0ed-f7ebd8a52c7b',
//   limitedClaims: null,
//   schemaTemplateID: '77e48fa2-37e6-4818-b767-71588f6c0b73'
// }
// Status: 200
// Body: {
//   issuer: { displayName: 'my super legit issuer', logo: null },
//   offerDetails: {
//     attributeValues: [ [Object], [Object] ],
//     attributes: [ [Object], [Object] ],
//     claimLinkExpiration: null,
//     createdAt: '2022-11-30T03:09:12.63183Z',
//     expiresAt: null,
//     id: 'd38734b8-c66c-4de2-b0ed-f7ebd8a52c7b',
//     limitedClaims: null,
//     schemaTemplateID: '77e48fa2-37e6-4818-b767-71588f6c0b73',
//     schemaTemplateName: 'AboutMe'
//   },
//   qrcode: {
//     body: {
//       callbackUrl: 'https://api-staging.polygonid.com/v1/offers-qrcode/d38734b8-c66c-4de2-b0ed-f7ebd8a52c7b/callback?sessionID=03c887f3-625f-48f3-84d1-02f522ff76c9',
//       reason: 'auth login',
//       scope: []
//     },
//     from: '115p1w77jT4Hs8x7sx4eMmKdyb9tzMsqngmYtBLKUj',
//     id: '55e3ea5c-b79b-47c5-8451-3df3b7425a32',
//     thid: '55e3ea5c-b79b-47c5-8451-3df3b7425a32',
//     typ: 'application/iden3comm-plain-json',
//     type: 'https://iden3-communication.io/authorization/1.0/request'
//   },
//   sessionID: '03c887f3-625f-48f3-84d1-02f522ff76c9'
// }
// Claim your offer: https://platform-test.polygonid.com/claim-link/d38734b8-c66c-4de2-b0ed-f7ebd8a52c7b

```

Open your Polygon ID Wallet Mobile app to scan the QR code from the [claim your offer page](https://platform-test.polygonid.com/claim-link/d38734b8-c66c-4de2-b0ed-f7ebd8a52c7b)


<img width="1414" alt="Screen Shot 2022-11-29 at 7 48 12 PM" src="https://user-images.githubusercontent.com/91382964/204703305-fc7c4ff7-53bd-4803-8e35-a77cc5ec817a.png">



## Further Reading

### JWT and JWZ 

Because we are using JWT, Axios requests need to include the header "Accept-Encoding": "application/json"

Introduction to JWT (JSON Web Tokens) - https://jwt.io/introduction

JWZ - (JSON Web Zero-knowledge) expands the signature schema of the popular JWT standard. https://0xpolygonid.github.io/tutorials/wallet/wallet-sdk/polygonid-sdk/iden3comm/jwz/
