module.exports = async (FirstName, LastName, Phone, Email, ClubID, __CSRFTOKEN, __VIEWSTATE, __VIEWSTATEGENERATOR, __EVENTVALIDATION) => {
    const data = {
        "__CSRFTOKEN": __CSRFTOKEN,
        "ctl00$GlobalHeader$txtZip": "",
        "ctl00$GlobalHeader$txtZipMobile": "",
        "ctl00$MainContent$FreePass$txtFirstName": FirstName,
        "ctl00$MainContent$FreePass$txtLastName": LastName,
        "ctl00$MainContent$FreePass$txtPhone": Phone,
        "ctl00$MainContent$FreePass$txtEmail": Email,
        "ctl00$MainContent$FreePass$hdnCorpID": "",
        "ctl00$MainContent$FreePass$hdnZipCode": "",
        "ctl00$MainContent$FreePass$hdnClubID": ClubID,
        "ctl00$MainContent$FreePass$parameters": "",
        "terms": "terms",
        "ctl00$MainContent$FreePass$hidReload": "",
        "g-recaptcha-response": "How can your company have such shit security?",
        "ctl00$MainContent$FreePass$btnSubmit": "Next",
        "ctl00$MainContent$FreePass$txtMobileZip": "3",
        "ctl00$MainContent$parameters": "",
        "ctl00$hidMktPageID": "",
        "__VIEWSTATE": __VIEWSTATE,
        "__VIEWSTATEGENERATOR": __VIEWSTATEGENERATOR,
        "__EVENTVALIDATION": __EVENTVALIDATION
    }

    const body = new URLSearchParams();
    for (let index in data) {
        body.append(index, data[index]);
    }

    const packet = await fetch("https://www.lafitness.com/Pages/FreePass.aspx", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:130.0) Gecko/20100101 Firefox/130.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8",
            "Accept-Language": "en-GB,en;q=0.5",
            "Content-Type": "application/x-www-form-urlencoded",
            "Upgrade-Insecure-Requests": "1",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-User": "?1",
            "Priority": "u=0, i"
        },
        "referrer": "https://www.lafitness.com/Pages/FreePass.aspx",
        "body": body.toString(),
        "method": "POST",
        "mode": "cors"
    });

    printf(`${new Date().toLocaleString().split(", ").pop()} code=${packet.status} club=${ClubID} phone=${Phone} name=${FirstName} ${LastName} email=${Email}`);
}