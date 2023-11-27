$(document).ready(function() {
    const courses = [
        { id: 101, name: "Software Engineering", instructor: "Dr. Smith", section: "CS-A", color: "#FFD700", department: "Computer Science", link:"course 1"},
        { id: 102, name: "Information Security", instructor: "Dr. Johnson", section: "CS-B", color: "#7FFFD4", department: "Computer Science" },
        { id: 103, name: "DevOps", instructor: "Dr. Williams", section: "CS-C", color: "#4456D4", department: "Computer Science" },
        { id: 104, name: "Principles of Programming Languages", instructor: "Dr. Brown", section: "CS-D", color: "#3FAFD4", department: "Computer Science" },
        { id: 105, name: "System Modeling & Design", instructor: "Dr. Jones", section: "CS-E", color: "#9CBFD4", department: "Computer Science" },
        { id: 106, name: "Computer Graphics", instructor: "Dr. Taylor", section: "CS-F", color: "#FF8C00", department: "Computer Science" },
        { id: 107, name: "Artificial Intelligence", instructor: "Dr. Lee", section: "CS-G", color: "#6B8E23", department: "Computer Science" },
        { id: 108, name: "Database Systems", instructor: "Dr. Walker", section: "CS-H", color: "#4682B4", department: "Computer Science" },
        { id: 109, name: "Network Security", instructor: "Dr. Hall", section: "CS-I", color: "#D2691E", department: "Computer Science" },
        { id: 110, name: "Machine Learning", instructor: "Dr. Young", section: "CS-J", color: "#2E8B57", department: "Computer Science" },
        { id: 111, name: "Data Structures", instructor: "Dr. Hernandez", section: "CS-K", color: "#C71585", department: "Computer Science" },
        { id: 112, name: "Algorithm Analysis", instructor: "Dr. King", section: "CS-L", color: "#FF4500", department: "Computer Science" },
        { id: 113, name: "Operating Systems", instructor: "Dr. Wright", section: "CS-M", color: "#7B68EE", department: "Computer Science" },
        { id: 114, name: "Human-Computer Interaction", instructor: "Dr. Lopez", section: "CS-N", color: "#DA70D6", department: "Computer Science" },
        { id: 115, name: "Web Development", instructor: "Dr. Hill", section: "CS-O", color: "#8FBC8F", department: "Computer Science" },
        { id: 116, name: "Mobile App Development", instructor: "Dr. Scott", section: "CS-P", color: "#4169E1", department: "Computer Science" },
        { id: 117, name: "Cloud Computing", instructor: "Dr. Green", section: "CS-Q", color: "#FA8072", department: "Computer Science" },
        { id: 118, name: "Cybersecurity Fundamentals", instructor: "Dr. Adams", section: "CS-R", color: "#98FB98", department: "Computer Science" },
        { id: 119, name: "Quantum Computing", instructor: "Dr. Baker", section: "CS-S", color: "#DDA0DD", department: "Computer Science" },
        { id: 120, name: "Virtual Reality", instructor: "Dr. Gonzalez", section: "CS-T", color: "#00CED1", department: "Computer Science" }

        // Add more courses as needed
    ];
    courses.forEach(course => {
        $('#coursesList').append(`<div class="course" data-id="${course.id}" data-name="${course.name}" style="background-color: ${course.color};">
        <a style="none" href="studentEnrolled.html">${course.name}</a>
        </div>`);
    });

    $('.course').draggable({
        helper: 'clone',
        revert: "invalid"
    });

    courses.forEach(course => {
        $('#instructorsList').append(`<div class="instructor" data-id="${course.id}" data-name="${course.instructor}" style="background-color: ${course.color};">${course.instructor}</div>`);
    }   );

    $('.instructor').draggable({
        helper: 'clone',
        revert: "invalid"
    });

    courses.forEach(course => {
        $('#sectionsList').append(`<div class="section" data-id="${course.id}" data-name="${course.section}" style="background-color: ${course.color};">${course.section}</div>`);
    }
    );

    $('.section').draggable({
        helper: 'clone',
        revert: "invalid"
    });


    $('#generateTimetable').click(function() {
        const totalRooms = parseInt($('#totalRooms').val()) || 0;
        const classDuration = parseInt($('#classDuration').val()) || 0;
        const breakTime = parseInt($('#breakTime').val()) || 0;
        const totalDays = Math.min(parseInt($('#totalDays').val()) || 0, 7);
        const startTime = $('#startTime').val();
        const endTime = $('#endTime').val();
        generateTimetable(totalRooms, classDuration, breakTime, totalDays, startTime, endTime);

    });
});

