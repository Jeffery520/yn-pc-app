/** When your routing table is too long, you can split it into small modules **/

import Layout from "@/layout";

const alertRouter = {
  path: "/alert",
  component: Layout,
  redirect: "/alert/menu1",
  name: "Alert",
  meta: {
    title: "alerts",
    icon: "alerts"
  },
  children: [
    {
      path: "menu1",
      component: () => import("@/views/alerts/menu1/index"), // Parent router-view
      name: "Menu1",
      meta: { title: "menu1" },
      redirect: "/nested/menu1/menu1-1"
    },
    {
      path: "menu2",
      name: "Menu2",
      component: () => import("@/views/alerts/menu2/index"),
      meta: { title: "menu2" }
    }
  ]
};

export default alertRouter;
