// Importing the zk-SNARK functions (assumes zk_wasm.js is built and available)
import init, { get_pass_hash, generate_proof, verify_proof } from "./pkg/zk_wasm.js";

async function initWasm() {
    await init(); // Initializes the WASM module
    console.log("WASM Initialized");
}

// Call init function
initWasm();

const inputValue = document.getElementById("inputValue");
const proofResult = document.getElementById("proofResult");
const generateProofBtn = document.getElementById("generateProofBtn");
const verifyProofBtn = document.getElementById("verifyProofBtn");

let currentProof = null;

// Generate Proof
generateProofBtn.addEventListener("click", async () => {
    const value = inputValue.value;
    try {
        currentProof = await generate_proof(value, "1234"); // Sample passphrase
        proofResult.value = "Proof generated successfully!";
        console.log("Generated Proof:", currentProof);
    } catch (error) {
        proofResult.value = "Error generating proof";
        console.error(error);
    }
});

// Verify Proof
verifyProofBtn.addEventListener("click", async () => {
    if (!currentProof) {
        proofResult.value = "Please generate a proof first!";
        return;
    }
    
    const passHash = get_pass_hash("1234"); // Passphrase hash
    const isValid = await verify_proof(currentProof, passHash, inputValue.value);
    proofResult.value = isValid ? "Proof is valid!" : "Proof is invalid";
    console.log("Verification Result:", isValid);
});
