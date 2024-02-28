import { useState, useContext, useEffect } from 'react';

import { AuthContext } from '@context';

import { UserContextProps, CustomerExtendedProps } from '@types';

import { constants } from '@constants';

const Overview = () => {
  const { user } = useContext(AuthContext) as UserContextProps;

  const [customers, setCustomers] = useState<CustomerExtendedProps[]>([]);
  const [isTheftDetected, setIsTheftDetected] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      (async () => {
        try {
          const res = await fetch(constants.CUSTOMERS, {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${user.accessToken}`,
            },
          });

          const response = await res.json();

          if (res.status !== 200)
            throw new Error(
              typeof response?.detail === 'string'
                ? response.detail
                : 'Something went wrong',
            );

          setCustomers(response);
        } catch (err: any) {}
      })();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (customers.length === 4) {
      if (
        customers[0].customer.units_consumed !==
        customers[3].customer.units_consumed
      ) {
        setIsTheftDetected(true);
      } else {
        setIsTheftDetected(false);
      }
    }

    return () => {};
  }, [customers]);

  return (
    <div className="h-screen w-screen bg-strokedark p-4 text-white">
      <h1 className="text-4xl font-bold">Admin Theft Detector</h1>
      <div className="mt-8 flex flex-row items-center justify-start gap-4 text-black">
        {customers.map((cux) => (
          <div
            key={cux.id}
            className="h-48 w-full rounded-xl bg-stroke p-4 hover:bg-opacity-85"
          >
            <p className="text-xl font-semibold">{cux.name}</p>
            <p className="text-base font-light leading-none">{cux.email}</p>
            <p className="mt-6 text-center text-3xl font-semibold text-primary">
              {cux.customer.units_consumed ?? 'Fetching'}
            </p>
          </div>
        ))}
      </div>

      <p
        className={`mt-8 text-center text-3xl font-bold uppercase ${isTheftDetected ? 'text-[#CB4C4E]' : 'text-[#4CCBC9]'}`}
      >
        {isTheftDetected ? 'Theft Detected' : 'All good, no theft detected'}
      </p>
    </div>
  );
};

export default Overview;
