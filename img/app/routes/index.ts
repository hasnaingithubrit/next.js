const routes = createBrowserRoutes([
  {
      path: '/',
      element:Home(),
  },
  {
      path: '/test',
      element:Test(),
  }
])
function createBrowserRoutes(arg0: { path: string; element: any; }[]) {
    throw new Error("Function not implemented.");
}

function Home() {
    throw new Error("Function not implemented.");
}

function Test() {
    throw new Error("Function not implemented.");
}

export {routes};