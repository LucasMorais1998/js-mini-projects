const list = document.querySelector('[data-js="skills"]');

const data = fetch("./data/skills.json")
  .then((response) => response.json())
  .then((jsonData) => {
    const skillsData = Object.values(jsonData);

    skillsData.map((skill) => {
      for (let s in skill) {
        let itemList = document.createElement("li");
        let spanItemList = document.createElement("span");
        spanItemList.setAttribute("class", "title is-6");

        spanItemList.textContent = skill[s].name;

        if (skill[s].additional) {
          spanItemList.textContent += ` - ${skill[s].additional}`;
        }

        itemList.appendChild(spanItemList);

        list.appendChild(itemList);
      }
    });
  });
