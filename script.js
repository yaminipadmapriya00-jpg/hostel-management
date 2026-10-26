// ==================================================
// HOSTELHUB
// COLLEGE HOSTEL MANAGEMENT SYSTEM
// ==================================================


// ==================================================
// 1. CREATE 1000 STUDENTS
// ==================================================

const students = [];


for (let i = 1; i <= 1000; i++) {

    const registerNumber =
        "24CSE" +
        String(i).padStart(3, "0");


    const hostelNumber =
        ((i - 1) % 4) + 1;


    const roomNumber =
        101 + ((i - 1) % 50);


    students.push({

        registerNumber:
            registerNumber,

        // Each student has a unique password

        password:
            registerNumber,

        name:
            "Student " + i,

        hostel:
            "Girls Hostel - Block " +
            hostelNumber,

        room:
            "A-" + roomNumber,

        roomType:
            "2 Sharing",

        totalFee:
            45000,

        paidFee:
            45000,

        dueFee:
            0

    });

}


// ==================================================
// 2. LOGIN
// ==================================================

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const registerNumber =
                document
                    .getElementById("studentId")
                    .value
                    .trim()
                    .toUpperCase();


            const password =
                document
                    .getElementById("password")
                    .value
                    .trim()
                    .toUpperCase();


            const student =
                students.find(
                    function(item) {

                        return (
                            item.registerNumber ===
                            registerNumber
                            &&
                            item.password ===
                            password
                        );

                    }
                );


            if (student) {

                localStorage.setItem(
                    "loggedInStudent",
                    JSON.stringify(student)
                );


                window.location.href =
                    "index.html";

            }

            else {

                const error =
                    document.getElementById(
                        "loginError"
                    );


                error.innerText =
                    "Invalid Register Number or Password.";

            }

        }
    );

}


// ==================================================
// 3. GET LOGGED-IN STUDENT
// ==================================================

function getCurrentStudent() {

    const savedStudent =
        localStorage.getItem(
            "loggedInStudent"
        );


    if (!savedStudent) {

        const currentPage =
            window.location.pathname
                .split("/")
                .pop();


        if (currentPage !== "login.html") {

            window.location.href =
                "login.html";

        }

        return null;
    }


    return JSON.parse(savedStudent);
}


const currentStudent =
    getCurrentStudent();


// ==================================================
// 4. DASHBOARD
// ==================================================

if (currentStudent) {

    const name =
        document.getElementById("name");


    if (name) {

        document.getElementById(
            "welcome"
        ).innerText =
            "Welcome, " +
            currentStudent.name +
            " 👋";


        document.getElementById(
            "studentName"
        ).innerText =
            currentStudent.name;


        document.getElementById(
            "name"
        ).innerText =
            currentStudent.name;


        document.getElementById(
            "roll"
        ).innerText =
            currentStudent.registerNumber;


        document.getElementById(
            "hostel"
        ).innerText =
            currentStudent.hostel;


        document.getElementById(
            "room"
        ).innerText =
            currentStudent.room;


        document.getElementById(
            "roomCard"
        ).innerText =
            currentStudent.room;


        document.getElementById(
            "fee"
        ).innerText =
            "₹" +
            currentStudent.totalFee;


        updateComplaintCount();

    }

}


// ==================================================
// 5. HOSTEL SERVICES
// ==================================================

if (currentStudent) {

    const serviceName =
        document.getElementById(
            "serviceName"
        );


    if (serviceName) {

        document.getElementById(
            "serviceStudent"
        ).innerText =
            "Services for " +
            currentStudent.name;


        document.getElementById(
            "serviceName"
        ).innerText =
            currentStudent.name;


        document.getElementById(
            "serviceRoll"
        ).innerText =
            currentStudent.registerNumber;


        document.getElementById(
            "serviceHostel"
        ).innerText =
            currentStudent.hostel;


        document.getElementById(
            "serviceRoom"
        ).innerText =
            currentStudent.room;


        document.getElementById(
            "totalFee"
        ).innerText =
            "₹" +
            currentStudent.totalFee;


        document.getElementById(
            "paidFee"
        ).innerText =
            "₹" +
            currentStudent.paidFee;


        document.getElementById(
            "dueFee"
        ).innerText =
            "₹" +
            currentStudent.dueFee;

    }

}


