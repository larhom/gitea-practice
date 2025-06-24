import { APIRequestContext } from "@playwright/test";

export default class RepositoryService {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createRepository(token: string, repo: string) {
    const response = await this.request.post("/api/v1/user/repos", {
      headers: {
        Authorization: `token ${token}`,
      },
      data: {
        name: `${repo}`,
      },
    });
    return response;
  }

  async getRepositoryById(token: string, repoId: number) {
    const response = await this.request.get(`/api/v1/repositories/${repoId}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    return response;
  }

  async searchRepository(repo: string) {
    const response = await this.request.get(`/api/v1/repos/search?q=${repo}`);
    return response;
  }

  async updateRepository(token: string, owner: string, repo: string) {
    const response = await this.request.patch(`/api/v1/repos/${owner}/${repo}`, {
      headers: {
        Authorization: `token ${token}`,
      },
      data: {
        name: `${repo}-updated`,
      },
    });
    return response;
}

    async deleteRepository(token: string, owner: string, repo: string) {
        const response = await this.request.delete(`/api/v1/repos/${owner}/${repo}`, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      return response;
    }
}