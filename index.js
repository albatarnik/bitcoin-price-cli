#!/usr/bin/env node
const https = require("https");

function fetchBTCData() {
  return new Promise((resolve, reject) => {
    let body = "";
    https.get(
      {
        hostname: "blockchain.info",
        path: "/de/ticker",
        agent: false
      },
      res => {
        res.setEncoding("utf8");
        res.on("data", function(chunk) {
          body += chunk;
        });
        res.on("end", function() {
          resolve(body);
        });
      }
    );
  });
}

(async () => {
  const data = JSON.parse(await fetchBTCData());
  console.log("$" + data.USD.last);
})();