function generateTimetable(totalRooms, classDuration, breakTime, totalDays, startTime, endTime) {
    let timetableHtml = '<div class="day-tabs">';
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    for (let day = 0; day < totalDays; day++) {
        timetableHtml += `<span class="day-tab" onclick="switchDay(${day + 1})">${weekdays[day]}</span>`;
    }
    timetableHtml += '</div><div class="timetable-day">';

    for (let day = 1; day <= totalDays; day++) {
        timetableHtml += `<table class="timetable" id="day${day}"><tr><th>Room / Time</th>`;
        let currentHour = parseInt(startTime.split(':')[0]);
        let currentMinute = parseInt(startTime.split(':')[1]);
        const endHour = parseInt(endTime.split(':')[0]);
        const endMinute = parseInt(endTime.split(':')[1]);

        // Headers for class and break times
        
        while (true) {
            let slotEnd = addMinutes(currentHour, currentMinute, classDuration);

            // Check if adding the next class slot would exceed the end time
            if (slotEnd.hour > endHour || (slotEnd.hour === endHour && slotEnd.minute >= endMinute)) {
                break;
            }
            timetableHtml += `<th>${formatTime(currentHour, currentMinute)}-${formatTime(slotEnd.hour, slotEnd.minute)}</th>`;

            // Move current time to the end of the class slot
            currentHour = slotEnd.hour;
            currentMinute = slotEnd.minute;

            let breakEnd = addMinutes(currentHour, currentMinute, breakTime);
            // Check if adding the next break would exceed the end time
            if (breakEnd.hour > endHour || (breakEnd.hour === endHour && breakEnd.minute >= endMinute)) {
                break;
            }
            timetableHtml += `<th class="break-time">${formatTime(currentHour, currentMinute)}-${formatTime(breakEnd.hour, breakEnd.minute)}</th>`;

            // Move current time to the end of the break
            currentHour = breakEnd.hour;
            currentMinute = breakEnd.minute;
        }

        timetableHtml += '</tr>';

        // Rows for class and break times
        for (let room = 1; room <= totalRooms; room++) {
            timetableHtml += `<tr><td>Room ${room}</td>`;
            currentHour = parseInt(startTime.split(':')[0]);
            currentMinute = parseInt(startTime.split(':')[1]);
        
            while (true) {
                let slotEnd = addMinutes(currentHour, currentMinute, classDuration);
        
                // Check if adding the next class slot would exceed the end time
                if (slotEnd.hour > endHour || (slotEnd.hour === endHour && slotEnd.minute >= endMinute)) {
                    break;
                }
                timetableHtml += `<td class="time-slot" data-time="${formatTime(currentHour, currentMinute)}-${formatTime(slotEnd.hour, slotEnd.minute)}"></td>`;
                
                currentHour = slotEnd.hour;
                currentMinute = slotEnd.minute;
        
                let breakEnd = addMinutes(currentHour, currentMinute, breakTime);
        
                // Check if adding the next break would exceed the end time
                if (breakEnd.hour > endHour || (breakEnd.hour === endHour && breakEnd.minute >= endMinute)) {
                    // Do not add a break slot if it exceeds end time
                    break;
                }
                timetableHtml += `<td class="break-time-slot" style="background-color: #cccccc;"></td>`;
        
                currentHour = breakEnd.hour;
                currentMinute = breakEnd.minute;

            }
            timetableHtml += '</tr>';
        }
        
        timetableHtml += '</table>';
    }

    $('#timetableContainer').html(timetableHtml);
    setupDroppables();
    switchDay(1);
}

function setupDroppables() {
    $('.timetable .time-slot').not('.break-time').droppable({
        accept: ".course, .dropped-course",
        drop: function(event, ui) {
            const courseId = $(ui.draggable).data('id');
            const courseName = $(ui.draggable).data('name') || $(ui.draggable).text();
            const courseColor = $(ui.draggable).css('background-color');
            const timeSlot = $(this).data('time');
            const dayId = $(this).closest('.timetable').attr('id');
            const isClone = $(ui.draggable).hasClass('course');

            if (isClone) {
                if (!isCourseScheduled(courseId, timeSlot, dayId)) {
                    $(this).append(`<div class="dropped-course" data-id="${courseId}" style="background-color: ${courseColor};">${courseName}</div>`);
                } else {
                    alert(`Clash detected: ${courseName} is already scheduled in this time slot.`);
                }
            } else {
                const currentSlot = $(ui.draggable).parent();
                if (this !== currentSlot[0] && !isCourseScheduled(courseId, timeSlot, dayId)) {
                    $(this).append(ui.draggable);
                } else {
                    alert(`Clash detected: Cannot move ${courseName} to an occupied time slot.`);
                }
            }

            $(this).find('.dropped-course').last().draggable({
                helper: 'clone',
                revert: "invalid"
            });
        }
    });

    $('#coursesList').droppable({
        accept: ".dropped-course",
        drop: function(event, ui) {
            ui.draggable.remove();
        }
        
    });
}

function addMinutes(hour, minute, minsToAdd) {
    minute += minsToAdd;
    hour += Math.floor(minute / 60);
    minute %= 60;
    return { hour, minute };
}

function formatTime(hour, minute) {
    let period = "AM";
    if (hour >= 12) {
        period = "PM";
        if (hour > 12) hour -= 12;
    }
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period}`;
}

function switchDay(day) {
    $('.timetable').hide();
    $(`#day${day}`).show();
}

function isCourseScheduled(courseId, timeSlot, dayId) {
    let isScheduled = false;
    $(`#${dayId} .time-slot[data-time="${timeSlot}"]`).each(function() {
        if ($(this).find(`.dropped-course[data-id="${courseId}"]`).length > 0) {
            isScheduled = true;
            return false; // Break the loop
        }
    });
    return isScheduled;
}


