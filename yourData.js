const issuerInfo = {
  displayName: "my super legit issuer for the Pit",
  legalName: "gm inc.",
  region: "USA",
};

const schemaStructure = {
  schema: "PolygonAtThePit",
  mandatoryExpiration: false,
  technicalName: "PolygonAtThePit",
  attributes: [
    {
      name: "AllowedInThePit",
      technicalName: "AllowedInThePit",
      type: "boolean",
      description:
        "Are you one of the top 150 Polygon builders selected for the Pit?",
    },
    {
      name: "ProjectsBuilt",
      technicalName: "ProjectsBuilt",
      type: "number",
      description: "How many web3 projects have you built?",
    },
    // schemas can have 2 attributes max
    // {
    //   name: "DateSignedUp",
    //   technicalName: "DateSignedUp",
    //   type: "date",
    //   description: "When did you register for Polygon @ the Pit?",
    // },
  ],
};

const claimOffer = {
  schemaId: "204e27e9-be3c-409b-a8fc-d6a9901da7d2",
  claimPayload: {
    attributes: [
      {
        attributeKey: "AllowedInThePit",
        // 🕳️ true!
        attributeValue: 1,
      },
      {
        attributeKey: "ProjectsBuilt",
        // 💻 all we do is ship ship ship 🚀
        attributeValue: 420,
      },
    ],
  },
};

module.exports = {
  issuerInfo,
  schemaStructure,
  claimOffer,
};
