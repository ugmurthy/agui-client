"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@ag-ui/client");
const agent = new client_1.HttpAgent({
    url: "http://localhost:8000/awp",
});
// Add initial messages if needed
agent.messages = [
    { "id": "1", "role": "system", "content": "you are a helpful assitant" },
    { "id": "2", "role": "user", "content": "Why is the sky blue?" }
];
// Run the agent
try {
    agent
        .run({
        threadId: agent.threadId,
        messages: agent.messages,
        runId: "run_123",
        tools: [], // Optional tools
        context: [], // Optional context
    }).subscribe((event) => {
        switch (event.type) {
            case client_1.EventType.TEXT_MESSAGE_CONTENT:
                process.stdout.write(event?.delta);
                break;
            case client_1.EventType.RUN_ERROR:
                console.log("\nRUN_ERROR ", event);
            default:
                console.log(`\n${event.type}`);
        }
    });
}
catch (e) {
    console.log("Client Side Error\n");
    console.log("------");
    console.log(e);
    console.log("------");
}
