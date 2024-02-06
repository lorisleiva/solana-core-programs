const path = require("path");
const k = require("@metaplex-foundation/kinobi");

// Paths.
const clientDir = path.join(__dirname, "clients");

// Instanciate Kinobi.
const kinobi = k.createFromIdls(path.join(__dirname, "idl.json"));

// Update accounts.
kinobi.update(
  k.updateAccountsVisitor({
    addressLookupTable: {
      seeds: [
        k.variablePdaSeedNode(
          "authority",
          k.publicKeyTypeNode(),
          "The address of the LUT's authority"
        ),
        k.variablePdaSeedNode(
          "recentSlot",
          k.numberTypeNode("u64"),
          "The recent slot associated with the LUT"
        ),
      ],
    },
  })
);

// Update instructions.
kinobi.update(
  k.updateInstructionsVisitor({
    createLookupTable: {
      byteDeltas: [k.instructionByteDeltaNode(k.numberValueNode(56))],
      accounts: {
        address: { defaultValue: k.pdaValueNode("addressLookupTable") },
        payer: { defaultValue: k.accountValueNode("authority") },
      },
      arguments: {
        bump: { defaultValue: k.accountBumpValueNode("address") },
      },
    },
    extendLookupTable: {
      byteDeltas: [
        k.instructionByteDeltaNode(
          k.resolverValueNode("resolveExtendLookupTableBytes", {
            dependsOn: [k.argumentValueNode("addresses")],
          })
        ),
      ],
    },
  })
);

// Set account discriminators.
kinobi.update(
  k.setAccountDiscriminatorFromFieldVisitor({
    addressLookupTable: { field: "discriminator", value: k.numberValueNode(1) },
  })
);

// Set default values for structs.
kinobi.update(
  k.setStructDefaultValuesVisitor({
    addressLookupTable: {
      padding: { value: k.numberValueNode(0), strategy: "omitted" },
    },
  })
);

// Render JavaScript.
const jsDir = path.join(clientDir, "js", "src", "generated");
const prettier = require(path.join(clientDir, "js", ".prettierrc.json"));
kinobi.accept(k.renderJavaScriptExperimentalVisitor(jsDir, { prettier }));

// Render Rust.
const crateDir = path.join(clientDir, "rust");
kinobi.accept(
  k.renderRustVisitor(path.join(crateDir, "src", "generated"), {
    formatCode: true,
    crateFolder: crateDir,
  })
);
