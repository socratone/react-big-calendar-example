import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/dist/locale/ko';
import moment, { Moment } from 'moment';
import { useMemo, useState } from 'react';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const localizer = momentLocalizer(moment);

type Event = {
  start: Date;
  end: Date;
  title: string;
  theme?: 'purple' | 'orange';
};

type EventProps = {
  event: Event;
};

const Event: React.FC<EventProps> = ({ event }) => {
  return (
    <Box>
      <Typography color={(theme) => theme.palette.primary.main}>
        {event.title}
      </Typography>
      <Typography>{event.start.toString()}</Typography>
    </Box>
  );
};

type EventWrapperProps = {
  event: Event;
  children?: React.ReactNode;
};

const EventWrapper: React.FC<EventWrapperProps> = ({ children }) => {
  return (
    <Box
      sx={{
        '.rbc-event': {
          backgroundColor: 'plum',
          border: '1px solid magenta',
        },
      }}
    >
      {children}
    </Box>
  );
};

const CustomWeeklyExample = () => {
  const [date, setDate] = useState<Moment>(moment());

  const { components, views } = useMemo(
    () => ({
      // https://jquense.github.io/react-big-calendar/examples/iframe.html?viewMode=docs&id=props--components&args=#components
      components: {
        event: Event,
        eventWrapper: EventWrapper,
      },
      views: {
        week: true,
      },
    }),
    []
  );

  const handlePrevious = () => {
    const subtractedDate = moment(date).subtract(1, 'week');
    setDate(subtractedDate);
  };

  const handleNext = () => {
    const addedDate = moment(date).add(1, 'week');
    setDate(addedDate);
  };

  const handleToday = () => {
    setDate(moment());
  };

  return (
    <Box sx={{ width: '80vw', margin: 4 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography>학습 캘린더</Typography>
        <Stack direction="row" gap={1}>
          <Button variant="contained" endIcon={<KeyboardArrowDownIcon />}>
            6월 1주차
          </Button>
          <Button variant="contained" onClick={handleToday}>
            오늘
          </Button>
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems="center">
          <Typography>{date.format('YYYY-MM-DD')}</Typography>
        </Stack>
      </Stack>
      <Box
        sx={{
          // header row
          '.rbc-row.rbc-time-header-cell': {
            minHeight: 96,
          },
          // header cell
          '.rbc-header': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomWidth: 0,
            padding: 1,
          },
          '.rbc-header.rbc-today': {
            button: {
              width: '100%',
              height: '100%',
              color: 'white',
              backgroundColor: 'grey',
            },
          },
          // today background color
          '.rbc-today': {
            backgroundColor: 'unset',
          },
          // remove all day row
          '.rbc-allday-cell': {
            display: 'none',
          },
          '.rbc-time-content': {
            borderTopWidth: 1, // remove ugly border
            backgroundColor: 'white', // content background color
          },
          // all background color
          '.rbc-time-view': {
            backgroundColor: 'whitesmoke',
          },
          '.rbc-header:first-child': {
            color: 'red',
          },
          '.rbc-header:last-child': {
            color: 'dodgerblue',
          },
          '.rbc-current-time-indicator': {
            backgroundColor: 'grey',
          },
          '.rbc-label': {
            fontWeight: 700,
          },
          // calendar height
          '.rbc-calendar': {
            height: '100%',
          },
          position: 'relative',
        }}
      >
        <IconButton
          onClick={handlePrevious}
          sx={{
            position: 'absolute',
            left: 0,
            top: 96 / 2,
            transform: 'translateY(-50%)',
          }}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <IconButton
          onClick={handleNext}
          sx={{
            position: 'absolute',
            right: 0,
            top: 96 / 2,
            transform: 'translateY(-50%)',
          }}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
        <Box height={500}>
          <Calendar
            allDayAccessor={() => false}
            components={components}
            views={views}
            toolbar={false}
            messages={{
              week: '주',
              day: '일',
              month: '월',
              previous: '이전',
              next: '다음',
              today: '오늘',
              agenda: '아젠다',
              tomorrow: '내일',
              yesterday: '어제',
              showMore: (total) => `+${total} 더보기`,
            }}
            localizer={localizer}
            date={date.toDate()}
            defaultView={Views.WEEK}
            dayLayoutAlgorithm="no-overlap"
            events={[
              {
                start: moment(
                  '2023-06-13 09:30:00',
                  'YYYY-MM-DD HH:mm:ss'
                ).toDate(),
                end: moment(
                  '2023-06-13 10:30:00',
                  'YYYY-MM-DD HH:mm:ss'
                ).toDate(),
                title: 'Some title',
              },
              {
                start: moment(
                  '2023-06-13 09:00:00',
                  'YYYY-MM-DD HH:mm:ss'
                ).toDate(),
                end: moment(
                  '2023-06-13 10:30:00',
                  'YYYY-MM-DD HH:mm:ss'
                ).toDate(),
                title: 'Some title 3',
              },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CustomWeeklyExample;
