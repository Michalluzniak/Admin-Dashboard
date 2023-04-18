import { useState } from 'react';
import { Input, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import dialCodes from '../../../../json/dialCodes.json';
import { CountriesValues, PhoneCodesBtnProps } from '../../../../types/types';
import { useApiFilter } from './useApiFilter';

export const PhoneCodesBtn = ({ codeHandler, dialCodeFromNumbers }: PhoneCodesBtnProps) => {
  const [isCountryCodeButtonOpen, setIsCountryCodeButtonOpen] = useState<boolean>(false);
  const [countries, setCountries] = useState<CountriesValues[]>(dialCodes);
  const [countryCode, setCountryCode] = useState<string>('+48');

  // Custom filter on a given api
  // getApiList(apiList, inputVal)
  const [getApiList] = useApiFilter();

  const countriesFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountries(getApiList(dialCodes, e.target.value));
  };

  return (
    <ButtonDropdown
      toggle={() => setIsCountryCodeButtonOpen(!isCountryCodeButtonOpen)}
      isOpen={isCountryCodeButtonOpen}
    >
      <DropdownToggle
        style={{
          borderRadius: '0px',
          borderTopLeftRadius: '5px',
          borderBottomLeftRadius: '5px',
          backgroundColor: '#007EA7',
        }}
        caret
      >
        {dialCodeFromNumbers ? dialCodeFromNumbers : countryCode}
      </DropdownToggle>

      <DropdownMenu style={{ height: '200px', width: '350px', overflow: 'hidden' }}>
        <div className='inputContainer position-relative d-flex justify-content-center mb-3'>
          <Input
            style={{ width: '95%', height: '100%' }}
            placeholder='Search Country:'
            onChange={(e) => countriesFilter(e)}
          ></Input>
        </div>

        <div className='menuContainer' style={{ height: '100%', width: '100%', overflowY: 'scroll' }}>
          {/*  */}
          {countries.map((country: CountriesValues, index: number) => (
            //
            <DropdownItem
              onClick={() => {
                setCountries(dialCodes);
                setCountryCode(country.dial_code);
                codeHandler(country.dial_code);
              }}
              key={index}
              className='d-flex justify-content-between align-items-center'
            >
              <div className='containerPhone d-flex align-items-center' style={{ width: '150px', height: '100%' }}>
                <div style={{ width: '20%' }}>
                  <p className='me-2'> {country.flag}</p>
                </div>
                <div style={{ width: '80%' }}>
                  <p className='text-wrap'>
                    {country.name}({country.code})
                  </p>
                </div>
              </div>
              <div style={{ height: '100%' }}>
                <p>{country.dial_code}</p>
              </div>
            </DropdownItem>
            //
          ))}
        </div>
      </DropdownMenu>
    </ButtonDropdown>
  );
};
