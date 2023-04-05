import { marked } from "https://cdn.jsdelivr.net/npm/marked/+esm";

const from = document.getElementById("from");
const a = document.getElementById("src");
const loc = document.getElementById("loc");
const input = document.getElementById("url");
const result = document.getElementById("result");
const error = document.getElementById("error");

loc.innerText = location.origin + location.pathname;
window.run = () => {
  let u = input.value;
  from.innerText = "From ";
  a.href = a.innerText = u;
  if (u.match(/https:\/\/github\.com\/.+\.md$/)) {
    u = u
      .replace("github.com", "raw.githubusercontent.com")
      .replace(/\/blob\//, "/");
  }
  fetch(u)
    .then((response) => response.text())
    .then((data) => {
      result.innerHTML = marked(data);
      const token = marked
        .lexer(data)
        .filter((e) => e.type === "heading" && e.depth === 1);
      if (token && token.length > 0) {
        document.title = token[0].text;
      }
    })
    .catch((e) => {
      error.innerText = e.message;
    });
  return false;
};
if (location.search) {
  let url = location.search.slice(1);
  input.value = url;
  run();
}
