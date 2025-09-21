import { useAuth } from '../contexts/AuthContext';
import backend from '~backend/client';

export function useBackend() {
  return backend;
}
