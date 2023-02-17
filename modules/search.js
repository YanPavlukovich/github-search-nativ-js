export class Search {
  constructor(view, api, log) {
    this.view = view;
    this.api = api;
    this.log = log;
    this.view.searchInput.addEventListener(
      "keyup",
      this.debounce(this.searchRepositories.bind(this), 500)
    );
  }

  searchRepositories() {
    this.view.setCounterMessage("");
    if (this.view.searchInput.value) {
      this.clearRepositories();
      this.repositoryRequest(this.view.searchInput.value);
    } else {
      this.clearRepositories();
    }
  }

  searchMoreRepositories() {
    this.repositoryRequest(this.view.searchInput.value);
  }

  async repositoryRequest(searchValue) {
    let totalCount;
    let message;
    try {
      await this.api.searchRepositories(searchValue).then((response) => {
        response.json().then((res) => {
          //* положим значение свойства total_count в переменную.
          totalCount = res.total_count;
          message = this.log.counterMessage(totalCount);
          this.view.setCounterMessage(message);
          res.items.forEach((repos) => this.view.createRepository(repos));
        });
      });
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  clearRepositories() {
    this.view.repositoriesList.innerHTML = "";
  }

  debounce(fn, debounceTime) {
    let timeout;
    return function () {
      const fnCall = () => {
        fn.apply(this, arguments);
      };
      clearTimeout(timeout);
      timeout = setTimeout(fnCall, debounceTime);
    };
  }
}
