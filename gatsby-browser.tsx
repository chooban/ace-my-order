import React from "react"
import { LayoutChoice as Layout } from './src/components/layout/layout'
// const Layout = require("./src/components/layout/layout").default

// Wraps every page in a component
export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
