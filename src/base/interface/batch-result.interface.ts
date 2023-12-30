import { RESPONSE_STATUS } from '../base-constant';

export interface IBatchResult {
  id: string;
  status: RESPONSE_STATUS;
  message: string;
}
