import React, { useState } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  DATE_RANGE_TODAY,
  DATE_RANGE_THIS_WEEK,
  DATE_RANGE_THIS_MONTH,
  DATE_RANGE_LAST_2_MONTH,
  DATE_RANGE_LAST_4_MONTH,
  DATE_RANGE_THIS_YEAR,
  DATE_RANGE_ALL_TIME,
  DATE_RANGE_CUSTOM,
  getFilterDateRangeValues,
} from '../../../constants'

const DateRangeDropDown = ({
  selectedDate,
  setDateAction,
}) => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const handleClick = dateRange => {
    let changeDate = getFilterDateRangeValues({ range: dateRange })
    changeDate.range = dateRange;
    setDateAction(changeDate)
  }

  return (
    <div className="date-range-dropdown">
      <Dropdown isOpen={dropdownOpen} toggle={toggle} size="sm">
        <DropdownToggle caret>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="feather feather-calendar">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          {selectedDate.range}
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={() => handleClick(DATE_RANGE_TODAY)}>{DATE_RANGE_TODAY}</DropdownItem>
          <DropdownItem onClick={() => handleClick(DATE_RANGE_THIS_WEEK)}>{DATE_RANGE_THIS_WEEK}</DropdownItem>
          <DropdownItem onClick={() => handleClick(DATE_RANGE_THIS_MONTH)}>{DATE_RANGE_THIS_MONTH}</DropdownItem>
          <DropdownItem onClick={() => handleClick(DATE_RANGE_LAST_2_MONTH)}>{DATE_RANGE_LAST_2_MONTH}</DropdownItem>
          <DropdownItem onClick={() => handleClick(DATE_RANGE_LAST_4_MONTH)}>{DATE_RANGE_LAST_4_MONTH}</DropdownItem>
          <DropdownItem onClick={() => handleClick(DATE_RANGE_THIS_YEAR)}>{DATE_RANGE_THIS_YEAR}</DropdownItem>
          <DropdownItem onClick={() => handleClick(DATE_RANGE_ALL_TIME)}>{DATE_RANGE_ALL_TIME}</DropdownItem>
          <div className="custom-range">
            <p onClick={() => handleClick(DATE_RANGE_CUSTOM)}>{DATE_RANGE_CUSTOM}</p>
            {
              selectedDate.range === DATE_RANGE_CUSTOM && (
                <div className="date-range-picker-div">
                  <DatePicker
                    selected={selectedDate.start}
                    maxDate={selectedDate.end}
                    dateFormat="dd/MM/yyyy"
                    popperPlacement="bottom-end"
                    onChange={date => setDateAction({ ...selectedDate, start: date })}
                  />
                  &nbsp;-&nbsp;
                  <DatePicker
                    selected={selectedDate.end}
                    minDate={selectedDate.start}
                    dateFormat="dd/MM/yyyy"
                    popperPlacement="bottom-end"
                    onChange={date => setDateAction({ ...selectedDate, end: date })}
                  />
                </div>
              )
            }
          </div>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default DateRangeDropDown