interface BasicUser {
  id: number;
  name: string;
  email: string;
}

export interface AdminProps extends BasicUser {
  accessToken: string;
  authenticated: boolean;
}

export interface CustomerExtendedProps extends BasicUser {
  customer: {
    nic_number: string;
    units_consumed: number;
    account_balance_in_rupees: number;
    should_get_service: boolean;
    previous_voltage_reading: number;
    previous_current_reading: number;
    updated_at: string | null;
  };
}
