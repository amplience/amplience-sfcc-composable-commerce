# Visualization (Real time)

One of the advantages of using Amplience is that it is the only headless CMS for commerce that ensures that you can see what you are editing. 

## Setting up a specific visualisation route

As the components can be in any location, we have set up a specific Visualization route which is used to visualise individual content items as you are editing.

This route is added to the Visualisations in your Amplience Content Type.

Location: `app/routes.jsx`

Import:

``` js
const RealtimeVisualization = loadable(() => import('./pages/amplience/realtime-visualization'))
```

Additional Route:

``` js
{
  path: '/visualization/:hubname/:contentId',
  component: RealtimeVisualization,
  exact: false
}
```

This route is added to the Visualisations in your Amplience Content Type: `http://localhost:3000/{{locales}}/visualization/{{hub.name}}/{{content.sys.id}}?vse={{vse.domain}}`

## Real Time Visualisation

Real time visualisation uses the Amplience [Real Time visualization SDK](https://github.com/amplience/dc-visualization-sdk) in order to load content and change props in your component in real time as you are editing.

Location: `app/pages/amplience/realtime-visualization/index.jsx`
