import arc from "@architect/functions";
import { v4 as uuidv4 } from 'uuid';
import { encryptPatient } from './cipher.server';
import { uniqueNamesGenerator, adjectives, names, NumberDictionary } from 'unique-names-generator';


export async function createPatient({ mrd, name, user }) {
  const db = await arc.tables();
  const patientID = uuidv4();

  const patient_pii = await encryptPatient({ patientID, mrd, name, user });

  let userOrg = user.org;
  if (!userOrg) userOrg = "Default"

  const numberDictionary = NumberDictionary.generate({ min: 10, max: 99 });
  const patientPseudoName = uniqueNamesGenerator({
    dictionaries: [adjectives, names, numberDictionary],
    style: 'capital',
    separator: '-',
    seed: patientID
  });

  const result = await db.patient.put({
    pk: patientID,
    pseudo_name: patientPseudoName,
    org: userOrg,
  });
  return {
    patientId: result.pk,
  };
}

export async function getPatientById({ patientId }) {
  const db = await arc.tables();
  const result = await db.patient.get({ pk: patientId });

  if (result) {
    return {
      patientId: result.pk,
    };
  }
  return null;
}

export async function updatePatientDetails({ patientId, updatedData }) {
  const db = await arc.tables();
  const patient = await db.patient.get({ pk: patientId });

  if (patient) {
    const updatedPatient = {
      ...patient,
      ...updatedData,
    };

    await db.patient.put(updatedPatient);

    return {
      patientId: updatedPatient.pk,
    };
  }

  return null;
}

export async function putProcedureTimeStamps(props) {
  const { patientId, ...rest } = props;
  const db = await arc.tables();
  const patient = await db.patient.get({ pk: patientId });
  const date = new Date().toISOString().split('T')[0];

  if (patient) {
    const updatedPatient = {
      ...patient,
      ...rest,
      'Date': date,
    };

    await db.patient.put(updatedPatient);

    return {
      patientId: updatedPatient.pk,
      "Start Procedure": "00:00:00",
      ...rest,
    };
  }

  return null;
}

export async function getProcedureTimeStamps({ patientId }) {
  const db = await arc.tables();

  const patient = await db.patient.get({ pk: patientId });

  return {
    "Start Procedure": "00:00:00",
    ...patient,
  };
}
