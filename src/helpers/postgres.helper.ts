import { validate as isUUIDValid } from 'uuid';

export const isValidPostgresUUID = (id: string): boolean => {
  const hasValidUID = !!isUUIDValid(id);
  return hasValidUID;
};
