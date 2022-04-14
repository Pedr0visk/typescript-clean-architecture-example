module.exports = {
  branches: "production",
  repositoryUrl: "https://github.com/Navegg/cdp-config-microservice",
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/github",
  ],
};
