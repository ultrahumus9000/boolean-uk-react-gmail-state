import Header from './components/Header'

import initialEmails from './data/emails'

import './App.css'
import { useState } from 'react'

function App() {
  // Use initialEmails for state
  console.log(initialEmails)

  const [emails, setEmails] = useState(initialEmails)
  console.log(emails)

  const initialInbox = emails.filter(email => {
    return email.read === false
  })

  const [inboxEmails, setInboxEmails] = useState(initialInbox)

  const initialStarEmails = emails.filter(email => {
    return email.starred === true
  })

  const [hideStatus, setHideStatus] = useState(false)
  console.log(hideStatus)

  function getHide() {
    let filteredEmails = emails.filter(email => {
      return email.read === true
    })
    console.log(filteredEmails)
    return filteredEmails
  }

  const [starEmails, setStarEmails] = useState(initialStarEmails)

  function toggleRead(singleMail) {
    let filteredEmails = emails.map(email => {
      if (email.title === singleMail.title) {
        return (email = { ...email, read: singleMail.read })
      }
      return email
    })
    setEmails(filteredEmails)
  }
  function toggleStar(singleMail) {
    let filteredEmails = emails.map(email => {
      if (email.title === singleMail.title) {
        return (email = { ...email, starred: singleMail.starred })
      }
      return email
    })
    setEmails(filteredEmails)
  }

  function getInbox() {
    let filteredEmails = emails.filter(email => {
      return email.read === false
    })
    setInboxEmails(filteredEmails)
    return filteredEmails
  }

  function getStar() {
    let filteredEmails = emails.filter(email => {
      return email.starred === true
    })
    setStarEmails(filteredEmails)
    return filteredEmails
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li className="item active" onClick={event => {}}>
            <span className="label">Inbox</span>
            <span className="count">{inboxEmails.length}</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">{starEmails.length}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideStatus}
              onChange={event => {
                setHideStatus(event.target.checked)
                if (event.target.checked) {
                  let filteredEmails = getHide()
                  setEmails(filteredEmails)
                } else {
                  setEmails(initialEmails)
                }
              }}
            />
          </li>
        </ul>
      </nav>
      <main>
        <ul className="ul-emails">
          {emails.map(singleMail => (
            <li className="email ">
              <input
                type="checkbox"
                className="check-box"
                checked={singleMail.read}
                onClick={event => {
                  singleMail.read = event.target.checked
                  console.log(event.target.checked)
                  toggleRead(singleMail)
                  getInbox()
                  getHide()
                }}
              />

              <input
                type="checkbox"
                value={singleMail.starred}
                className="star-checkbox"
                checked={singleMail.starred}
                onClick={event => {
                  singleMail.starred = event.target.checked
                  console.log(event.target.checked)
                  toggleStar(singleMail)
                  getStar()
                }}
              />
              <span>{singleMail.sender}</span>
              <span className="title">{singleMail.title}</span>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App
