import { test, expect } from "@playwright/test";
import { loadTestUsers } from '../../utils/loadTestUsers';

const testApiUsers = loadTestUsers();

test.describe("Repository API tests", () => {
  const token = testApiUsers.users.QaAutoUser2.apiKey;
  const owner = testApiUsers.users.QaAutoUser2.username;
  let repo = "test-repo-1";
  let repoId: number;

  test.beforeEach(async ({ request }) => {
    const response = await request.post("/api/v1/user/repos", {
      headers: {
        Authorization: `token ${token}`,
      },
      data: {
        name: `${repo}`,
      },
    });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.name).toBe(`${repo}`);
    repoId = body.id;
  });

  test("Get repo by Id", async ({ request }) => {
    const response = await request.get(`/api/v1/repositories/${repoId}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toBe(`${repo}`);
  });

  test('Search a repo', async({ request }) => {
    const response = await request.get(`/api/v1/repos/search?q=${repo}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data[0].name).toBe(`${repo}`);
    expect(body.data[0].full_name).toBe(`${owner}/${repo}`);
  })

  test("Update a repository", async ({ request }) => {
    const response = await request.patch(`/api/v1/repos/${owner}/${repo}`, {
      headers: {
        Authorization: `token ${token}`,
      },
      data: {
        name: `${repo}-updated`,
      },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toBe(`${repo}-updated`);
    repo = body.name;
  });

  test('Delete a repository', async ({ request }) => {
    const response = await request.delete(`/api/v1/repos/${owner}/${repo}`, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      expect(response.status()).toBe(204);
  })

  test.afterEach(async ({ request }) => {
    const repoExists = await request.get(`/api/v1/repositories/${repoId}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    if (repoExists.status() === 200) {
      const response = await request.delete(`/api/v1/repos/${owner}/${repo}`, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      expect(response.status()).toBe(204);
    }
  });
});
