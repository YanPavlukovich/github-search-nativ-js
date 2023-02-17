export class View {
  constructor(api) {
    this.app = document.querySelector(".app");
    this.api = api;
    this.searchLine = document.querySelector(".search-line");
    this.searchInput = document.querySelector(".search-input");
    this.searchCounter = document.querySelector(".search-counter");
    this.repositoriesList = document.querySelector(".rep-list");
    this.saveBlock = document.querySelector(".save-block");

    this.saveBlock.addEventListener("click", (event) => {
      if (event.target.classList.contains("button-delete")) {
        event.target.closest(".rep").remove();
      }
    });
  }
  createElement(itemTag, itemClass) {
    const item = document.createElement(itemTag);
    if (itemClass) {
      item.classList.add(itemClass);
    }
    return item;
  }

  createRepository(repData) {
    const repositoryElement = this.createElement("li", "rep-prev");

    repositoryElement.addEventListener("click", () =>
      this.showRepositoryData(repData)
    );

    repositoryElement.innerHTML = `<span class="rep-prev-name">${repData.name}</span>`;
    this.repositoriesList.append(repositoryElement);
  }

  showRepositoryData(repData) {
    const reposEl = this.createElement("div", "rep");

    this.api.getRepositoryData(repData.name).then((res) => {
      const [name, login, stargazers_count] = res;

      reposEl.innerHTML = `
			<li class="element-data">
			Name: ${repData.name}<br>
			Owner: ${repData.owner.login}<br>
			Stars: ${repData.stargazers_count}</li>
			<button class="button-delete">X</button>
			`;
    });

    this.saveBlock.append(reposEl);
  }

  setCounterMessage(message) {
    this.searchCounter.textContent = message;
  }
}

//* для отображения добавленного в список репозитория нам необходимы следующие свойства fullname/name,owner.login,stargazers_count.
