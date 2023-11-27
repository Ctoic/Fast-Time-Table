let currentId = 0;
const pairings = [];

const courses = [
    { id: 101, name: 'Software Engineering', section: 'CS-A', color: '#FFD700', department: 'Computer Science' },
    { id: 102, name: 'Information Security', section: 'CS-B', color: '#7FFFD4', department: 'Computer Science' },
    { id: 103, name: 'DevOps', section: 'CS-C', color: '#4456D4', department: 'Computer Science' },
    { id: 104, name: 'Principles of Programming Languages', section: 'CS-D', color: '#3FAFD4', department: 'Computer Science' },
    { id: 105, name: 'System Modeling & Design', section: 'CS-E', color: '#9CBFD4', department: 'Computer Science' },
    { id: 106, name: 'Computer Graphics', section: 'CS-F', color: '#FF8C00', department: 'Computer Science' },
    { id: 107, name: 'Artificial Intelligence', section: 'CS-G', color: '#6B8E23', department: 'Computer Science' },
    { id: 108, name: 'Database Systems', section: 'CS-H', color: '#4682B4', department: 'Computer Science' },
    { id: 109, name: 'Network Security', section: 'CS-I', color: '#D2691E', department: 'Computer Science' },
    { id: 110, name: 'Machine Learning', section: 'CS-J', color: '#2E8B57', department: 'Computer Science' },
    { id: 111, name: 'Data Structures', section: 'CS-K', color: '#C71585', department: 'Computer Science' },
    { id: 112, name: 'Algorithm Analysis', section: 'CS-L', color: '#FF4500', department: 'Computer Science' },
    { id: 113, name: 'Operating Systems', section: 'CS-M', color: '#7B68EE', department: 'Computer Science' },
    { id: 114, name: 'Human-Computer Interaction', section: 'CS-N', color: '#DA70D6', department: 'Computer Science' },
    { id: 115, name: 'Web Development', section: 'CS-O', color: '#8FBC8F', department: 'Computer Science' },
    { id: 116, name: 'Mobile App Development', section: 'CS-P', color: '#4169E1', department: 'Computer Science' },
    { id: 117, name: 'Cloud Computing', section: 'CS-Q', color: '#FA8072', department: 'Computer Science' },
    { id: 118, name: 'Cybersecurity Fundamentals', section: 'CS-R', color: '#98FB98', department: 'Computer Science' },
    { id: 119, name: 'Quantum Computing', section: 'CS-S', color: '#DDA0DD', department: 'Computer Science' },
    { id: 120, name: 'Virtual Reality', section: 'CS-T', color: '#00CED1', department: 'Computer Science' }
];


const instructors = [
    { id: 1, name: 'Dr. Ejaz', department: 'Computer Science', officeNo: 'B-101' },
    { id: 2, name: 'Dr. Rehman', department: 'Computer Science', officeNo: 'B-102' },
    { id: 3, name: 'Dr. Williams', department: 'Computer Science', officeNo: 'B-103' },
    { id: 4, name: 'Dr. Brown', department: 'Computer Science', officeNo: 'B-104' },
    { id: 5, name: 'Dr. Jones', department: 'Computer Science', officeNo: 'B-105' },
    { id: 6, name: 'Dr. Taylor', department: 'Computer Science', officeNo: 'B-106' },
    { id: 7, name: 'Dr. Lee', department: 'Computer Science', officeNo: 'B-107' },
    { id: 8, name: 'Dr. Walker', department: 'Computer Science', officeNo: 'B-108' },
    { id: 9, name: 'Dr. Hall', department: 'Computer Science', officeNo: 'B-109' },
    { id: 10, name: 'Dr. Young', department: 'Computer Science', officeNo: 'B-110' },
    { id: 11, name: 'Dr. Hernandez', department: 'Computer Science', officeNo: 'B-111' },
    { id: 12, name: 'Dr. King', department: 'Computer Science', officeNo: 'B-112' },
    { id: 13, name: 'Dr. Wright', department: 'Computer Science', officeNo: 'B-113' },
    { id: 14, name: 'Dr. Lopez', department: 'Computer Science', officeNo: 'B-114' },
    { id: 15, name: 'Dr. Hill', department: 'Computer Science', officeNo: 'B-115' },
    { id: 16, name: 'Dr. Scott', department: 'Computer Science', officeNo: 'B-116' },
    { id: 17, name: 'Dr. Green', department: 'Computer Science', officeNo: 'B-117' },
    { id: 18, name: 'Dr. Adams', department: 'Computer Science', officeNo: 'B-118' },
    { id: 19, name: 'Dr. Baker', department: 'Computer Science', officeNo: 'B-119' },
    { id: 20, name: 'Dr. Gonzalez', department: 'Computer Science', officeNo: 'B-120' }
];


window.onload = function() {
    populateDropdown('courses', courses, 'name');
    populateDropdown('instructors', instructors, 'name');
};

function populateDropdown(dropdownId, items, itemName) {
    const select = document.getElementById(dropdownId);
    items.forEach(item => {
        let option = document.createElement('option');
        option.value = item.id;
        option.textContent = item[itemName];
        select.appendChild(option);
    });
}



// Existing functions...

function pairCourseAndInstructor() {
    const selectedCourseId = document.getElementById('courses').value;
    const selectedInstructorId = document.getElementById('instructors').value;

    const course = courses.find(course => course.id == selectedCourseId);
    const instructor = instructors.find(instructor => instructor.id == selectedInstructorId);

    currentId++;
    const pairing = {
        id: currentId,
        courseName: course.name,
        instructorName: instructor.name
    };

    pairings.push(pairing);
    displayPairings();
}

function displayPairings() {
    const table = document.getElementById('pairingTable');
    table.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Course</th>
            <th>Instructor</th>
            <th>Action</th>
        </tr>
    `; // Reset table header

    pairings.forEach(pairing => {
        let row = table.insertRow();
        row.innerHTML = `
            <td>${pairing.id}</td>
            <td>${pairing.courseName}</td>
            <td>${pairing.instructorName}</td>
            <td><button onclick="removePairing(${pairing.id})">Remove</button></td>
        `;
    });
}

function removePairing(id) {
    const index = pairings.findIndex(pairing => pairing.id === id);
    if (index !== -1) {
        pairings.splice(index, 1);
        displayPairings();
    }
}

