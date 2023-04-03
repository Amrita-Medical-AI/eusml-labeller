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
      };
    }
    return null;
  }