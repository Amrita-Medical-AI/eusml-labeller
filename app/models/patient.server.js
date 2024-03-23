import arc from "@architect/functions";
import { v4 as uuidv4 } from 'uuid';
import {encryptString, decryptString} from './cipher.server';

export async function createPatient({ mrd, name, morphology, doctor}) {
  const db = await arc.tables();
  const patientID = uuidv4();
  const encodedMrd = encryptString(mrd);
  const encodedName = encryptString(name);

  const result = await db.patient.put({
    pk: patientID,
    mrd: encodedMrd,
    patientName: encodedName,
    morphology_presumed: morphology,
    morphology: morphology,
    doctor: doctor,
  });
  return {
    patientId: result.pk,
    mrd: result.mrd,
    name: result.patientName,
    morphology_presumed: result.morphology_presumed,
    morphology : result.morphology,
    doctor: result.doctor,
  };
}

export async function getPatientById({ patientId }) {
  const db = await arc.tables();
  const result = await db.patient.get({ pk: patientId });

  if (result) {
    return {
      patientId: result.pk,
      mrd: decryptString(result.mrd),
      name: decryptString(result.patientName),
      morphology: result.morphology,
      doctor: result.doctor,
      station1Start: result.station1Start,
      station1Stop: result.station1Stop,
      date: result.Date,
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
      mrd: decryptString(updatedPatient.mrd),
      name: decryptString(updatedPatient.patientName),
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
      mrd: decryptString(updatedPatient.mrd),
      name: decryptString(updatedPatient.patientName),
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
