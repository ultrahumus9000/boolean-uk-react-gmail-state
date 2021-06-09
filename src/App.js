import Header from './components/Header'

import initialEmails from './data/emails'

import './App.css'
import { useState } from 'react'

function App() {
  // Use initialEmails for state
  console.log(initialEmails)

  const [emails, setEmails] = useState(initialEmails)
  console.log(emails)

  const inboxEmails = emails.filter(email => {
    return email.read === false
  })

  const starEmails = emails.filter(email => {
    return email.starred === true
  })

  const [hideStatus, setHideStatus] = useState(false)
  console.log(hideStatus)

  function toggleRead(singleMail) {
    let filteredEmails = emails.map(email => {
      if (email.title === singleMail.title) {
        return (email = { ...email, read: singleMail.read })
      }
      return email
    })
    setEmails(filteredEmails)
    console.log(emails)
    console.log(initialEmails)
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
  const [clickStatus, setClickStatus] = useState('')
  const emailsToRender = hideStatus
    ? inboxEmails
    : clickStatus === ''
    ? emails
    : clickStatus === 'inbox'
    ? inboxEmails
    : starEmails

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={clickStatus === 'inbox' ? 'item active' : 'item'}
            onClick={event => {
              setClickStatus('inbox')
            }}
          >
            <span className="label">Inbox</span>
            <span className="count">{inboxEmails.length}</span>
          </li>
          <li
            className={clickStatus === 'starred' ? 'item active' : 'item'}
            onClick={() => {
              setClickStatus('starred')
            }}
          >
            <span className="label">Starred</span>
            <span className="count">{starEmails.length}</span>
          </li>

          <li className="item toggle active">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideStatus}
              onChange={event => {
                setHideStatus(event.target.checked)
                setClickStatus('')
              }}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul className="ul-emails">
          {emailsToRender.map(singleMail => {
            // let emailClass = 'email '

            // if (singleMail.read) {
            //   emailClass += 'read'
            // } else {
            //   emailClass += 'unread'
            // }
            return (
              <li
                key={singleMail.id}
                className={`email ${singleMail.read ? 'read' : 'unread'}`}
              >
                <input
                  type="checkbox"
                  className="check-box"
                  checked={singleMail.read}
                  onChange={event => {
                    // singleMail.read = event.target.checked  this mutate the emails
                    singleMail = { ...singleMail, read: event.target.checked }
                    console.log(event.target.checked)
                    toggleRead(singleMail)
                  }}
                />

                <input
                  type="checkbox"
                  className="star-checkbox"
                  checked={singleMail.starred}
                  onChange={event => {
                    // singleMail.starred = event.target.checked
                    singleMail = {
                      ...singleMail,
                      starred: event.target.checked
                    }
                    console.log(event.target.checked)
                    toggleStar(singleMail)
                  }}
                />
                <span>{singleMail.sender}</span>
                <span className="title">{singleMail.title}</span>
              </li>
            )
          })}
        </ul>
      </main>
    </div>
  )
}

export default App
