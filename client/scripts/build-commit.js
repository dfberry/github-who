const childProcess = require("child_process");
const fs = require("fs");
const path = require("path");

const orginalfileName = path.join(__dirname, "../.env.local");
const finalfileName = path.join(__dirname, "../.env");

/*

1. Copy existing local .env.local to .env
2. Add env vars to .env for branch and sha

- run this before building app

*/

fs.copyFile(orginalfileName, finalfileName, (err) => {
    childProcess.exec("git rev-parse --abbrev-ref HEAD", (err, stdoutBranch) => {
        childProcess.exec("git rev-parse --short HEAD", (err, stdoutSHA) => {

            const branch = stdoutBranch.trim();
            const sha = stdoutSHA.trim();

            const fileContents = `\nREACT_APP_GIT_BRANCH=${branch}\nREACT_APP_GIT_SHA=${sha}`;

            // set
            fs.appendFile(finalfileName, fileContents, (err) => {
                if (err) console.log(err);
            });
        });
    });
});