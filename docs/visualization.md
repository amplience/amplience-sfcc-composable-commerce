# Visualization (Real time)

One of the advantages of using Amplience is that it is the only headless CMS for commerce that ensures that you can see what you are editing. 

## Setting up a specific visualisation route

As the components can be in any location, we have set up a specific Visualization route which is used to visualise individual content items as you are editing.

This route is added to the Visualisations in your Amplience Content Type.

Location: `app/routes.jsx`

Import:
``` 
const RealtimeVisualization = loadable(() => import('./pages/amp-rtv'))
```

Additional Route:

```
{
  path: '/visualization/:hubname/:contentId/:vse/:locale',
  component: RealtimeVisualization,
  exact: false
}
```

This route is added to the Visualisations in your Amplience Content Type:
```
http://localhost:3000/visualization/{{hub.name}}/{{content.sys.id}}/{{vse.domain}}/{{locales}}
```

## Real Time Visualisation

Real time visualisation uses the Amplience [Real Time visualization SDK](https://github.com/amplience/dc-visualization-sdk) in order to load content and change props in your component in real time as you are editing.

Location: `app/pages/amp-rtv/index.jsx`