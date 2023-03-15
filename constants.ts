// React code
export const REACT_BUTTON = `
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

export const REACT_BUTTON_STYLED = `
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

export const REACT_FORM = `
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

export const REACT_CALENDAR = `
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

// Svelte code
export const SVELTE_BUTTON = `
  <script>
    // No props or data are needed for this component
  </script>

  <style>
    /* Define the component styles using Tailwind CSS classes */
    /* No additional styles are needed */
  </style>
  <div class="flex flex-col items-center justify-center h-screen">
    <button class="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md">
      Click Me!
    </button>
  </div>
`;

export const SVELTE_BUTTON_STYLED = `
  <script>
    // No props or data are needed for this component
  </script>

  <style>
    /* Define the component styles using Tailwind CSS classes */
    /* No additional styles are needed */
  </style>
  <div class="flex flex-col items-center justify-center h-screen">
    <button class="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">Click Me!</button>
  </div>
`;

export const SVELTE_FORM = `
  <script>
    // No props or data are needed for this component
  </script>

  <style>
    /* Define the component styles using Tailwind CSS classes */
    /* No additional styles are needed */
  </style>

  <div class="flex flex-col items-center justify-center h-screen bg-gray-200">
    <div class="bg-white p-10 rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold mb-4">Contact Us</h1>
      <form class="space-y-6">
        <div>
          <label for="name" class="block text-gray-800 font-bold mb-2">Name</label>
          <input type="text" id="name" name="name" class="w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter your name"/>
        </div>
        <div>
          <label for="email" class="block text-gray-800 font-bold mb-2">Email</label>
          <input type="email" id="email" name="email" class="w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter your email address"/>
        </div>
        <div>
          <label for="message" class="block text-gray-800 font-bold mb-2">Message</label>
          <textarea id="message" name="message" rows="5" class="w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter your message"></textarea>
        </div>
        <div>
          <button type="submit" class="w-full bg-indigo-500 text-white p-3 rounded-lg font-bold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">Send Message</button>
        </div>
      </form>
    </div>
  </div>
`;

export const SVELTE_CALENDAR = `
  <script>
    import { format, startOfMonth, addDays, isSameMonth } from 'date-fns';

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
      return isSameMonth(d, now) ? 'today' : 'other-day';
    }
    </script>

    <style>
    /* Define the component styles using Tailwind CSS classes */
    /* No additional styles are needed */
    </style>

    <div class="grid grid-cols-7 gap-2">
    <div class="day sun bg-gray-200 p-2 rounded-lg font-bold text-gray-600">Sun</div>
    <div class="day mon bg-gray-200 p-2 rounded-lg font-bold text-gray-600">Mon</div>
    <div class="day tue bg-gray-200 p-2 rounded-lg font-bold text-gray-600">Tue</div>
    <div class="day wed bg-gray-200 p-2 rounded-lg font-bold text-gray-600">Wed</div>
    <div class="day thu bg-gray-200 p-2 rounded-lg font-bold text-gray-600">Thu</div>
    <div class="day fri bg-gray-200 p-2 rounded-lg font-bold text-gray-600">Fri</div>
    <div class="day sat bg-gray-200 p-2 rounded-lg font-bold text-gray-600">Sat</div>
    \${days.map((d, i) => (
      '<div class="day ' + getClassName(d) + '" key="' + i + '">' + format(d, 'd') + '</div>'
    ))}
  </div>
`;

export const VUE_BUTTON = `
  <template>
    <div class="flex flex-col items-center justify-center h-screen">
      <button>Click Me!</button>
    </div>
  </template>

  <script>
  export default {
    name: "MyButton"
  }
  </script>

  <style>
  /* styles go here */
  </style>
`;

export const VUE_BUTTON_STYLED = `
  <template>
    <div class="flex flex-col items-center justify-center h-screen">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Click Me!
      </button>
    </div>
  </template>

  <script>
  export default {
    name: 'MyButton'
  };
  </script>

  <style scoped>
  /* Add Tailwind classes as needed */
  </style>
`;

export const VUE_FORM = `
  <template>
    <div class="flex flex-col items-center justify-center h-screen bg-gray-200">
      <div class="bg-white p-10 rounded-lg shadow-lg">
        <h1 class="text-3xl font-bold mb-4">Contact Us</h1>
        <form class="space-y-6">
          <div>
            <label for="name" class="block text-gray-800 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              class="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label for="email" class="block text-gray-800 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              class="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter your email address"
            />
          </div>
          <div>
            <label for="message" class="block text-gray-800 font-bold mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              class="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter your message"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              class="w-full bg-indigo-500 text-white p-3 rounded-lg font-bold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>

  <script>
  export default {
    name: "MyForm",
  };
  </script>

  <style>
  /* styles go here */
  </style>
`;

export const VUE_CALENDAR = `
  <template>
    <div class="grid grid-cols-7 gap-2">
      <div class="bg-gray-200 p-2 rounded-lg font-bold text-gray-600">Sun</div>
      <div class="bg-gray-200 p-2 rounded-lg font-bold text-gray-600">Mon</div>
      <div class="bg-gray-200 p-2 rounded-lg font-bold text-gray-600">Tue</div>
      <div class="bg-gray-200 p-2 rounded-lg font-bold text-gray-600">Wed</div>
      <div class="bg-gray-200 p-2 rounded-lg font-bold text-gray-600">Thu</div>
      <div class="bg-gray-200 p-2 rounded-lg font-bold text-gray-600">Fri</div>
      <div class="bg-gray-200 p-2 rounded-lg font-bold text-gray-600">Sat</div>
      <div v-for="(day, index) in days" :key="index" :class="getClassName(day)">
        {{ formatDate(day, 'd') }}
      </div>
    </div>
  </template>

  <script>
    import { format, startOfMonth, addDays, isSameMonth } from 'date-fns';

    export default {
      name: 'Calendar',
      data() {
        return {
          now: new Date(),
          days: []
        }
      },
      methods: {
        formatDate(date, formatStr) {
          return format(date, formatStr);
        },
        getClassName(day) {
          return isSameMonth(day, this.now) ? 'bg-blue-400 p-2 rounded-lg font-bold text-white' : 'bg-gray-100 p-2 rounded-lg font-bold text-gray-600';
        }
      },
      created() {
        const monthStart = startOfMonth(this.now);

        // Add days to the calendar array
        let day = monthStart;
        while (day.getDay() !== 0) {
          day = addDays(day, -1);
          this.days.push(day);
        }

        day = monthStart;
        while (isSameMonth(day, this.now)) {
          this.days.push(day);
          day = addDays(day, 1);
        }

        while (this.days.length % 7 !== 0) {
          this.days.push(addDays(day, 1));
        }
      }
    }
  </script>

  <style scoped>
    /* Add Tailwind classes as needed */
  </style>
`;
