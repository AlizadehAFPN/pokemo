const Root = {
  root: {
    stack: {
      id: 'mainStack',
      children: [
        {
          component: {
            name: 'DetailScreen',
          },
          // @ts-ignore
          component : {
            name: 'HomeScreen',
          }
        }
      ]
    }
  }
};

export default Root