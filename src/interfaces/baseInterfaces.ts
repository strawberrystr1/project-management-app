export interface IRoute {
  path: string;
  element: JSX.Element;
}

export interface IRouterRoutes {
  public: IRoute[];
  private: IRoute[];
}
