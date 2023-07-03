import arc from "@architect/functions";

export async function createPatient({ mrd, name }) {
  const db = await arc.tables();

  const result = await db.patient.put({
    pk: mrd,
    patientName: name,
  });
  return {
    mrd: result.pk,
    name: result.patientName,
  };
}

export async function getPatientByMRD({ patientMRD }) {
  const db = await arc.tables();
  const result = await db.patient.get({ pk: patientMRD });

  if (result) {
    return {
      mrd: result.pk,
      name: result.patientName,
      station1Start: result.station1Start,
      station1Stop: result.station1Stop,
    };
  }
  return null;
}

export async function putProcedureTimeStamps(props) {
  const { patientMRD, ...rest } = props;
  const db = await arc.tables();
  const patient = await db.patient.get({ pk: patientMRD });
  const date = new Date().toISOString().split('T')[0];

  if (patient) {
    const updatedPatient = {
      ...patient,
      ...rest,
      'Date': date,
    };

    await db.patient.put(updatedPatient);

    return {
      mrd: updatedPatient.pk,
      name: updatedPatient.patientName,
      "Start Procedure": "00:00:00",
      ...rest,
    };
  }

  return null;
}

export async function getProcedureTimeStamps({ patientMRD }) {
  const db = await arc.tables();

  const patient = await db.patient.get({ pk: patientMRD });
  delete patient.Date;
  return {
    "Start Procedure": "00:00:00",
    ...patient,
  };
}
