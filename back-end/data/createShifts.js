const { MongoClient, ObjectId } = require('mongodb');

// Connect to the MongoDB server
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useUnifiedTopology: true });
client.connect(err => {
  if (err) {
    console.error('Failed to connect to the database server');
    return;
  }
  
  // Get a reference to the schedules collection
  const db = client.db('student-worker-program');
  const schedules = db.collection('schedules');

  // Define the Shift schema
  const ShiftSchema = {
    manager_username: { type: 'string', required: true },
    day: { type: 'number', required: true }, // 0 for Monday, 1 for Tuesday, 2 for Wednesday, etc.
    start_time: { type: 'date', required: true }, // the start time of the shift
    end_time: { type: 'date', required: true }, // the end time of the shift
    is_closed: { type: 'boolean', default: false }, // whether the building is closed on this day
    is_holiday: { type: 'boolean', default: false }, // whether it's a holiday
  };

  // Define the Schedule schema
  const ScheduleSchema = {
    manager_username: { type: 'string', required: true }, // the unique identifier for the manager
    start_date: { type: 'date', required: true }, // the start date of the schedule
    end_date: { type: 'date', required: true }, // the end date of the schedule
    shifts: { type: 'array', items: ShiftSchema }, // an array of ShiftSchema for each day
  };

  async function createShift(managerUsername, day, start_time, end_time,) {
    const shift = {
      manager_username: managerUsername,
      day: day,
      start_time: start_time,
      end_time: end_time,
    };
  
    const db = await MongoClient.connect(url);
    const collection = db.collection('shifts');
  
    const result = await collection.insertOne(shift);
    db.close();
  
    return result.insertedId;
  }


  async function createSchedule(managerUsername, startDate, endDate, shifts) {
    const schedule = {
      manager_username: managerUsername,
      start_date: startDate,
      end_date: endDate,
      shifts: shifts,
    };
  
    const collection = await db.collection('schedules');
    const result = await collection.insertOne(schedule);
  
    return result;
  }
  


  async function createWeeklySchedule(managerUsername, startDate) {
    const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000); // schedule ends a week from start date
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
    // create shifts for each day of the week
    for (let i = 0; i < daysOfWeek.length; i++) {
      const day = daysOfWeek[i];
      const start = new Date(`2023-04-10T08:00:00.000Z`); // 8:00am
      const end = new Date(`2023-04-10T16:00:00.000Z`); // 4:00pm
  
      await createShift(managerUsername, day, start, end);
    }
  
    // create a schedule for the week
    await createSchedule(managerUsername, startDate, endDate);
  }

  
  async function createYearlySchedule(manager_username, year, start_date, start_time) {
    const scheduleData = {
      manager_username,
      start_date,
      end_date: new Date(year + 1, 5, 30), // June 30th of next year
      shifts: []
    };
    const startDateObj = new Date(start_date);
    const startTimeObj = new Date(start_time);
    for (let day = 0; day < 7; day++) { // 0 for Monday, 1 for Tuesday, 2 for Wednesday, etc.
      const shiftData = {
        manager_username,
        day,
        start_time: new Date(startDateObj.getFullYear(), startDateObj.getMonth(), startDateObj.getDate(), startTimeObj.getHours(), startTimeObj.getMinutes(), startTimeObj.getSeconds()),
        end_time: new Date(startDateObj.getFullYear(), startDateObj.getMonth(), startDateObj.getDate(), startTimeObj.getHours() + 8, startTimeObj.getMinutes(), startTimeObj.getSeconds()), // shift is 8 hours long
        is_closed: false,
        is_holiday: false
      };
      startDateObj.setDate(startDateObj.getDate() + 1); // move to the next day
      scheduleData.shifts.push(shiftData);
    }
    return createSchedule(scheduleData);
  }


});
