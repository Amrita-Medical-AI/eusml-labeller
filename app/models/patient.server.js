import arc from "@architect/functions";

export async function createPatient({ mrd, name }) {
    const db = await arc.tables();
  
    const result = await db.patient.put({
      pk: mrd,
      patientName: name,
    });
    return {
      mrd: result.pk,
      name: result.name,
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

  export async function putStation1TimeStamps({ patientMRD, station1Start, station1Stop }) {
    const db = await arc.tables();
  
    const patient = await db.patient.get({ pk: patientMRD });
  
    if (patient) {
      const updatedPatient = {
        ...patient,
        station1Start,
        station1Stop,
      };
  
      await db.patient.put(updatedPatient);
  
      return {
        mrd: updatedPatient.pk,
        name: updatedPatient.patientName,
        station1Start: updatedPatient.station1Start,
        station1Stop: updatedPatient.station1Stop,
      };
    }
    return null;
  }