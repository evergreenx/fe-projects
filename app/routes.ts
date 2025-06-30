import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { Route } from "react-router";

export default [
  index("routes/home.tsx"),
  route('/data-table',"routes/data-table.tsx"),
  route('/form-builder',"routes/form-builder.tsx"),
  route('/mini-blog',"routes/mini-blog.tsx"),
  route('/mini-blog/new',"routes/mini-blog-new.tsx"),

  route('/mini-blog/edit/:postId',"routes/mini-blog-edit.tsx"),


] satisfies RouteConfig;
