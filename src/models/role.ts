export interface Role {
  name: string;
  roleName: TypeRole;
}

export enum TypeRole {
  DOCTOR = 'DOCTOR',
  SALES_MANAGER = 'SALES_MANAGER',
  PATIENT = 'PATIENT',
  FAMILY_MEMBER = 'FAMILY_MEMBER',
  NURSE = 'NURSE',
  DELIVERY_PERSON = 'DELIVERY_PERSON',
  ADMIN ='ADMIN'
}
