const issuerInfo = {
  displayName: "my super legit issuer",
  legalName: "gm inc.",
  region: "USA",
};

const schemaStructure = {
  schema: "AboutMe",
  mandatoryExpiration: false,
  attributes: [
    {
      name: "LikesPineappleOnPizza",
      type: "boolean",
      description: "Is pineapple an acceptable pizza topping, yes or no?",
    },
    {
      name: "PetCount",
      type: "number",
      description:
        "Number of animal friends (cats, dogs, birds, etc.) you own.",
    },
    // schemas can have 2 attributes max
    // {
    //   name: "BestDayEver",
    //   type: "date",
    //   description: "What date was your favorite day of all time?",
    // },
  ],
};

const claimOffer = {
  schemaId: "77e48fa2-37e6-4818-b767-71588f6c0b73",
  claimPayload: {
    attributes: [
      {
        attributeKey: "LikesPineappleOnPizza",
        // 🍍 true!
        attributeValue: 1,
      },
      {
        attributeKey: "PetCount",
        // 🐕 Lexi + 🐩 Teddy = 2 🐾
        attributeValue: 2,
      },
    ],
  },
};

module.exports = {
  issuerInfo,
  schemaStructure,
  claimOffer,
};
