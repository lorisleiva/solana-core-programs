const path = require("path");
const k = require("@metaplex-foundation/kinobi");

// Paths.
const clientDir = path.join(__dirname, "clients");

// Instanciate Kinobi.
const kinobi = k.createFromIdls(path.join(__dirname, "idl.json"));

// Update instructions.
kinobi.update(
  k.updateInstructionsVisitor({
    createAccount: {
      byteDeltas: [k.instructionByteDeltaNode(k.argumentValueNode("space"))],
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
