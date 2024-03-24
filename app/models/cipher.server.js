import CryptoJS from "crypto-js";
import arc from "@architect/functions";

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

export async function encryptPatient({ patientID, mrd, name, doctor }) {

  const date = new Date().toISOString().split('T')[0];
  const data = {
    pk: patientID,
    mrd: encryptString(mrd),
    name: encryptString(name),
    mrd_hash: CryptoJS.SHA256(mrd).toString(),
    date: date,
    doctor: encryptString(doctor),
  }

  const db = await arc.tables();
  const result = await db.patient_info.put(data);

  return {
    patientId: result.pk,
    mrd: decryptString(result.mrd),
    name: decryptString(result.name),
    doctor: decryptString(result.doctor),
    date: result.date
  };
};

export async function getPatientById({ patientId }) {
  const db = await arc.tables();
  const result = await db.patient_info.get({ pk: patientId });
  if (!result) {
    return null;
  }
  return {
    patientId: result.pk,
    mrd: decryptString(result.mrd),
    name: decryptString(result.name),
    doctor: decryptString(result.doctor),
    date: result.date
  };
}

export async function getPatientByMrd({ mrd }) {
  const db = await arc.tables();
  const result = await db.patient_info.scan({
    FilterExpression: 'mrd_hash = :mrd_hash',
    ExpressionAttributeValues: {
      ':mrd_hash': CryptoJS.SHA256(mrd).toString(),
    },
  });
  const patient = result.Items[0];
  if (!patient) {
    return null;
  }
  return {
    patientId: patient.pk,
    mrd: decryptString(patient.mrd),
    name: decryptString(patient.name),
    doctor: decryptString(patient.doctor),
    date: patient.date
  };
}