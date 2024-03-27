import CryptoJS, { enc } from "crypto-js";
import arc from "@architect/functions";

import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const getSecretKey = async (encryption_key) => {

  let secret = null;

  if (process.env.NODE_ENV === "development") {
    return process.env.SECRET_KEY
  }

  if (!encryption_key) encryption_key = "Default";

  const secret_name = encryption_key;

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
    return null
  }
  return secret
}

export const encryptString = async (encryption_key, plainText) => {
  const secret = await getSecretKey(encryption_key)
  if (!secret) {
    throw new Error("Secret key not initialized.");
  }
  return CryptoJS.AES.encrypt(plainText, secret).toString();
};

export const decryptString = async (encryption_key, cipherText) => {
  const secret = await getSecretKey(encryption_key)
  if (!secret) {
    throw new Error("Secret key not initialized.");
  }
  return CryptoJS.AES.decrypt(cipherText, secret).toString(CryptoJS.enc.Utf8);
};

export async function encryptPatient({ patientID, mrd, name, doctor, encryption_key }) {

  const date = new Date().toISOString().split('T')[0];
  const data = {
    pk: patientID,
    mrd: await encryptString(encryption_key, mrd),
    name: await encryptString(encryption_key, name),
    mrd_hash: CryptoJS.SHA256(mrd).toString(),
    date: date,
    doctor: await encryptString(encryption_key, doctor),
    encryption_key: encryption_key,
  }

  const db = await arc.tables();
  const result = await db.patient_info.put(data);

  return {
    patientId: result.pk,
    mrd: await decryptString(encryption_key, result.mrd),
    name: await decryptString(encryption_key, result.name),
    doctor: await decryptString(encryption_key, result.doctor),
    date: result.date
  };
};

export async function getPatientById({ patientId, user }) {
  const db = await arc.tables();
  const patient = await db.patient_info.get({ pk: patientId });
  if (!patient) {
    return null;
  }

  let encryption_key = user.encryption_key;
  if (!encryption_key) encryption_key = "Default";

  if(patient.encryption_key !== encryption_key){
    return null;
  }

  return {
    patientId: patient.pk,
    mrd: await decryptString(encryption_key, patient.mrd),
    name: await decryptString(encryption_key, patient.name),
    doctor: await decryptString(encryption_key, patient.doctor),
    date: patient.date
  };
}

export async function getPatientByMrd({ mrd, user }) {
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
  let encryption_key = user.encryption_key;
  if (!encryption_key) encryption_key = "Default";

  if(patient.encryption_key !== encryption_key){
    return null;
  }
  return {
    patientId: patient.pk,
    mrd: await decryptString(encryption_key, patient.mrd),
    name: await decryptString(encryption_key, patient.name),
    doctor: await decryptString(encryption_key, patient.doctor),
    date: patient.date
  };
}