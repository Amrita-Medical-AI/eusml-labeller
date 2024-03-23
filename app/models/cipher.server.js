import CryptoJS from "crypto-js";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const secret_name = "EUSML_Patient_Encryption";

let secret = process.env.NODE_ENV === "development" ? process.env.SECRET_KEY : null;

(async () => {
  try {
    const client = new SecretsManagerClient({
      region: "ap-south-1",
    });
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT",
      })
    );

    if ('SecretString' in response) {
      secret = response.SecretString;
    } else {
      throw new Error("Secret string not found in response.");
    }
  } catch (error) {
    console.error("Error fetching secret:", error);
  }
})();

export const encryptString = (plainText) => {
  if (!secret) {
    throw new Error("Secret key not initialized.");
  }
  return CryptoJS.AES.encrypt(plainText, secret).toString();
};

export const decryptString = (cipherText) => {
  if (!secret) {
    throw new Error("Secret key not initialized.");
  }
  return CryptoJS.AES.decrypt(cipherText, secret).toString(CryptoJS.enc.Utf8);
};
