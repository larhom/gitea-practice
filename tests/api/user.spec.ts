import { test, expect } from "@playwright/test";
import { loadTestUsers } from '../../utils/loadTestUsers';

test.describe('User API tests', () => {
  let token: string;
  let username1: string;
  let username2: string;
  let fullName: string;
  let biography: string;
  let website: string;
  let location: string;

  test.beforeAll(() => {
    const testApiUsers = loadTestUsers();
    token = testApiUsers.users.QaAutoUser2.apiKey;
    username1 = testApiUsers.users.QaAutoUser1.username;
    username2 = testApiUsers.users.QaAutoUser2.username;
    fullName = testApiUsers.users.QaAutoUser2.fullName;
    biography = testApiUsers.users.QaAutoUser2.biography;
    website = testApiUsers.users.QaAutoUser2.website;
    location = testApiUsers.users.QaAutoUser2.location;
  })

  test("Get authenticated user", async ({ request }) => {
  const response = await request.get("/api/v1/user", {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.login).toBe(`${username2}`);
});

test("Get user settings", async ({ request }) => {
  const response = await request.get("/api/v1/user/settings", {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  expect(response.status()).toBe(200);
});

test("Update user settings", async ({ request }) => {
  const randomSuffix = Date.now();
  const response = await request.patch("/api/v1/user/settings", {
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
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.full_name).toBe(`${fullName}${randomSuffix}`);
  expect(body.description).toBe(`${biography}${randomSuffix}`);
  expect(body.website).toBe(`${website}${randomSuffix}`);
  expect(body.location).toBe(`${location}${randomSuffix}`);
});

test("Get following users", async ({ request }) => {
  const response = await request.get("/api/v1/user/following", {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  expect(response.status()).toBe(200);
});
})

test.describe("Add a following user", () => {
  let token: string;
  let username1: string;

  test.beforeAll(() => {
    const testApiUsers = loadTestUsers();
    token = testApiUsers.users.QaAutoUser2.apiKey;
    username1 = testApiUsers.users.QaAutoUser1.username;
    
  })

  test("Follow a user", async ({ request }) => {
    const response = await request.put(`/api/v1/user/following/${username1}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    expect(response.status()).toBe(204);
  });

  test.afterAll(async ({ request }) => {
    const response = await request.delete(
      `/api/v1/user/following/${username1}`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );
    expect(response.status()).toBe(204);
  });
});

test.describe("Unfollow a user", () => {
  let token: string;
  let username1: string;

  test.beforeAll(() => {
    const testApiUsers = loadTestUsers();
    token = testApiUsers.users.QaAutoUser2.apiKey;
    username1 = testApiUsers.users.QaAutoUser1.username;
    
  })
  test.beforeEach(async ({ request }) => {
    const response = await request.put(`/api/v1/user/following/${username1}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    expect(response.status()).toBe(204);
  });

  test("Delete following user", async ({ request }) => {
    const response = await request.delete(
      `/api/v1/user/following/${username1}`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );
    expect(response.status()).toBe(204);
  });
});
