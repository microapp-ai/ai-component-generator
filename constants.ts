// Tailwind CSS code
export const TAILWIND_BUTTON = `
import React from 'react';

const MyButton = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button>Click Me!</button>
    </div>
  );
};
export default MyButton;
`;

export const TAILWIND_BUTTON_STYLED = `
import React from 'react';

const MyButton = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">Click Me!</button>
    </div>
  );
};
export default MyButton;
`;

export const TAILWIND_FORM = `
import React from 'react';

const MyForm = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <div className="bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-800 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-800 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter your email address"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-800 font-bold mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter your message"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white p-3 rounded-lg font-bold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyForm;
`;

export const TAILWIND_CALENDAR = `
import React from 'react';
import { format, startOfMonth, addDays, isSameMonth } from 'date-fns';

const Calendar = () => {
  const now = new Date();
  const monthStart = startOfMonth(now);
  const days = [];

  // Add days to the calendar array
  let day = monthStart;
  while (day.getDay() !== 0) {
    day = addDays(day, -1);
    days.push(day);
  }

  day = monthStart;
  while (isSameMonth(day, now)) {
    days.push(day);
    day = addDays(day, 1);
  }

  while (days.length % 7 !== 0) {
    days.push(addDays(day, 1));
  }

  const getClassName = (d) => {
    return isSameMonth(d, now) ? 'bg-blue-400' : 'bg-gray-100';
  }

  // Render the calendar
  return (
    <div className="grid grid-cols-7 gap-2">
      <div className="bg-gray-200 p-2 rounded-lg font-bold text-gray-600">Sun</div>
      <div className="bg-gray-200 p-2 rounded-lg font-bold text-gray-600">Mon</div>
      <div className="bg-gray-200 p-2 rounded-lg font-bold text-gray-600">Tue</div>
      <div className="bg-gray-200 p-2 rounded-lg font-bold text-gray-600">Wed</div>
      <div className="bg-gray-200 p-2 rounded-lg font-bold text-gray-600">Thu</div>
      <div className="bg-gray-200 p-2 rounded-lg font-bold text-gray-600">Fri</div>
      <div className="bg-gray-200 p-2 rounded-lg font-bold text-gray-600">Sat</div>
      {days.map((d, i) => (
        <div
          key={i}
          className={getClassName(d)}
        >
          {format(d, 'd')}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
`;

// Mantine code
export const MANTINE_BUTTON = `
import React from 'react';
import { Button } from '@matine/core';

const MyButton = () => {
  return (
    <Flex direction="column" justify="center" align="center">
      <Button>Click Me!</Button>
    </Flex>
  );
};
export default MyButton;
`;

export const MANTINE_BUTTON_STYLED = `
import React from 'react';
import { Button } from '@matine/core';

const MyButton = () => {
  return (
    <Flex direction="column" justify="center" align="center">
      <Button color="indigo">Click Me!</Button>
    </Flex>
  );
};
export default MyButton;
`;

export const MANTINE_FORM = `
import React from 'react';
import { useForm } from '@mantine/form';
import { Button, TextInput, Textarea, Group, Paper } from '@mantine/core';

const MyForm = () => {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationRules: {
      name: (value) => value.trim().length >= 2,
      email: (value) =>
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value),
      message: (value) => value.trim().length >= 10,
    },
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (form.isValid) {
      console.log(form.values);
      form.clear();
    }
  };

  return (
    <Paper padding="lg">
      <form onSubmit={handleFormSubmit}>
        <Group position="center">
          <TextInput
            label="Name"
            placeholder="Enter your name"
            required
            value={form.values.name}
            onChange={(event) => form.setFieldValue('name', event.target.value)}
            error={form.errors.name && 'Please enter a valid name'}
          />
          <TextInput
            type="email"
            label="Email"
            placeholder="Enter your email"
            required
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.target.value)}
            error={form.errors.email && 'Please enter a valid email'}
          />
          <Textarea
            label="Message"
            placeholder="Enter your message"
            required
            value={form.values.message}
            onChange={(event) =>
              form.setFieldValue('message', event.target.value)
            }
            error={form.errors.message && 'Please enter a valid message'}
          />
          <Button type="submit" color="blue">
            Submit
          </Button>
        </Group>
      </form>
    </Paper>
  );
};

export default MyForm;
`;

export const MANTINE_CALENDAR = `
import React, { useState } from 'react';
import { Calendar } from '@mantine/dates';

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Calendar
      value={selectedDate}
      onChange={(date) => setSelectedDate(date)}
    />
  );
};

export default MyCalendar;
`;
