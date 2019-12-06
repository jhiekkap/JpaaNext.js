import React from 'react'
import Link from 'next/link'
import { Button } from 'react-bootstrap'

const links = [
  { href: '/', label: 'HOME' },
  { href: '/tables', label: 'TAULUT' },
  { href: '/projects', label: 'HANKKEET' },
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const Nav = () => (
  <nav>
    <ul> 
      {links.map(({ key, href, label }) => (
        <li key={key}>
         {/*  <a href={href}>{label}</a> */}
          <Link href={href} ><a><Button variant='light'>{label}</Button></a></Link>
        </li>
      ))}
    </ul>

    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-even;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
    `}</style>
  </nav>
)

export default Nav
