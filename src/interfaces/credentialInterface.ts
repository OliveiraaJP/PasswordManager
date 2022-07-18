import { Credential } from "@prisma/client";

export type CredentialDataObj = Omit<Credential, 'createdAt' | 'id'>;

export type CredentialDataReq = Omit<CredentialDataObj, 'userId'>