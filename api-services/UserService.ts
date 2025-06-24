import { APIRequestContext } from "@playwright/test";

export default class UserService {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getAuthenticatedUser(token: string) {
    const response = await this.request.get("/api/v1/user", {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    return response;
  }

  async getUserSettings(token: string) {
    const response = await this.request.get("/api/v1/user/settings", {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    return response;
  }

  async updateUserSettings(
    token: string,
    fullName: string,
    biography: string,
    website: string,
    location: string
  ) {
    const randomSuffix = Date.now();
    const response = await this.request.patch("/api/v1/user/settings", {
      headers: {
        Authorization: `token ${token}`,
      },
      data: {
        full_name: `${fullName}${randomSuffix}`,
        description: `${biography}${randomSuffix}`,
        website: `${website}${randomSuffix}`,
        location: `${location}${randomSuffix}`,
        visibility: 0,
        keep_email_private: "on",
      },
    });
    return response;
  }

  async getFollowingUsers(token: string) {
    const response = await this.request.get("/api/v1/user/following", {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  return response;
  }

  async addFollowingUser(token: string, username: string) {
    const response = await this.request.put(`/api/v1/user/following/${username}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    return response;
  }

  async deleteFollowingUser(token: string, username: string) {
    const response = await this.request.delete(
      `/api/v1/user/following/${username}`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );
    return response;
  }

  async addUserSecret(token: string, secretname: string, secretvalue: string) {

    const response = await this.request.put(`/api/v1/user/actions/variables/${secretname}`, {
        headers: {
            Authorization: `token ${token}`,
        },
        data: {
            name: secretname,
            value: secretvalue
        }
    });
    return response;
  }
}
