import { marked } from "https://cdn.jsdelivr.net/npm/marked/+esm";

window.run = () => {
  const u = document.getElementById("url").value;
  fetch(u)
    .then((response) => response.text())
    .then((data) => {
      document.body.innerHTML = marked(data);
      const token = marked
        .lexer(data)
        .filter((e) => e.type === "heading" && e.depth === 1);
      if (token && token.length > 0) {
        document.title = token[0].text;
      }
    })
    .catch((e) => {
      document.getElementById("result").innerText = e.message;
    });
};
if (location.search) {
  let url = location.search.slice(1);
  const r = document.getElementById("url");

  if (url.match(/https:\/\/github\.com\/.+\.md$/)) {
    url = url
      .replace("github.com", "raw.githubusercontent.com")
      .replace(/\/blob\//, "/");
  }
  r.value = url;
  run();
}
