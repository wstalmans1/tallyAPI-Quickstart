const config = {
  schema: [
    {
      // we force it to staging as that's how the team prefers as a development strategy
      "https://api.tally.xyz/query": {
        headers: {
          "Api-Key":
            "058f57c1d26e00a3d7f5bc1a0f1b3fd4ad7eb66f39542eb3eff08e33b7cd5550",
        },
      },
    },
  ],
  documents: ["src/CodegenQuery/*.graphql"],
  generates: {
    "autogen/schema.ts": {
      config: {
        skipTypename: true,
        errorType: "Error",
        scalars: {
          Long: "number",
          Bytes: "string",
          BigInt: "string",
          Address: "string",
          ChainID: "string",
          Bytes32: "string",
          Timestamp: "string",
          AssetID: "string",
          AccountID: "string",
        },
        fetcher: {
          func: "../../autogen/useGraphQLCodegen#useGraphQLCodegen",
          isReactHook: true,
        },
      },
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
      ],
    },
  },
};

// eslint-disable-next-line no-undef
module.exports = config;
