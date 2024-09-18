import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function populateUniversities(universities) {
  for (const university of universities) {
    await prisma.university.create({
      data: { name: university.name, state: university.state },
    });
  }
}

async function deleteUniversities(universities) {
  for (const university of universities) {
    try {
      await prisma.university.delete({
        where:
          {name: university.name},
      });
    } catch (e) {
      console.error(`Failed to delete university ${university}: ${e.message}`);
    }
  }
}

async function populateSubjects(subjects) {;
  
    for (const subject of subjects) {
      await prisma.subject.create({
        data: {name: subject},
      });
    }
  }
  
async function deleteSubjects(subjects) {
  for (const subject of subjects) {
    try {
      await prisma.subject.delete({
        where: {
          name: subject,
        },
      });
    } catch (e) {
      console.error(`Failed to delete subject ${subject}: ${e.message}`);
    }
  }
}

async function populateSports(sports) {
  for (const sport of sports) {
    await prisma.sport.create({
      data: { name: sport },
    });
  }
}

async function deleteSports(sports) {
  for (const sport of sports) {
    try {
      await prisma.sport.delete({
        where: {
          name: sport,
        },
      });
    } catch (e) {
      console.error(`Failed to delete sport ${sport}: ${e.message}`);
    }
  }
}

async function populateLocations(locations) {
  for (const location of locations) {
    try {
      await prisma.location.create({
        data: {
          city: location.city,
          state: location.state,
          country: 'US'}
      });
    }
    catch (e) {
    console.error(`Failed to create location ${location}: ${e.message}`);
  }
}}

