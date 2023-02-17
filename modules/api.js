const BASE_URL = "https://api.github.com/";
const REPOSITORY_PER_PAGE = 5;

export class Api {
  async searchRepositories(value) {
    return await fetch(
      `${BASE_URL}search/repositories?q=${value}&per_page=${REPOSITORY_PER_PAGE}`
    );
  }

  async getRepositoryData(repName) {
    const urls = [`${BASE_URL}`, `${BASE_URL}`, `${BASE_URL}`];
    const requests = urls.map((url) => fetch(url));
    const responses = await Promise.all(requests);
    return await Promise.all(responses.map((r) => r.json()));
  }
}
