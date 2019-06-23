expertise-leaflet
===
Web Component "Expertise Leaflet" styled with CSS Grid and fetched with data from GitHub via GraphQL API.

![logo](/img/expertises_cut.png)

# Idea

Take a list of libraries, frameworks, tools from GitHub API using GraphQL and show on page in iOS-apps-screen-like way.

List represent company expertize in person/company development.

Also section about "wannabe".

Printed out as leaflet A5 format. Preliminary in 3-fold-brochure way.

Download pdf, jpg or svg. Need to think. Ideally would be great to have proper page layout for proper print.

# Tech Stack

- CSS Grid
- CSS Variables
- Custom Web Components
- JavaScript / ES6
- GitHub API v4 (GraphQL - https://developer.github.com/v4/)
- NodeJS / npm
- HTTP/2 (ExpressJS 4)
- maybe html2pdf export (https://github.com/eKoopmans/html2pdf) for easy printing

Note: generate certificate:

```
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' -keyout localhost-privkey.pem -out localhost-cert.pem
```

# Examples
- "Apps built on Electron" on https://electronjs.org/
- "Investing in UX design delivers result" as quad grid items (no round corners) https://www.everyinteraction.com/
- Maybe time-based expertize like here https://behind-the-code.herokuapp.com/
- https://www.facebook.com/groups/omgkrk/permalink/1870598182990156/

# Other
- https://www.uprinting.com/print-templates/adobe-photoshop/brochures/
- https://www.youtube.com/watch?v=5ZL5mKKkHZY
- https://webdesign.tutsplus.com/articles/quick-tip-give-your-website-an-ios-home-screen-icon--webdesign-10067
- https://designmodo.com/ios-app-icon-photoshop/
- https://ivomynttinen.com/blog/ios-design-guidelines
- https://developer.apple.com/design/resources/ (with free template download)
- https://loading.io/css/
- https://ipadable.com/ipad-dimensions-length-width-height-weight-ipad-models/
- https://mdn.github.io/web-components-examples/
- https://cssgrid.cc/css-grid-guide.html
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Realizing_common_layouts_using_CSS_Grid_Layout