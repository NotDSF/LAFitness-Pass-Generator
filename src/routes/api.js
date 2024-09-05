const script = require("../modules/script");

const PassSchema = {
    type: "object",
    properties: { 
        FirstName: { type: "string" },
        LastName: { type: "string" },
        Phone: { type: "string" },
        Email: { type: "string" },
        ClubID: { type: "string" }
    },
    required: ["FirstName", "LastName", "Phone", "Email", "ClubID"]
}

/**
 * @param {import("fastify").FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
*/
async function routes(fastify, options) {	
    fastify.post("/generate", { schema: { body: PassSchema } }, (request, reply) => {
        const { FirstName, LastName, Phone, Email, ClubID } = request.body;
        page.evaluate(script, FirstName, LastName, Phone, Email, ClubID, __CSRFTOKEN, __VIEWSTATE, __VIEWSTATEGENERATOR, __EVENTVALIDATION);
        reply.send({ ok: true });
    });
}

module.exports = routes;