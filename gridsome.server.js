// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    const { profiles } = require('./src/data/developers.json');

    const collection = addCollection({
      typeName: 'Profiles'
    })

    for (const profile of profiles) {
      collection.addNode(profile);
    }
  })

  api.createPages(async ({ graphql, createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
    const { data } = await graphql(`{
      allProfiles {
        edges{
          node {
            id,
            name,
            status,
            social {
              name,
              url
            }
          } 
        }
      }
    }`)

    data.allProfiles.edges.forEach(node => {
      const { node: profile } = node
      createPage({
        path: `/profile/${profile.id}`,
        component: './src/templates/Profile.vue',
        context: {
          profile
        }
      })
    })
  })
}
