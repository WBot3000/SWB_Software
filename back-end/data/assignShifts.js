// Define a new schema for student unavailability times
const StudentUnavailabilitySchema = new Schema({
    student_username: { type: String, required: true }, // the unique identifier for the student
    day: { type: Number, required: true }, // 0 for Monday, 1 for Tuesday, 2 for Wednesday, etc.
    start_time: { type: Date, required: true }, // the start time of the unavailability period
    end_time: { type: Date, required: true }, // the end time of the unavailability period
  }, { timestamps: true });
  
  // Define a new schema for assigned shifts to students
  const AssignedShiftSchema = new Schema({
    student_username: { type: String, required: true }, // the unique identifier for the student
    shift_id: { type: Schema.Types.ObjectId, ref: 'Shift', required: true }, // the ID of the shift
    start_time: { type: Date, required: true }, // the start time of the assigned shift
    end_time: { type: Date, required: true }, // the end time of the assigned shift
  }, { timestamps: true });
  
  // Define a new schema for weekly assignments
  const WeeklyAssignmentSchema = new Schema({
    manager_username: { type: String, required: true }, // the unique identifier for the manager
    week_start_date: { type: Date, required: true }, // the start date of the week for which the assignments are made
    assignments: [AssignedShiftSchema], // an array of AssignedShiftSchema for each shift assigned to each student
  }, { timestamps: true });
  
  // Define a function to get student unavailability times for a given day
  async function getStudentUnavailabilityTimesForDay(studentUsername, day) {
    const startOfWeek = moment().startOf('week').toDate(); // get the start date of the current week
    const endOfWeek = moment().endOf('week').toDate(); // get the end date of the current week
    const unavailabilityTimes = await StudentUnavailability.find({
      student_username: studentUsername,
      day: day,
      start_time: { $gte: startOfWeek },
      end_time: { $lte: endOfWeek },
    });
    return unavailabilityTimes;
  }
  
  // Define a function to get available shifts for a given day
  async function getAvailableShiftsForDay(day, startTime, endTime) {
    const shifts = await Shift.find({
      day: day,
      start_time: { $gte: startTime },
      end_time: { $lte: endTime },
      is_closed: false,
      is_holiday: false,
    });
    return shifts;
  }
  
  // Define a function to assign a shift to a student
  async function assignShiftToStudent(studentUsername, shiftId, startTime, endTime) {
    const assignedShift = new AssignedShift({
      student_username: studentUsername,
      shift_id: shiftId,
      start_time: startTime,
      end_time: endTime,
    });
    await assignedShift.save();
    return assignedShift;
  }
  
  // Define a function to assign shifts for a given day to available students
  async function assignShiftsForDay(day, startTime, endTime) {
    // Find all available students for the given day and time range
    const availableStudents = await Student.find({
      unavailable: { $not: { $elemMatch: { day, start_time: { $lt: endTime }, end_time: { $gt: startTime } } } }
    });
  
    // Get the number of shifts needed to cover the time range
    const shiftCount = Math.ceil((endTime - startTime) / SHIFT_DURATION);
  
    // Assign shifts to available students
    for (let i = 0; i < shiftCount; i++) {
      // Find the student with the least number of shifts assigned
      const student = await Student.findOne({ _id: { $in: availableStudents.map(s => s._id) } }).sort({ shift_count: 1 });
  
      // Assign the shift to the student
      const shift = new Shift({
        student_id: student._id,
        day,
        start_time: new Date(startTime.getTime() + i * SHIFT_DURATION),
        end_time: new Date(startTime.getTime() + (i + 1) * SHIFT_DURATION)
      });
      await shift.save();
  
      // Update the student's shift count
      student.shift_count++;
      await student.save();
    }
  }
  