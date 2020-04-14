module.exports = {
  packagerConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-snap",
      config: {
        features: {
          audio: true,
          mpris: "com.example.mpris",
          webgl: true,
        },
        summary: "Pretty Awesome",
      },
    },
    {
      name: "@electron-forge/maker-zip",
    },
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "rive",
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin", "linux"],
      config: {
        // Config here
      },
    },
    {
      name: "@electron-forge/maker-pkg",
      config: {
        keychain: "my-secret-ci-keychain",
      },
    },
  ],
};
