import arc from "@architect/functions";
import { v4 as uuidv4 } from 'uuid';
import { encryptPatient } from './cipher.server';
import { uniqueNamesGenerator, adjectives, names, languages } from 'unique-names-generator';

export async function createPatient({ mrd, name, morphology, doctor }) {
  const db = await arc.tables();
  const patientID = uuidv4();

  const patient_pii = await encryptPatient({ patientID, mrd, name, doctor });

  const patientPseudoName = uniqueNamesGenerator({
    dictionaries: [adjectives,languages, names],
    style: 'capital',
    separator: '-',
    seed: patientID
  }); 

  const result = await db.patient.put({
    pk: patientID,
    pseudo_name: patientPseudoName,
    morphology_presumed: morphology,
    morphology: morphology,
  });
  return {
    patientId: result.pk,
    morphology_presumed: result.morphology_presumed,
    morphology: result.morphology,
  };
}

export async function getPatientById({ patientId }) {
  const db = await arc.tables();
  const result = await db.patient.get({ pk: patientId });

  if (result) {
    return {
      patientId: result.pk,
      morphology: result.morphology,
      station1Start: result.station1Start,
      station1Stop: result.station1Stop,
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
      morphology: updatedPatient.morphology,
      doctor: updatedPatient.doctor,
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
