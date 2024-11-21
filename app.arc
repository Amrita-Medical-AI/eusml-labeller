@app
liver-labeller

@aws
region ap-south-1

@http
/*
  method any
  src server

@static

@tables
user
  pk *String

password
  pk *String # userId

patient
  pk *String # PatientId

patient_info
  pk *String # PatientId