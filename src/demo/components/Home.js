import React from "react"
import Helmet from "react-helmet"

import Styles from "./Home.css"

import GraphQLTest from "./GraphQLTest.gql"
console.log("Loading GraphQL queries works:", GraphQLTest.kind === "Document")

import Config from "./Config.yml"
console.log("Config", Config)

function Home() {
  return (
    <article>
      <Helmet title="Home" />
      <div className={Styles.preloader} />
      <p>
        Home Component
      </p>
    </article>
  )
}

export default Home
