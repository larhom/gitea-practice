import { test, expect } from "@playwright/test";
import { loadTestUsers } from '../../utils/loadTestUsers';
import RepositoryService from "../../api-services/RepositoryService";

test.describe("Repository API tests", () => {
  let token: string;
  let owner: string;
  let repo = "test-repo-1";
  let repoId: number;
  let collaborator: string;
  let repositoryService: RepositoryService;

  test.beforeAll(() => {
    const testApiUsers = loadTestUsers();
    token = testApiUsers.users.QaAutoUser2.apiKey;
    owner = testApiUsers.users.QaAutoUser2.username;
    collaborator = testApiUsers.users.QaAutoUser1.username;
  });

  test.beforeEach(async ({ request }) => {
    repositoryService = new RepositoryService(request);
    const response = await repositoryService.createRepository(token, repo);
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.name).toBe(`${repo}`);
    repoId = body.id;
  });

  test("Get repo by Id", async () => {
    const response = await repositoryService.getRepositoryById(token, repoId);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toBe(`${repo}`);
  });

  test('Search a repo', async() => {
    const response = await repositoryService.searchRepository(repo);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data[0].name).toBe(`${repo}`);
    expect(body.data[0].full_name).toBe(`${owner}/${repo}`);
  })

  test("Update a repository", async () => {
    const response = await repositoryService.updateRepository(token, owner, repo);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toBe(`${repo}-updated`);
    repo = body.name;
  });

  test('Delete a repository', async () => {
    const response = await repositoryService.deleteRepository(token, owner, repo);
      expect(response.status()).toBe(204);
  })

  test('Get all branches in the repo', async() => {
    const response = await repositoryService.getAllBranches(token, owner, repo);
    expect(response.status()).toBe(200);
  })

  test('Get all collaborators', async() => {
    const response = await repositoryService.getCollaborators(token, owner, repo);
    expect(response.status()).toBe(200);
  })

  test ('Add a collaborator', async () => {
    const response = await repositoryService.addCollaborator(token, owner, repo, collaborator);
    expect(response.status()).toBe(204);
  })

  test('Delete a collaborator', async () => {
    const addNewCollaborator = await repositoryService.addCollaborator(token, owner, repo, collaborator);
    expect(addNewCollaborator.status()).toBe(204);
    const deleteCollaborator = await repositoryService.deleteCollaborator(token, owner, repo, collaborator);
    expect(deleteCollaborator.status()).toBe(204);
  })

  test.afterEach(async () => {
    const repoExists = await repositoryService.getRepositoryById(token, repoId);
    if (repoExists.status() === 200) {
      const deleteRepo = await repositoryService.deleteRepository(token, owner, repo);
      expect(deleteRepo.status()).toBe(204);
    }
  });
})

