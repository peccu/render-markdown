import { marked } from "https://cdn.jsdelivr.net/npm/marked/+esm";

const a = document.getElementById("src")
const loc = document.getElementById("loc")
const input = document.getElementById("url")
const result = document.getElementById("result")
const error = document.getElementById("error")

loc.innerText = location.origin + location.pathname
window.run = () => {
  const u = input.value
  a.href = a.innerText = u;
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

  if (url.match(/https:\/\/github\.com\/.+\.md$/)) {
    url = url
      .replace("github.com", "raw.githubusercontent.com")
      .replace(/\/blob\//, "/");
  }
  input.value = url;
  run();
}
