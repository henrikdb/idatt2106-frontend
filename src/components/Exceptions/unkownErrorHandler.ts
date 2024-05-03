import { ApiError as BackendApiError } from '@/api';
import { AxiosError } from 'axios';
import router from '@/router'
import { useUserInfoStore } from '@/stores/UserStore'

/**
 * Finds the correct error message for the given error
 * The message is then put into the error store
 * which an error component can then display
 * @param error The unknown error to handle
 */
const handleUnknownError = (error: any): string => {
  if (error instanceof AxiosError) {
    return error.code!!;
  } else if (error instanceof BackendApiError) {
    if (error.body.status == 403) {
      router.push("/login");
      useUserInfoStore().clearUserInfo();
    } else if (error.body.status == 401) {
      router.push("/roadmap");
    }
    return error.body.message ?? error.body;
  }
  return error;
};

export default handleUnknownError;