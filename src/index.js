const path = require("path");
const puppeteer = require("puppeteer");
const fastify = require("fastify")();

fastify.register(require("./routes/api"), { prefix: "/api" })
fastify.register(require("@fastify/static"), {
    root: path.join(__dirname, "public")
});

let _page;
(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    page.exposeFunction("printf", (...args) => console.log(...args));

    page.on("request", async (request) => {
        const url = request.url();
        const method = request.method();

        if (!_page && url == "https://www.lafitness.com/Pages/FreePass.aspx" && method == "POST") {
            const params = new URLSearchParams(request.postData());
            _page = page;
            global.page = page;
            global.__CSRFTOKEN = params.get("__CSRFTOKEN");
            global.__VIEWSTATE = params.get("__VIEWSTATE");
            global.__VIEWSTATEGENERATOR = params.get("__VIEWSTATEGENERATOR");
            global.__EVENTVALIDATION = params.get("__EVENTVALIDATION");

            await fastify.listen({ port: 8080, host: "0.0.0.0" });
            console.log("Server Listenting to port: 8080");
        }
    });

    await page.goto("https://www.lafitness.com/Pages/FreePass.aspx");

    await page.waitForSelector("#ctl00_MainContent_FreePass_txtSelectClubZip", { visible: true, timeout: 0 }); // zip input
    await page.waitForSelector("#ctl00_MainContent_FreePass_bntChangeClub", { visible: true, timeout: 0 }); // find club

    await page.type("#ctl00_MainContent_FreePass_txtSelectClubZip", "1");
    await page.click("#ctl00_MainContent_FreePass_bntChangeClub");
})();