const http = require("http");
const url = require("url");
const moment = require("moment");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // Extract query parameters
  const slackName = parsedUrl.query.slack_name;
  const track = parsedUrl.query.track;

  // Validate query parameters
  if (!slackName || !track) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Missing required parameters" }));
    return;
  }

  // Get the current day of the week
  const currentDay = moment().format("dddd");

  // Get the current UTC time
  const utcTime = moment().utc().format();

  // Construct GitHub URLs
  const githubFileURL =
    "https://github.com/oluwasemilorebadejo/hng-stage-one/blob/main/index.js";
  const githubRepoURL = "https://github.com/oluwasemilorebadejo/hng-stage-one";

  // Create the JSON response
  const response = {
    slack_name: slackName,
    current_day: currentDay,
    utc_time: utcTime,
    track: track,
    github_file_url: githubFileURL,
    github_repo_url: githubRepoURL,
    status_code: 200,
  };

  // Send the JSON response
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(response));
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
