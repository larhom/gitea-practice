import { test, expect } from "@playwright/test";
import { testApiUsers } from "../../testdata/users";

const token = testApiUsers.QaAutoUser1.apiKey;
const username1 = testApiUsers.QaAutoUser1.username;
const username2 = testApiUsers.QaAutoUser2.username;
const fullName = testApiUsers.QaAutoUser1.fullName;
const biography = testApiUsers.QaAutoUser1.biography;
const website = testApiUsers.QaAutoUser1.website;
const location = testApiUsers.QaAutoUser1.location;

test("Get authenticated user", async ({ request }) => {
  const response = await request.get("/api/v1/user", {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.login).toBe(`${username1}`);
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

test.describe("Add a following user", () => {
  test.beforeEach(async ({ request }) => {
    const checkFollowings = await request.get("/api/v1/user/following", {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    const followings = await checkFollowings.json();
    expect(followings).toHaveLength(0);
  });

  test("Follow a user", async ({ request }) => {
    const response = await request.put(`/api/v1/user/following/${username2}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    expect(response.status()).toBe(204);
  });

  test.afterEach(async ({ request }) => {
    const response = await request.delete(
      `/api/v1/user/following/${username2}`,
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
  test.beforeEach(async ({ request }) => {
    const response = await request.put(`/api/v1/user/following/${username2}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    expect(response.status()).toBe(204);
  });

  test("Delete following user", async ({ request }) => {
    const response = await request.delete(
      `/api/v1/user/following/${username2}`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );
    expect(response.status()).toBe(204);
  });
});
