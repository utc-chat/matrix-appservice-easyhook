import moment from 'moment'

export const AXIOS_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*"
  }
};

export const DATE_RANGE_TODAY = 'Today'
export const DATE_RANGE_THIS_WEEK = 'This Week'
export const DATE_RANGE_THIS_MONTH = 'This Month'
export const DATE_RANGE_LAST_2_MONTH = 'Last 2 Months'
export const DATE_RANGE_LAST_4_MONTH = 'Last 4 Months'
export const DATE_RANGE_THIS_YEAR = 'This Year'
export const DATE_RANGE_ALL_TIME = 'All Time'
export const DATE_RANGE_CUSTOM = 'Custom'

export const MONTH_RANGE_SIX = 'Last Six Months'
export const MONTH_RANGE_THIS_YEAR = 'This Year'

export const getFilterDateRangeValues = dateRange => {
  switch (dateRange.range) {
    case DATE_RANGE_CUSTOM: {
      return {
        start: moment(dateRange.start).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        end: moment(dateRange.end).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      }
    }
    case DATE_RANGE_TODAY: {
      return {
        start: moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        end: moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      }
    }
    case DATE_RANGE_THIS_WEEK: {
      return {
        start: moment().startOf('week').format('YYYY-MM-DD HH:mm:ss'),
        end: moment().endOf('week').format('YYYY-MM-DD HH:mm:ss'),
      }
    }
    case DATE_RANGE_THIS_MONTH: {
      return {
        start: moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
        end: moment().endOf('month').format('YYYY-MM-DD HH:mm:ss'),
      }
    }
    case DATE_RANGE_LAST_2_MONTH: {
      return {
        start: moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD HH:mm:ss'),
        end: moment().endOf('month').format('YYYY-MM-DD HH:mm:ss'),
      }
    }
    case DATE_RANGE_LAST_4_MONTH: {
      return {
        start: moment().subtract(3, 'months').startOf('month').format('YYYY-MM-DD HH:mm:ss'),
        end: moment().endOf('month').format('YYYY-MM-DD HH:mm:ss'),
      }
    }
    case DATE_RANGE_THIS_YEAR: {
      return {
        start: moment().startOf('year').format('YYYY-MM-DD HH:mm:ss'),
        end: moment().endOf('year').format('YYYY-MM-DD HH:mm:ss'),
      }
    }
    case DATE_RANGE_ALL_TIME: {
      return {
        start: '1980-01-01 00:00:00',
        end: moment().endOf('year').format('YYYY-MM-DD HH:mm:ss'),
      }
    }
    case MONTH_RANGE_SIX: {
      return {
        start: moment().subtract(6, 'months').startOf('month').format('YYYY-MM-DD HH:mm:ss'),
        end: moment().endOf('month').format('YYYY-MM-DD HH:mm:ss'),
      }
    }
    case MONTH_RANGE_THIS_YEAR: {
      return {
        start: moment().startOf('year').format('YYYY-MM-DD HH:mm:ss'),
        end: moment().endOf('year').format('YYYY-MM-DD HH:mm:ss'),
      }
    }
    default: {
      return false;
    }
  }
}
