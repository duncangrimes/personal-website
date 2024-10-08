import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function populateUniversities(universities) {
  for (const university of universities) {
    await prisma.university.create({
      data: { name: university.name, state: university.state },
    });
  }
}

async function deleteUniversities() {
  await prisma.university.deleteMany();
  console.log('All universities have been deleted');
}

async function populateSubjects(subjects) {;
  
    for (const subject of subjects) {
      await prisma.subject.create({
        data: {name: subject},
      });
    }
  }
  
async function deleteSubjects(subjects) {
  await prisma.subject.deleteMany();
  console.log('All subjects have been deleted');
}

async function populateSports(sports) {
  for (const sport of sports) {
    await prisma.sport.create({
      data: { name: sport },
    });
  }
}

async function deleteSports(sports) {
  await prisma.sport.deleteMany();
  console.log('All sports have been deleted');
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

async function deleteLocations() {
  await prisma.location.deleteMany();
  console.log('All locations have been deleted');
}
  
  async function deleteUsers() {
    await prisma.user.deleteMany();
    await prisma.athlete.deleteMany();
    console.log('All users have been deleted');
  }
  
  async function addUsersAndAthletes(femaleFirstNames, maleFirstNames, lastNames, maleProfilePics, femaleProfilePics, N) {
    const subjects = await prisma.subject.findMany();
    const universities = await prisma.university.findMany();
    const sports = await prisma.sport.findMany();
    const locations = await prisma.location.findMany();

    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const linkedIn = process.env.LINKEDIN_URL;
    const resume = process.env.RESUME_URL;
  
    if (! linkedIn || ! resume) throw new Error('Please provide a LINKEDIN_URL and RESUME_URL environment variable');

    if (subjects.length === 0) {
      throw new Error('Please ensure there are subjects in the database before seeding athletes.');
    }
  
    for (let i = 0; i < N; i++) {

      const isFemale = i < N / 2; // First half will be female, second half male
      const firstName = isFemale
      ? femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)]
      : maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)];

      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

      const profilePic = isFemale
      ? femaleProfilePics[Math.floor(Math.random() * femaleProfilePics.length)]
      : maleProfilePics[Math.floor(Math.random() * maleProfilePics.length)];
    
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
      const sport = isFemale 
      ? sports.filter(s => s.name !== 'Football')[Math.floor(Math.random() * sports.filter(s => s.name !== 'Football').length)]
      : sports[Math.floor(Math.random() * sports.length)];

      const hometown = locations[Math.floor(Math.random() * locations.length)];
      const desiredLocations = [];

      while (desiredLocations.length < 3) {
        const randomLocation = locations[Math.floor(Math.random() * locations.length)];
        if (!desiredLocations.includes(randomLocation) && randomLocation.id !== hometown.id) {
          desiredLocations.push(randomLocation);
        }
      }

      const gpa = (Math.random() + 3).toFixed(2);
      const gradYear = (Math.floor(Math.random() * (2025 - 2020 + 1)) + 2020).toString();; 
      const gradMonth = months[Math.floor(Math.random() * months.length)];

      await prisma.user.create({
        data: {
          firstName,
          lastName,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
          image: profilePic,
          athlete: {
            create: {
              university: { connect: { id: university.id } },
              sport: { connect: { id: sport.id } },
              gradYear: gradYear,
              gradMonth: gradMonth,
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
              linkedIn,
              resume,
            },
          },
        },
      });
    }
  }

  async function main() {
    
    const subjects = [
      'Computer Science',
      'Biology',
      'Mathematics',
      'Physics',
      'Psychology',
      'Political Science',
      'Sociology',
      'Economics',
      'English',
      'History',
      ]
      const universities = [
        { name: 'Vanderbilt University', state: 'MA' },
        { name: 'Stanford University', state: 'CA' },
        { name: 'MIT', state: 'MA' },
        { name: 'University of Notre Dame', state: 'MA' },
        { name: 'University of Miami', state: 'FL' },
        { name: 'Indiana University', state: 'IN' },
        { name: 'University of Wisconsin-Madison', state: 'WI' },
        { name: 'University of Southern California', state: 'CA' },
        { name: 'University of Pennsylvania', state: 'PA' },
        { name: 'Duke University', state: 'NC' },
        { name: 'University of Michigan', state: 'MI' },
        { name: 'Northwestern University', state: 'IL' },
      ];
    const locations = [
      { city: 'New York', state: 'NY' },
      { city: 'Los Angeles', state: 'CA' },
      { city: 'Chicago', state: 'IL' },
      { city: 'Dallas', state: 'TX' },
      { city: 'Phoenix', state: 'AZ' },
      { city: 'Philadelphia', state: 'PA' },
      { city: 'Nashville', state: 'TN' },
      { city: 'San Francisco', state: 'CA' }
    ]

    const sports = [
      'Basketball',
      'Soccer',
      'Volleyball',
      'Baseball',
      'Football',
      'Tennis',
      'Track and Field',
      'Swimming',
    ];

    const femaleFirstNames = [
      "Emma", "Olivia", "Ava", "Sophia", "Isabella", 
      "Mia", "Charlotte", "Amelia", "Harper", "Evelyn", 
      "Abigail", "Emily", "Ella", "Elizabeth", "Sofia", 
      "Avery", "Scarlett", "Madison", "Lily", "Victoria"
    ];
    
    const maleFirstNames = [
      "Liam", "Noah", "Oliver", "Elijah", "James", 
      "Will", "Ben", "Lucas", "Henry", "Alex", 
      "Michael", "Jack", "Tom", "Ethan", "Jacob", 
      "Aiden", "Matt", "Sam", "David", "Joseph"
    ];
    
    const lastNames = [
      "Smith", "Johnson", "Williams", "Jones", "Brown", 
      "Davis", "Miller", "Wilson", "Moore", "Taylor", 
      "Anderson", "Thomas", "Jackson", "White", "Harris", 
      "Martin", "Thompson", "Garcia", "Martinez", "Robinson"
    ];

    const femaleProfilePics = [
      'https://isieuvdfysya85mr.public.blob.vercel-storage.com/images/female-profile-pics/fp1-yjDd63ZEmERG93on5X4q9n1HkkPrGq.jpg',
      'https://isieuvdfysya85mr.public.blob.vercel-storage.com/images/female-profile-pics/fp2-6xqchVQM6iJ3WD1h7xRFBUdGXVI0uw.jpg',
      'https://isieuvdfysya85mr.public.blob.vercel-storage.com/images/female-profile-pics/fp3-nDVHvCxTtDtOrCj73Do4m7CH7W4mVz.jpg',
      'https://isieuvdfysya85mr.public.blob.vercel-storage.com/images/female-profile-pics/fp4-mPJTUZZwvMudgP9403q9IkdxA0y9Qt.jpg'
    ]

    const maleProfilePics = [
      'https://isieuvdfysya85mr.public.blob.vercel-storage.com/images/male-profile-pics/mp1-gCOhRHAKregDLZ387p8L2Ua0J7xIQ4.jpg',
      'https://isieuvdfysya85mr.public.blob.vercel-storage.com/images/male-profile-pics/mp2-BlNYOJvx8LorLCq10OsguTqFNwbahm.jpg',
      'https://isieuvdfysya85mr.public.blob.vercel-storage.com/images/male-profile-pics/mp3-J693hkHiYzCRSGi6k7Vx61uEwVZbtF.jpg',
      'https://isieuvdfysya85mr.public.blob.vercel-storage.com/images/male-profile-pics/mp4-DHCiX5nxk9axvr6EkxMZlf6TZFCEIY.jpg'
    ]

    await deleteSports();
    await deleteUniversities()
    await deleteLocations();
    await deleteSubjects();
    await deleteUsers();
  
    await populateUniversities(universities);
    await populateSports(sports);
    await populateLocations(locations);
    await populateSubjects(subjects);
    await addUsersAndAthletes(femaleFirstNames, maleFirstNames, lastNames, maleProfilePics, femaleProfilePics, 20);
  }
main();