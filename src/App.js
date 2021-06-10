import Header from './components/Header'

import initialEmails from './data/emails'

import './App.css'
import { useState } from 'react'

function App() {
  // Use initialEmails for state
  // console.log(initialEmails)

  const [emails, setEmails] = useState(initialEmails)
  // console.log(emails)

  const inboxEmails = emails.filter(email => {
    return email.read === false
  })

  const starEmails = emails.filter(email => {
    return email.starred === true
  })

  const [hideStatus, setHideStatus] = useState(false)
  // console.log(hideStatus)

  function toggleRead(singleMail) {
    let filteredEmails = emails.map(email => {
      if (email.title === singleMail.title) {
        return (email = { ...email, read: singleMail.read })
      }
      return email
    })
    setEmails(filteredEmails)
  }

  let toggleStar = singleMail => {
    const updatedEmails = emails.map(email =>
      email.title === singleMail.title
        ? { ...email, starred: singleMail.starred }
        : email
    )
    setEmails(updatedEmails)
  }
  const [search, setSearch] = useState('')
  const [clickStatus, setClickStatus] = useState('')

  // console.log(searchEmails)

  // const emailsToRender =
  //   search !== ''
  //     ? searchEmails
  //     : hideStatus
  //     ? inboxEmails
  //     : clickStatus === ''
  //     ? emails
  //     : clickStatus === 'inbox'
  //     ? inboxEmails
  //     : starEmails

  let emailsToRender = emails

  if (hideStatus === true) emailsToRender = inboxEmails
  if (clickStatus === 'inbox') emailsToRender = inboxEmails
  if (clickStatus === 'starred')
    emailsToRender = emailsToRender.filter(email => {
      return email.starred === true
    })

  // if (search !== '')
  //   emailsToRender = emailsToRender.filter(email => {
  //     return (
  //       email.title.toLowerCase().includes(search.toLowerCase()) ||
  //       email.sender.toLowerCase().includes(search.toLowerCase())
  //     )
  //   })

  if (search !== '')
    emailsToRender = emailsToRender.filter(email => {
      return ['title', 'sender'].some(key => {
        email[key].toLowerCase().includes(search.toLowerCase())
      })
    })

  return (
    <div className="app">
      <header className="header">
        <div className="left-menu">
          <svg className="menu-icon" focusable="false" viewBox="0 0 24 24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
          </svg>

          <img
            src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png"
            alt="gmail logo"
          />
        </div>

        <div className="search">
          <input
            className="search-bar"
            placeholder="Search mail"
            onChange={event => {
              console.log(event.target.value)
              setSearch(event.target.value)
            }}
          />
        </div>
      </header>
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={clickStatus === 'inbox' ? 'item active' : 'item'}
            onClick={event => {
              if (clickStatus === '') {
                setClickStatus('inbox')
              } else {
                setClickStatus('')
              }
            }}
          >
            <span className="label">Inbox</span>
            <span className="count">{inboxEmails.length}</span>
          </li>
          <li
            className={clickStatus === 'starred' ? 'item active' : 'item'}
            onClick={() => {
              if (clickStatus === '') {
                setClickStatus('starred')
              } else {
                setClickStatus('')
              }
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
                className={`email  ${singleMail.read ? 'read' : 'unread'}`}
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
