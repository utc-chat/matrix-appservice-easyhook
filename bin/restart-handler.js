const cp = require('child_process')

const startServer = (code, signal) => {
    code &&
    console.log("Server ended with", code, signal);

    console.log("\n\n=================================");
    console.log("\nStarting Server...");
    cp.fork("./bin/www").on("exit", startServer);
}

startServer();