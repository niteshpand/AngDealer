import { EmailValidator } from '@angular/forms';

export interface DealerData {
  name: string;
  company_name: string;
  mobile_no: number;
  telephone_no: number;
  whatsapp_no: number;
  email: EmailValidator;
  remark: string;
  date_of_birth: Date;
  anniversary_date: Date;
  gst_type: string;
  gstin: string;
  pan_no: string;
  apply_tds: Boolean;
  credit_limit: number;
  opening_balance: number;
  opening_balance_type: string;
  login_access: Boolean;
  is_active: Boolean;
}
