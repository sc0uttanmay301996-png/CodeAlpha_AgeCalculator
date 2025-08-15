document.getElementById("ageForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let dob = document.getElementById("dob").value;
    if (!dob) {
        alert("Please select your date of birth!");
        return;
    }

    let dobDate = new Date(dob);
    let today = new Date();

    if (dobDate > today) {
        alert("Date of birth cannot be in the future!");
        return;
    }

    let years = today.getFullYear() - dobDate.getFullYear();
    let months = today.getMonth() - dobDate.getMonth();
    let days = today.getDate() - dobDate.getDate();

    // Adjust months and years if needed
    if (days < 0) {
        months--;
        let prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    document.getElementById("result").innerHTML = 
        `You are <span style="color:yellow">${years}</span> years, 
         <span style="color:yellow">${months}</span> months, 
         and <span style="color:yellow">${days}</span> days old.`;
});
