import arc from "@architect/functions";

export async function createPatient({ mrd, name }) {
    const db = await arc.tables();
  
    const result = await db.patient.put({
      pk: mrd,
      patientName: name,
    });
    return {
      id: result.pk,
      patientName: result.name,
    };
  }
  