async function deleteLocations(locations) {
  for (const location of locations) {
    try {
      await prisma.location.delete({
        where: {
          city_state_country: {
            city: location.city,
            state: location.state,
            country: 'US',
          }
        },
      });
    } catch (e) {
      console.error(`Failed to delete location ${location}: ${e.message}`);
    }
  }
}
  
  async function deleteUsers(athletes) {
    for (const athlete of athletes) {
      try {
        await prisma.user.delete({
          where: {
            email: athlete.email,
          },
        });
      } catch (e) {
        console.error(`Failed to delete user ${athlete.email}: ${e.message}`);
      }
    }
  }
  
  async function addUsersAndAthletes(athletes) {
    const subjects = await prisma.subject.findMany();
    const universities = await prisma.university.findMany();
    const sports = await prisma.sport.findMany();
    const locations = await prisma.location.findMany();
  
    if (subjects.length === 0) {
      throw new Error('Please ensure there are subjects in the database before seeding athletes.');
    }
  
    for (const athlete of athletes) {
      const majorSubject = subjects[Math.floor(Math.random() * subjects.length)];
      let secondMajorSubject = null;
      if (Math.random() < 0.33) {
        do {
          secondMajorSubject = subjects[Math.floor(Math.random() * subjects.length)];
        } while (secondMajorSubject.id === majorSubject.id);
      }

      const minorSubjects = [];
      const numMinors = Math.floor(Math.random() * 3);
      for (let i = 0; i < numMinors; i++) {
        let minorSubject;
        do {
          minorSubject = subjects[Math.floor(Math.random() * subjects.length)];
        } while (minorSubjects.includes(minorSubject) || minorSubject.id === majorSubject.id || (secondMajorSubject && minorSubject.id === secondMajorSubject.id));
        minorSubjects.push(minorSubject);
      }

      const university = universities[Math.floor(Math.random() * universities.length)];
      const sport = sports[Math.floor(Math.random() * sports.length)];
      const hometown = locations[Math.floor(Math.random() * locations.length)];
      const desiredLocations = [];

      while (desiredLocations.length < 3) {
        const randomLocation = locations[Math.floor(Math.random() * locations.length)];
        if (!desiredLocations.includes(randomLocation) && randomLocation.id !== hometown.id) {
          desiredLocations.push(randomLocation);
        }
      }

      const gpa = Math.random() < 0.5 ? null : (Math.random() * 3 + 1).toFixed(2);

      await prisma.user.create({
        data: {
          firstName: athlete.firstName,
          lastName: athlete.lastName,
          email: athlete.email,
          image: '/rostr/rostr-athlete-profile.jpeg',
          athlete: {
            create: {
              university: { connect: { id: university.id } },
              sport: { connect: { id: sport.id } },
              gradYear: athlete.gradYear,
              gradMonth: athlete.gradMonth,
              gpa: gpa ? parseFloat(gpa) : null,
              majors: {
                create: [
                  {
                    subject: {
                      connect: { id: majorSubject.id },
                    },
                  },
                  ...(secondMajorSubject ? [{
                    subject: {
                      connect: { id: secondMajorSubject.id },
                    },
                  }] : []),
                ],
              },
              minors: {
                create: minorSubjects.map(subject => ({
                  subject: { connect: { id: subject.id } },
                })),
              },
              hometown: {
                create: {
                  location: { connect: { id: hometown.id } },
                },
              },
              desiredLocations: {
                create: desiredLocations.map(location => ({
                  location: { connect: { id: location.id } },
                })),
              },
            ...(athlete.resume && { resume: athlete.resume }),
            ...(athlete.linkedIn && { linkedIn: athlete.linkedIn }),
            },
          },
        },
      });
    }
  }

  async function main() {
    const athletes = [
      { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', gradYear: '2024', gradMonth: 'May', resume: 'https://57eifsubqcf2mqap.public.blob.vercel-storage.com/rostr_resume-va0VeCrDGBjBDk9nZHNtPvZsG1L6zJ.pdf', linkedIn: 'https://example.com/linkedin/john' },
      { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', gradYear: '2023', gradMonth: 'June', resume: 'https://57eifsubqcf2mqap.public.blob.vercel-storage.com/rostr_resume-va0VeCrDGBjBDk9nZHNtPvZsG1L6zJ.pdf' },
      { firstName: 'Mike', lastName: 'Johnson', email: 'mike.johnson@example.com', gradYear: '2022', gradMonth: 'July', linkedIn: 'https://example.com/linkedin/mike' },
      { firstName: 'Emily', lastName: 'Davis', email: 'emily.davis@example.com', gradYear: '2025', gradMonth: 'August' },
      { firstName: 'Chris', lastName: 'Brown', email: 'chris.brown@example.com', gradYear: '2021', gradMonth: 'September', resume: 'https://57eifsubqcf2mqap.public.blob.vercel-storage.com/rostr_resume-va0VeCrDGBjBDk9nZHNtPvZsG1L6zJ.pdf' },
      { firstName: 'Amanda', lastName: 'Williams', email: 'amanda.williams@example.com', gradYear: '2026', gradMonth: 'October', linkedIn: 'https://example.com/linkedin/amanda' },
      { firstName: 'David', lastName: 'Jones', email: 'david.jones@example.com', gradYear: '2023', gradMonth: 'November' },
      { firstName: 'Sarah', lastName: 'Miller', email: 'sarah.miller@example.com', gradYear: '2024', gradMonth: 'December', resume: 'https://57eifsubqcf2mqap.public.blob.vercel-storage.com/rostr_resume-va0VeCrDGBjBDk9nZHNtPvZsG1L6zJ.pdf', linkedIn: 'https://example.com/linkedin/sarah' },
      { firstName: 'James', lastName: 'Wilson', email: 'james.wilson@example.com', gradYear: '2022', gradMonth: 'January', linkedIn: 'https://example.com/linkedin/james' },
      { firstName: 'Laura', lastName: 'Moore', email: 'laura.moore@example.com', gradYear: '2025', gradMonth: 'February' },
      { firstName: 'Robert', lastName: 'Taylor', email: 'robert.taylor@example.com', gradYear: '2024', gradMonth: 'March', resume: 'https://57eifsubqcf2mqap.public.blob.vercel-storage.com/rostr_resume-va0VeCrDGBjBDk9nZHNtPvZsG1L6zJ.pdf' },
      { firstName: 'Megan', lastName: 'Anderson', email: 'megan.anderson@example.com', gradYear: '2023', gradMonth: 'April', linkedIn: 'https://example.com/linkedin/megan' },
      { firstName: 'Brian', lastName: 'Thomas', email: 'brian.thomas@example.com', gradYear: '2022', gradMonth: 'May' },
      { firstName: 'Jessica', lastName: 'Jackson', email: 'jessica.jackson@example.com', gradYear: '2025', gradMonth: 'June', resume: 'https://57eifsubqcf2mqap.public.blob.vercel-storage.com/rostr_resume-va0VeCrDGBjBDk9nZHNtPvZsG1L6zJ.pdf', linkedIn: 'https://example.com/linkedin/jessica' },
      { firstName: 'Charles', lastName: 'White', email: 'charles.white@example.com', gradYear: '2021', gradMonth: 'July', linkedIn: 'https://example.com/linkedin/charles' },
      { firstName: 'Hannah', lastName: 'Harris', email: 'hannah.harris@example.com', gradYear: '2026', gradMonth: 'August' },
      { firstName: 'Joshua', lastName: 'Martin', email: 'joshua.martin@example.com', gradYear: '2023', gradMonth: 'September', resume: 'https://57eifsubqcf2mqap.public.blob.vercel-storage.com/rostr_resume-va0VeCrDGBjBDk9nZHNtPvZsG1L6zJ.pdf' },
      { firstName: 'Olivia', lastName: 'Thompson', email: 'olivia.thompson@example.com', gradYear: '2024', gradMonth: 'October', linkedIn: 'https://example.com/linkedin/olivia' },
      { firstName: 'Daniel', lastName: 'Garcia', email: 'daniel.garcia@example.com', gradYear: '2022', gradMonth: 'November' },
      { firstName: 'Sophia', lastName: 'Martinez', email: 'sophia.martinez@example.com', gradYear: '2025', gradMonth: 'December', resume: 'https://57eifsubqcf2mqap.public.blob.vercel-storage.com/rostr_resume-va0VeCrDGBjBDk9nZHNtPvZsG1L6zJ.pdf' },
      { firstName: 'Ethan', lastName: 'Robinson', email: 'ethan.robinson@example.com', gradYear: '2024', gradMonth: 'January', resume: 'https://57eifsubqcf2mqap.public.blob.vercel-storage.com/rostr_resume-va0VeCrDGBjBDk9nZHNtPvZsG1L6zJ.pdf', linkedIn: 'https://example.com/linkedin/ethan' },
      { firstName: 'Isabella', lastName: 'Clark', email: 'isabella.clark@example.com', gradYear: '2023', gradMonth: 'February', linkedIn: 'https://example.com/linkedin/isabella' },
      { firstName: 'Mason', lastName: 'Rodriguez', email: 'mason.rodriguez@example.com', gradYear: '2022', gradMonth: 'March' },
      { firstName: 'Ava', lastName: 'Lewis', email: 'ava.lewis@example.com', gradYear: '2025', gradMonth: 'April', resume: 'https://57eifsubqcf2mqap.public.blob.vercel-storage.com/rostr_resume-va0VeCrDGBjBDk9nZHNtPvZsG1L6zJ.pdf' },
      { firstName: 'Logan', lastName: 'Lee', email: 'logan.lee@example.com', gradYear: '2021', gradMonth: 'May', linkedIn: 'https://example.com/linkedin/logan' },
      { firstName: 'Mia', lastName: 'Walker', email: 'mia.walker@example.com', gradYear: '2026', gradMonth: 'June' },
      { firstName: 'Alexander', lastName: 'Hall', email: 'alexander.hall@example.com', gradYear: '2023', gradMonth: 'July', resume: 'https://57eifsubqcf2mqap.public.blob.vercel-storage.com/rostr_resume-va0VeCrDGBjBDk9nZHNtPvZsG1L6zJ.pdf' },
      { firstName: 'Abigail', lastName: 'Allen', email: 'abigail.allen@example.com', gradYear: '2024', gradMonth: 'August' },
      { firstName: 'Benjamin', lastName: 'Young', email: 'benjamin.young@example.com', gradYear: '2022', gradMonth: 'September', linkedIn: 'https://example.com/linkedin/benjamin' },
      { firstName: 'Grace', lastName: 'King', email: 'grace.king@example.com', gradYear: '2025', gradMonth: 'October', resume: 'https://57eifsubqcf2mqap.public.blob.vercel-storage.com/rostr_resume-va0VeCrDGBjBDk9nZHNtPvZsG1L6zJ.pdf' },
    ];
    
    const subjects = [
      'Computer Science',
      'Biology',
      'Mathematics',
      'Physics',
      'Psychology',
      'Political Science',
      'Sociology'
      ]
      const universities = [
        { name: 'Harvard University', state: 'MA' },
        { name: 'Stanford University', state: 'CA' },
        { name: 'MIT', state: 'MA' },
        { name: 'Boston University', state: 'MA' },
        { name: 'University of Miami', state: 'FL' },
        { name: 'University of Illinois', state: 'IL' },
        { name: 'University of Wisconsin-Madison', state: 'WI' }
      ];
    const locations = [
      { city: 'New York', state: 'NY' },
      { city: 'Los Angeles', state: 'CA' },
      { city: 'Chicago', state: 'IL' },
      { city: 'Houston', state: 'TX' },
      { city: 'Phoenix', state: 'AZ' },
      { city: 'Philadelphia', state: 'PA' },
      { city: 'San Antonio', state: 'TX' },
      { city: 'San Diego', state: 'CA' }
    ]

    const sports = [
      'Basketball',
      'Soccer',
      'Baseball',
      'Football',
      'Tennis'
    ];
    await deleteUniversities(universities);
    await deleteSports(sports);
    await deleteLocations(locations);
    await deleteSubjects(subjects);
    await deleteUsers(athletes);
  
    await populateUniversities(universities);
    await populateSports(sports);
    await populateLocations(locations);
    await populateSubjects(subjects);
    await addUsersAndAthletes(athletes);
  }

main();