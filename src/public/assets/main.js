const amount = document.getElementById("amount");
const slider = document.getElementById("slider");
const first = document.getElementById("firstname");
const last = document.getElementById("lastname");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const clubid = document.getElementById("clubid");

function SliderChange() {
    amount.textContent = `Generate ${slider.value} ${slider.value == 1 ? "pass" : "passes"}`
}

function Generate() {
    const body = JSON.stringify({
        FirstName: first.value,
        LastName: last.value,
        Phone: phone.value,
        Email: email.value,
        ClubID: clubid.value
    })

    for (let i=0; i < +slider.value; i++) {
        fetch("/api/generate", {
            method: "POST",
            headers: {
                ["Content-Type"]: "application/json"
            },
            body
        });
    }
    alert("Check your Inbox!");
}