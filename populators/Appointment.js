import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import Appointment from '../src/schemas/Appointment.js'; // Adjust path if needed

const MONGO_URI = process.env.MONGOURL;

const connectToDatabase = async () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log('Connected to MongoDB successfully');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error.message);
    });
};

const today = new Date();
const yesterday = new Date(today.setDate(today.getDate() - 1));
const tomorrow = new Date(today.setDate(today.getDate() + 1));
const inTwoDays = new Date(today.setDate(today.getDate() + 2));
const inThreeDays = new Date(today.setDate(today.getDate() + 3));
const inFourDays = new Date(today.setDate(today.getDate() + 4));

const doctor1 = {
  id: uuidv4(),
  specialty: 'family_medicine',
}

const doctor2 = {
  id: uuidv4(),
  specialty: 'dermatology',
}

const doctor3 = {
  id: uuidv4(),
  specialty: 'gynecology'
}

const doctor4 = {
  id: uuidv4(),
  specialty: 'pediatrics'
}

const patient1 = uuidv4();

const patient2 = uuidv4();

const patient3 = uuidv4();

const patient4 = uuidv4();

const clinic1 = uuidv4();

const clinic2 = uuidv4();

const sampleAppointments = [
  {
    patientId: patient1,
    clinicId: clinic1,
    doctorId: doctor1.id, // family medicine doctor
    specialty: doctor1.specialty,
    type: 'consult',
    appointmentDate: new Date(yesterday.setHours(10, 15, 0, 0)), // yesterday at 10:15
    duration: 30,
    status: 'completed',
  },
  {
    patientId: patient2,
    clinicId: clinic2,
    doctorId: doctor2.id, // dermatology doctor
    specialty: doctor2.specialty,
    type: 'consult',
    appointmentDate: new Date(yesterday.setHours(14, 30, 0, 0)), // yesterday at 14:30
    duration: 45,
    status: 'completed',
  },
  {
    patientId: patient3,
    clinicId: clinic1,
    doctorId: doctor3.id, // gynecology doctor
    specialty: doctor3.specialty,
    type: 'follow_up',
    appointmentDate: new Date(today.setHours(8, 45, 0, 0)), // today at 8:45
    duration: 30,
    status: 'pending',
  },
  {
    patientId: patient4,
    clinicId: clinic1,
    doctorId: doctor2.id, // dermatology doctor
    specialty: doctor2.specialty,
    type: 'consult',
    appointmentDate: new Date(today.setHours(18, 30, 0, 0)), // today at 18:30
    duration: 30,
    status: 'pending',
  },
  {
    patientId: patient1,
    clinicId: clinic2,
    doctorId: doctor3.id, // gynecology doctor
    specialty: doctor3.specialty,
    type: 'revision',
    appointmentDate: new Date(tomorrow.setHours(10, 0, 0, 0)), // tomorrow at 10:00
    duration: 30,
    status: 'pending',
  },
  {
    patientId: patient2,
    clinicId: clinic2,
    doctorId: doctor4.id, // pediatrics doctor
    specialty: doctor4.specialty,
    type: 'consult',
    appointmentDate: new Date(tomorrow.setHours(12, 15, 0, 0)), // tomorrow at 12:15
    duration: 30,
    status: 'pending',
  },
  {
    patientId: patient3,
    clinicId: clinic1,
    doctorId: doctor1.id, // family medicine doctor
    specialty: doctor1.specialty,
    type: 'follow_up',
    appointmentDate: new Date(inTwoDays.setHours(9, 30, 0, 0)), // in two days at 9:30
    duration: 30,
    status: 'pending',
  },
  {
    patientId: patient4,
    clinicId: clinic1,
    doctorId: doctor4.id, // pediatrics doctor
    specialty: doctor4.specialty,
    type: 'revision',
    appointmentDate: new Date(inTwoDays.setHours(10, 30, 0, 0)), // in two days at 10:30
    duration: 30,
    status: 'pending',
  },
  {
    patientId: patient1,
    clinicId: clinic2,
    doctorId: doctor2.id, // dermatology doctor
    specialty: doctor2.specialty,
    type: 'consult',
    appointmentDate: new Date(inThreeDays.setHours(11, 0, 0, 0)), // in three days at 11:00
    duration: 45,
    status: 'pending',
  },
  {
    patientId: patient2,
    clinicId: clinic2,
    doctorId: doctor3.id, // gynecology doctor
    specialty: doctor3.specialty,
    type: 'follow_up',
    appointmentDate: new Date(inThreeDays.setHours(13, 30, 0, 0)), // in three days at 13:30
    duration: 30,
    status: 'pending',
  },
  {
    patientId: patient3,
    clinicId: clinic1,
    doctorId: doctor1.id, // family medicine doctor
    specialty: doctor1.specialty,
    type: 'revision',
    appointmentDate: new Date(inThreeDays.setHours(15, 0, 0, 0)), // in three days at 15:00
    duration: 30,
    status: 'pending',
  },
  {
    patientId: patient4,
    clinicId: clinic1,
    doctorId: doctor2.id, // dermatology doctor
    specialty: doctor2.specialty,
    type: 'consult',
    appointmentDate: new Date(inFourDays.setHours(14, 0, 0, 0)), // in four days at 14:00
    duration: 30,
    status: 'pending',
  },
  {
    patientId: patient1,
    clinicId: clinic2,
    doctorId: doctor4.id, // pediatrics doctor
    specialty: doctor4.specialty,
    type: 'revision',
    appointmentDate: new Date(inFourDays.setHours(16, 45, 0, 0)), // in four days at 16:45
    duration: 45,
    status: 'pending',
  }
];

async function populateAppointments() {
  try {
    // delete any existing appointments that match patientId and doctorId
    await Appointment.deleteMany({
      patientId: { $in: sampleAppointments.map((appt) => appt.patientId) },
      doctorId: { $in: sampleAppointments.map((appt) => appt.doctorId) },
    });

    // save each sample appointment
    for (const apptData of sampleAppointments) {
      const appointment = new Appointment(apptData);
      await appointment.save();
      console.log(`Appointment for ${appointment.specialty} created successfully`);
    }

    console.log('All sample appointments have been created');
  } catch (error) {
    console.error('Error populating appointments:', error);
  } finally {
    mongoose.disconnect();
  }
}

// Run the script
(async () => {
  await connectToDatabase();
  await populateAppointments();
})();
