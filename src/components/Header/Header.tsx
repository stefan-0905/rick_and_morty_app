import React, { ChangeEvent } from 'react';
import { useDashboardContext } from '../../contexts/DashboardProvider';
import { debounce } from '../../utils/functions';

import styles from './Header.module.css';
import Logo from '../../assets/img/logo.png'

const Header = () => {
  const { setFilter } = useDashboardContext();

  const handleFormChange = async (e: ChangeEvent<HTMLFormElement>) => {
    // For search filter we want to debounce search so we don't make unnecessery API calls
    if (e.target.name === 'name') {
      debounce(() => {
        setFilter(e.target.name, e.target.value);
      });

      return;
    }

    setFilter(e.target.name, e.target.value);
  };

  return (
    <form className={'form'} onChange={handleFormChange}>
      <header className={'bg-white'}>
        <div
          className={`container w-100 d-sm-flex justify-content-between align-items-center text-center`}
        >
          <img
            src={Logo}
            alt={'logo'}
            className={`${styles.Logo} mb-2 mb-sm-0`}
          />
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="name"
              name="name"
              defaultValue={''}
              placeholder="Search"
            />
          </div>
        </div>
      </header>
      <div className={'container d-flex flex-column flex-sm-row gap-2'}>
        <span>Character status:</span>
        <div>
          <div className="form-check-inline d-inline-flex gap-1">
            <input
              className="form-check-input"
              type="radio"
              name="status"
              id="any"
              value=""
              data-testid="anyinput"
              defaultChecked={true}
            />
            <label className="form-check-label" htmlFor="any">
              Any
            </label>
          </div>
          <div className="form-check-inline d-inline-flex gap-1">
            <input
              className="form-check-input"
              type="radio"
              name="status"
              id="alive"
              value="Alive"
              data-testid="aliveinput"
            />
            <label className="form-check-label" htmlFor="alive">
              Alive
            </label>
          </div>
          <div className="form-check-inline d-inline-flex gap-1">
            <input
              className="form-check-input"
              type="radio"
              name="status"
              id="dead"
              value="Dead"
              data-testid="deadinput"
            />
            <label className="form-check-label" htmlFor="dead">
              Dead
            </label>
          </div>
          <div className="form-check-inline d-inline-flex gap-1">
            <input
              className="form-check-input"
              type="radio"
              name="status"
              id="unknown"
              value="Unknown"
              data-testid="unknowninput"
            />
            <label className="form-check-label" htmlFor="unknown">
              Unknown
            </label>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Header;
