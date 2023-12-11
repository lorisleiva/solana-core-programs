const path = require("path");
const k = require("@metaplex-foundation/kinobi");

// Paths.
const clientDir = path.join(__dirname, "..", "clients");
const idlDir = path.join(__dirname, "..", "idls");

// Instanciate Kinobi.
const kinobi = k.createFromIdls([
  path.join(idlDir, "spl_address_lookup_table.json"),
  path.join(idlDir, "spl_compute_budget.json"),
  path.join(idlDir, "spl_memo.json"),
  path.join(idlDir, "spl_system.json"),
]);

// Update programs.
kinobi.update(
  new k.UpdateProgramsVisitor({
    //
  })
);

// Update accounts.
kinobi.update(
  new k.UpdateAccountsVisitor({
    addressLookupTable: {
      seeds: [
        k.publicKeySeed("authority", "The address of the LUT's authority"),
        k.variableSeed(
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
  new k.UpdateInstructionsVisitor({
    initializeNonceAccount: {
      args: {
        nonceAccountArg: { defaultsTo: k.accountDefault("nonceAccount") },
      },
    },
    authorizeNonceAccount: {
      args: {
        nonceAccountArg: { defaultsTo: k.accountDefault("nonceAccount") },
      },
    },
    //
  })
);

// Set account discriminators.
kinobi.update(
  new k.SetAccountDiscriminatorFromFieldVisitor({
    addressLookupTable: { field: "discriminator", value: k.vScalar(1) },
  })
);

// Render JavaScript.
const jsDir = path.join(clientDir, "js", "src", "generated");
const prettier = require(path.join(clientDir, "js", ".prettierrc.json"));
kinobi.accept(new k.RenderJavaScriptExperimentalVisitor(jsDir, { prettier }));

// Render Rust.
const crateDir = path.join(clientDir, "rust");
kinobi.accept(
  new k.RenderRustVisitor(path.join(crateDir, "src", "generated"), {
    formatCode: true,
    crateFolder: crateDir,
  })
);