// ==================================================
// 6. STUDENT-SPECIFIC COMPLAINT STORAGE
// ==================================================

function getComplaintKey() {

    return (
        "hostelComplaints_" +
        currentStudent.registerNumber
    );

}


function getComplaints() {

    return JSON.parse(
        localStorage.getItem(
            getComplaintKey()
        )
    ) || [];

}


function saveComplaints(
    complaints
) {

    localStorage.setItem(
        getComplaintKey(),
        JSON.stringify(
            complaints
        )
    );

}


// ==================================================
// 7. DISPLAY COMPLAINTS
// ==================================================

function displayComplaints() {

    const container =
        document.getElementById(
            "complaintsContainer"
        );


    if (
        !container ||
        !currentStudent
    ) {
        return;
    }


    const complaints =
        getComplaints();


    container.innerHTML = "";


    if (complaints.length === 0) {

        container.innerHTML = `

            <p class="empty-message">

                You have not submitted
                any complaints yet.

            </p>

        `;

        return;

    }


    complaints.forEach(
        function(complaint) {

            container.innerHTML += `

                <div class="complaint-card">

                    <h3>
                        ${complaint.category}
                    </h3>

                    <p>

                        <strong>
                            Register Number:
                        </strong>

                        ${currentStudent.registerNumber}

                    </p>

                    <p>

                        <strong>
                            Room:
                        </strong>

                        ${complaint.room}

                    </p>

                    <p>

                        <strong>
                            Problem:
                        </strong>

                        ${complaint.description}

                    </p>

                    <span class="status">

                        ${complaint.status}

                    </span>

                </div>

            `;

        }
    );

}


// ==================================================
// 8. SUBMIT COMPLAINT
// ==================================================

const complaintForm =
    document.getElementById(
        "complaintForm"
    );


if (complaintForm) {

    // Show student's room

    if (currentStudent) {

        document.getElementById(
            "complaintRoom"
        ).value =
            currentStudent.room;

    }


    complaintForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const category =
                document.getElementById(
                    "category"
                ).value;


            const description =
                document.getElementById(
                    "description"
                ).value
                .trim();


            if (!currentStudent) {

                alert(
                    "Please login first."
                );

                return;

            }


            const complaints =
                getComplaints();


            const newComplaint = {

                category:
                    category,

                description:
                    description,

                room:
                    currentStudent.room,

                status:
                    "Pending",

                date:
                    new Date()
                        .toLocaleDateString()

            };


            complaints.push(
                newComplaint
            );


            saveComplaints(
                complaints
            );


            alert(
                "Complaint submitted successfully!"
            );


            complaintForm.reset();


            document.getElementById(
                "complaintRoom"
            ).value =
                currentStudent.room;


            displayComplaints();

    });

}


// ==================================================
// 9. UPDATE COMPLAINT COUNT
// ==================================================

function updateComplaintCount() {

    const countElement =
        document.getElementById(
            "complaintCount"
        );


    if (
        !countElement ||
        !currentStudent
    ) {
        return;
    }


    const complaints =
        getComplaints();


    const pending =
        complaints.filter(
            function(complaint) {

                return (
                    complaint.status !==
                    "Resolved"
                );

            }
        );


    countElement.innerText =
        pending.length;

}


// ==================================================
// 10. LOAD COMPLAINTS PAGE
// ==================================================

if (
    document.getElementById(
        "complaintsContainer"
    )
) {

    displayComplaints();

}


// ==================================================
// 11. LOGOUT
// ==================================================

function logout() {

    localStorage.removeItem(
        "loggedInStudent"
    );


    window.location.href =
        "login.html";

}